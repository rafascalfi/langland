document.addEventListener('DOMContentLoaded', function() {
    const pagina = window.location.pathname.split('/').pop();

    // Links do menu (SEM BLOQUEIO)
    const linkTeste = document.querySelector('a[href="teste.html"]');
    const linkJogos = document.querySelector('a[href="jogos.html"]');
    // Removido: bloqueio por cadastro/teste

    // Controle de acesso pelas páginas (REMOVIDO)
    // Agora pode abrir teste.html ou jogos.html sem redirecionar
    // if(pagina === 'teste.html') { ... }
    // if(pagina === 'jogos.html') { ... }

    // Botão começar do index.html
    const btnComecar = document.getElementById('btnComecar');
    if(btnComecar) {
        btnComecar.addEventListener('click', function() {
            window.location.href = 'cadastro.html';
        });
    }

    // Cadastro (mantive igual)
    const formCadastro = document.querySelector('.form-cadastro');
    if(formCadastro) {
        formCadastro.addEventListener('submit', function(e) {
            e.preventDefault();
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmar-senha').value;
            if(senha !== confirmarSenha) {
                alert('As senhas não conferem.');
                return;
            }
            localStorage.setItem('usuarioCadastrado', 'true');
            window.location.href = 'teste.html';
        });

        // Mostrar senha
        const mostrarSenhaCheckbox = document.getElementById('mostrar-senha');
        const senhaInput = document.getElementById('senha');
        const confirmarSenhaInput = document.getElementById('confirmar-senha');
        mostrarSenhaCheckbox.addEventListener('change', function() {
            const tipo = this.checked ? 'text' : 'password';
            senhaInput.type = tipo;
            confirmarSenhaInput.type = tipo;
        });
    }

    // Teste (mantive igual)
    const formTeste = document.getElementById('formTeste');
    if(formTeste) {
        formTeste.addEventListener('submit', function(e) {
            e.preventDefault();
            const respostasCertas = {
                q1: 'B', q2: 'A', q3: 'B',
                q4: 'B', q5: 'C', q6: 'A',
                q7: 'B', q8: 'A', q9: 'B'
            };
            let pontosBasico = 0, pontosIntermediario = 0, pontosAvancado = 0;

            for(let i=1; i<=9; i++) {
                const resposta = this['q'+i].value;
                if(resposta === respostasCertas['q'+i]) {
                    if(i <= 3) pontosBasico++;
                    else if(i <= 6) pontosIntermediario++;
                    else pontosAvancado++;
                }
            }

            let nivel = '';
            if(pontosAvancado >= 2) nivel = 'Avançado';
            else if(pontosIntermediario >= 2) nivel = 'Intermediário';
            else nivel = 'Básico';

            alert(`Resultado do teste:\n\nBásico: ${pontosBasico}\nIntermediário: ${pontosIntermediario}\nAvançado: ${pontosAvancado}\n\nSeu nível é: ${nivel}`);

            localStorage.setItem('testeConcluido', 'true');
            this.reset();
            window.location.href = 'jogos.html';
        });
    }
});
