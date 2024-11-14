// Rolagem suave para links da barra lateral
document.addEventListener('DOMContentLoaded', () => {
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
});

// Função para mostrar o formulário de adicionar
function mostrarFormulario(formId) {
    document.getElementById(formId).style.display = "block";
}

// Função para esconder o formulário de adicionar
function fecharFormulario(formId) {
    document.getElementById(formId).style.display = "none";
}

// Função para alternar entre formulário de adicionar e editar para Veículos
function mostrarEdicaoVeiculo() {
    document.getElementById("editar-veiculo").style.display = "block";
    document.getElementById("adicionar-veiculo").style.display = "none"; // Oculta o formulário de adicionar
}

function mostrarAdicionarVeiculo() {
    document.getElementById("adicionar-veiculo").style.display = "block";
    document.getElementById("editar-veiculo").style.display = "none"; // Oculta o formulário de edição
}

// Event listeners para os botões de "Adicionar" e "Alterar" nas seções de Veículos
document.querySelector(".btn-primary").addEventListener("click", () => mostrarFormulario('adicionar-veiculo'));
document.querySelector(".btn-alterar-veiculo").addEventListener("click", mostrarEdicaoVeiculo);

// Para outros controles (Compras, Vendas, etc.), adaptando para exibir e ocultar formulários específicos
document.querySelectorAll('.btn-adicionar').forEach(button => {
    button.addEventListener("click", (e) => {
        const sectionId = e.target.getAttribute('data-section');
        mostrarFormulario(`form-${sectionId}`);
    });
});

document.querySelectorAll('.btn-fechar').forEach(button => {
    button.addEventListener("click", (e) => {
        const sectionId = e.target.getAttribute('data-section');
        fecharFormulario(`form-${sectionId}`);
    });
});
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'sbase' // Sem a extensão .sql
});
