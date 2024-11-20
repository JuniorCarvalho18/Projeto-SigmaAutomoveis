const mysql = require('mysql2/promise');

async function conectarBanco() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sigma_system'
  });
  return connection;
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links da barra lateral
    const links = document.querySelectorAll('.sidebar a');
    
    // Para cada link, adicione um evento de clique
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Impede o comportamento padrão do link (rolagem imediata)
            e.preventDefault();
            
            // Obtém o id da seção alvo
            const targetId = link.getAttribute('href').substring(1); // Remove o '#'
            const targetSection = document.getElementById(targetId);
            
            // Faz a rolagem suave até a seção alvo
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', // Efeito de rolagem suave
                    block: 'start' // Alinha a seção ao topo da janela
                });
            }
        });
    });
});
