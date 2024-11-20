const mysql = require('mysql2/promise');

async function conectarBanco() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sigma_system'
  });
  return connection;
}

async function consultarUsuarios() {
  const connection = await conectarBanco();
  const [rows, fields] = await connection.execute('SELECT * FROM usuarios');
  console.log(rows);
  connection.end();
}

consultarUsuarios();

document.addEventListener('DOMContentLoaded', () => {
    // Rolagem suave para links da barra lateral
    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Evita o comportamento padrão do link
            const targetId = this.getAttribute('href'); // Obtém o ID da seção alvo
            const targetSection = document.querySelector(targetId); // Seleciona a seção alvo

            // Rolagem suave
            targetSection.scrollIntoView({
                behavior: 'smooth', // Comportamento de rolagem suave
                block: 'center' // Centraliza a seção na tela
            });
        });
    });

    // Função para mostrar um formulário com base em seu ID
    function mostrarFormulario(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.style.display = "block";
        }
    }

    // Função para fechar um formulário com base em seu ID
    function fecharFormulario(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.style.display = "none";
        }
    }

    // Funções específicas para mostrar/ocultar formulários de Veículos
    function mostrarEdicaoVeiculo() {
        mostrarFormulario('editar-veiculo');
        fecharFormulario('adicionar-veiculo');
    }

    function mostrarAdicionarVeiculo() {
        mostrarFormulario('adicionar-veiculo');
        fecharFormulario('editar-veiculo');
    }

    // Event listeners para os botões de "Adicionar" e "Alterar" nas seções de Veículos
    const btnAdicionarVeiculo = document.querySelector(".btn-primary");
    const btnAlterarVeiculo = document.querySelector(".btn-alterar-veiculo");

    if (btnAdicionarVeiculo) {
        btnAdicionarVeiculo.addEventListener("click", () => mostrarAdicionarVeiculo());
    }

    if (btnAlterarVeiculo) {
        btnAlterarVeiculo.addEventListener("click", mostrarEdicaoVeiculo);
    }

    // Event listeners para botões genéricos de adicionar/fechar nas seções (com base em data-attributes)
    const btnAdicionarList = document.querySelectorAll('.btn-adicionar');
    const btnFecharList = document.querySelectorAll('.btn-fechar');

    btnAdicionarList.forEach(button => {
        button.addEventListener("click", (e) => {
            const sectionId = e.target.getAttribute('data-section');
            if (sectionId) {
                mostrarFormulario(`form-${sectionId}`);
            }
        });
    });

    btnFecharList.forEach(button => {
        button.addEventListener("click", (e) => {
            const sectionId = e.target.getAttribute('data-section');
            if (sectionId) {
                fecharFormulario(`form-${sectionId}`);
            }
        });
    });
});
