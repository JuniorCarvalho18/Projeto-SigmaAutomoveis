// const mysql = require('mysql2/promise');

function CloseAside() {
  const sidebar = document.querySelector('aside'); 
  const paragrafo = sidebar.querySelectorAll('p');
  const linha = sidebar.querySelectorAll('li');
  const ancora = sidebar.querySelectorAll('a');

    if (logobar.style.display == 'flex') {
      logobar.style.display = 'none'
      logobar.style.transition = '0.5s'
      paragrafo.forEach(p => {
        p.style.display = 'none';
        p.style.transition = '0.5s'
      });
      linha.forEach( li => {
        li.style.width = 'auto';
        li.style.margin = 'auto'
      });
      ancora.forEach( a => {
        a.style.width = 'auto';
      });
      
      document.querySelector('main').style.marginLeft = '0px';
    } else if (window.innerWidth > 1060) {
      logobar.style.display = 'flex'
      logobar.style.transition = '0.5s'
      paragrafo.forEach(p => {
        p.style.display = 'block';
        p.style.transition = '0.5s'
      });
      linha.forEach( li => {
        li.style.width = '100%';
        li.style.margin = '1vh 1vw';
      });
      ancora.forEach( a => {
        a.style.width = '100%';
      });
      
      document.querySelector('main').style.marginLeft = '15.64%';
    }
}

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

// Função para fechar/Cancelar qualquer formulário
function fecharFormulario() {
  document.querySelectorAll('.forms').forEach(div => div.style.display = 'none');
}

function adicionarVeiculo() {
  document.getElementById('adicionar-veiculo').style.display = 'block';
  document.getElementById('editar-veiculo').style.display = 'none';
}

// Função para abrir o formulário de editar veículo
function editarVeiculo() {
  document.getElementById('editar-veiculo').style.display = 'block';
  document.getElementById('adicionar-veiculo').style.display = 'none';
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


// Função para manipular a exibição de formulários para outras seções
document.querySelectorAll('.btn-alterar').addEventListener('click', editarVeiculo);
document.querySelectorAll('.btn-primary').addEventListener('click', adicionarVeiculo);

document.querySelectorAll('.btn-alterar').addEventListener('click', editarCompra);
document.querySelectorAll('.btn-primary').addEventListener('click', adicionarCompra);