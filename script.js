const mysql = require('mysql2/promise');

// Função para conectar ao banco de dados
async function conectarBanco() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sigma_system'
  });
  return connection;
}

// Evento que garante que o DOM esteja carregado antes de manipular os links
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
            
            // Verifica se a seção existe
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', // Efeito de rolagem suave
                    block: 'start' // Alinha a seção ao topo da janela
                });
            } else {
                console.log('Seção não encontrada para o id:', targetId);
            }
        });
    });
});

// Exemplo de chamada da função conectarBanco(), se necessário:
conectarBanco().then(connection => {
  console.log('Conectado ao banco de dados');
}).catch(err => {
  console.log('Erro ao conectar ao banco:', err);
});
