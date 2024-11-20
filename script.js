const mysql = require('mysql2/promise');

async function conectarBanco() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sigma_system'
  });
  return connection;
// Função para abrir o formulário de adicionar veículo
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
