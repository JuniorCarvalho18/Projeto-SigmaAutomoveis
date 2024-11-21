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

// Evento que garante que o DOM esteja carregado antes de manipular os botões
document.addEventListener('DOMContentLoaded', function () {
  // Selecionar os botões "Adicionar" e "Alterar"
  const btnAdicionar = document.getElementById('btnAdicionar');
  const btnAlterar = document.getElementById('btnAlterar');

  // Selecionar os formulários correspondentes
  const formAdicionar = document.getElementById('adicionar-veiculo');
  const formAlterar = document.getElementById('editar-veiculo');

  // Função para esconder ambos os formulários
  function esconderFormularios() {
    formAdicionar.style.display = 'none';
    formAlterar.style.display = 'none';
  }

  // Inicialmente esconder os formulários
  esconderFormularios();

  // Evento para mostrar o formulário de adicionar
  btnAdicionar.addEventListener('click', function () {
    esconderFormularios();
    formAdicionar.style.display = 'block';
  });

  // Evento para mostrar o formulário de alterar
  btnAlterar.addEventListener('click', function () {
    esconderFormularios();
    formAlterar.style.display = 'block';
  });

  // Evento de submissão do formulário de adicionar veículo
  formAdicionar.addEventListener('submit', async function (e) {
    e.preventDefault(); // Impedir o comportamento padrão do formulário

    // Capturar os dados do formulário
    const dados = {
      nome: document.getElementById('nomeAdicionar').value,
      modelo: document.getElementById('modeloAdicionar').value,
      ano: document.getElementById('anoAdicionar').value,
      preco: document.getElementById('precoAdicionar').value,
    };

    try {
      const connection = await conectarBanco();
      const query = 'INSERT INTO veiculos (nome, modelo, ano, preco) VALUES (?, ?, ?, ?)';
      await connection.execute(query, [dados.nome, dados.modelo, dados.ano, dados.preco]);
      alert('Veículo adicionado com sucesso!');
      formAdicionar.reset(); // Limpar o formulário
    } catch (err) {
      console.error('Erro ao adicionar veículo:', err);
      alert('Erro ao adicionar o veículo.');
    }
  });

  // Evento de submissão do formulário de alterar veículo
  formAlterar.addEventListener('submit', async function (e) {
    e.preventDefault(); // Impedir o comportamento padrão do formulário

    // Capturar os dados do formulário
    const dados = {
      id: document.getElementById('idAlterar').value,
      nome: document.getElementById('nomeAlterar').value,
      modelo: document.getElementById('modeloAlterar').value,
      ano: document.getElementById('anoAlterar').value,
   
    };

    try {
      const connection = await conectarBanco();
      const query = 'UPDATE veiculos SET nome = ?, modelo = ?, ano = ?, preco = ? WHERE id = ?';
      await connection.execute(query, [dados.nome, dados.modelo, dados.ano, dados.preco, dados.id]);
      alert('Veículo alterado com sucesso!');
      formAlterar.reset(); // Limpar o formulário
    } catch (err) {
      console.error('Erro ao alterar veículo:', err);
      alert('Erro ao alterar o veículo.');
    }
  });
});

// Exemplo de chamada da função conectarBanco(), se necessário:
conectarBanco()
  .then((connection) => {
    console.log('Conectado ao banco de dados');
  })
  .catch((err) => {
    console.log('Erro ao conectar ao banco:', err);
  });
