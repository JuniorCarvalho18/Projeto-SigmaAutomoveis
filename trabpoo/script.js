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
// Função para mostrar o formulário de adicionar veículo
function mostrarFormulario() {
    document.getElementById("adicionar-veiculo").style.display = "block";
}

// Função para esconder o formulário de adicionar veículo
function fecharFormulario() {
    document.getElementById("adicionar-veiculo").style.display = "none";
}

// Ativa a função ao clicar no botão "Adicionar Veículos"
document.querySelector(".btn-primary").addEventListener("click", mostrarFormulario);
// Função para mostrar o formulário de editar veículo
function mostrarEdicaoVeiculo() {
    document.getElementById("editar-veiculo").style.display = "block";
    document.getElementById("adicionar-veiculo").style.display = "none"; // Oculta o formulário de adicionar
}

// Função para esconder o formulário de editar veículo
function fecharEdicao() {
    document.getElementById("editar-veiculo").style.display = "none";
}

// Função para mostrar o formulário de adicionar veículo
function mostrarAdicionarVeiculo() {
    document.getElementById("adicionar-veiculo").style.display = "block";
    document.getElementById("editar-veiculo").style.display = "none"; // Oculta o formulário de edição
}

// Função para esconder o formulário de adicionar veículo
function fecharFormulario() {
    document.getElementById("adicionar-veiculo").style.display = "none";
}

// Event listener para o botão "Alterar Veículos"
document.querySelector(".btn-alterar-veiculo").addEventListener("click", mostrarEdicaoVeiculo);

// Event listener para o botão "Adicionar Veículos"
document.querySelector(".btn-primary").addEventListener("click", mostrarAdicionarVeiculo);

