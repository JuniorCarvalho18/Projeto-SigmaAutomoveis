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

function adicionarVeiculo() {
  document.getElementById('adicionar-veiculo').style.display = 'block';
  document.getElementById('editar-veiculo').style.display = 'none';
}

// Função para abrir o formulário de editar veículo
function editarVeiculo() {
  document.getElementById('editar-veiculo').style.display = 'block';
  document.getElementById('adicionar-veiculo').style.display = 'none';
}

// Função para fechar qualquer formulário de veiculo
function fecharFormulario() {
  document.getElementById('adicionar-veiculo').style.display = 'none';
  document.getElementById('editar-veiculo').style.display = 'none';
}

// Função para abrir o formulário de adicionar compra
function adicionarCompra() {
  document.getElementById('adicionar-compra').style.display = 'block';
  document.getElementById('editar-compra').style.display = 'none';
}

// Função para abrir o formulário de editar compra
function editarCompra() {
  document.getElementById('editar-compra').style.display = 'block';
  document.getElementById('adicionar-compra').style.display = 'none';
}

// Função para fechar qualquer formulário de compra
function fecharFormularioCompra() {
  document.getElementById('adicionar-compra').style.display = 'none';
  document.getElementById('editar-compra').style.display = 'none';
}

// Função para fechar o formulário de edição de compra
function fecharEdicaoCompra() {
  document.getElementById('editar-compra').style.display = 'none';
}

// Função para fechar qualquer formulário de vendas, pedidos, clientes e vendedores
function fecharEdicao() {
  // Aqui você pode adicionar lógicas para outros formulários se necessário
  console.log("Fechar edição");
}

// Função para manipular a exibição de formulários para outras seções
document.querySelector('.btn-alterar-veiculo').addEventListener('click', editarVeiculo);
document.querySelector('.btn-primary').addEventListener('click', adicionarVeiculo);

document.querySelector('.btn-alterar-compra').addEventListener('click', editarCompra);
document.querySelector('.btn-primary').addEventListener('click', adicionarCompra);