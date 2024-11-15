document.addEventListener('DOMContentLoaded', () => {
    // Função para abrir formulários
    function mostrarFormulario(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.style.display = "block";
        }
    }

    // Função para fechar formulários
    function fecharFormulario(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.style.display = "none";
        }
    }

    // Event listeners para os botões
    document.querySelector('.btn-primary').addEventListener('click', () => {
        mostrarFormulario('adicionar-veiculo');
    });

    document.querySelector('.btn-alterar-veiculo').addEventListener('click', () => {
        mostrarFormulario('editar-veiculo');
    });
});
