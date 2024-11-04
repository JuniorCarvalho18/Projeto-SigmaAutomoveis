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
