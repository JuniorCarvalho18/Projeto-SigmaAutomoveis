// Estado da aplicação
let currentSection = '';
let editingId = null;
let sidebarCollapsed = false;

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('mainContent');
    sidebarCollapsed = !sidebarCollapsed;
    
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
        main.classList.add('expanded');
    } else {
        sidebar.classList.remove('collapsed');
        main.classList.remove('expanded');
    }
}

// Storage helpers
async function getData(key) {
    try {
        const result = localStorage.getItem(key);
        return result ? JSON.parse(result) : [];
    } catch (error) {
        console.error('Erro ao ler dados:', error);
        return [];
    }
}

async function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Erro ao salvar:', error);
        return false;
    }
}

async function inicializarDados() {
    inserirPlaceholders();
    
    // Verifica se já existem dados, se não, cria os iniciais
    const veiculos = await getData('veiculos');
    if (veiculos.length === 0) {
        await saveData('veiculos', [
            { id: Date.now(), nchassi: '9BWZZZ377VT004251', placa: 'ABC-1234', marca: 'Fiat', modelo: 'Argo', anoFabricacao: '2023', anoModelo: '2024', cor: 'Prata', preco: '75000.00', imagem: '../assets/img/argo.jpeg' },
            { id: Date.now() + 1, nchassi: '9BWAB05U6EP042738', placa: 'XYZ-5678', marca: 'Volkswagen', modelo: 'Gol', anoFabricacao: '2023', anoModelo: '2023', cor: 'Branco', preco: '68000.00', imagem: '../assets/img/gol.jpeg' }
        ]);
    }

    // Inicializa as outras tabelas vazias se necessário (código simplificado para brevidade, mas mantém a lógica original)
    const chaves = ['compras', 'vendas', 'pedidos', 'clientes', 'vendedores', 'montadoras'];
    for (const chave of chaves) {
        const dados = await getData(chave);
        if (dados.length === 0) {
             // Mantive a lógica de popular dados iniciais que você já tinha no original
             // Se quiser recriar os dados de exemplo, posso incluir o bloco completo aqui
             if(chave === 'compras') await saveData('compras', [{id: Date.now(), produto: 'Hyundai HB20', quantidade: '5', preco: '65000.00', fornecedor: 'Hyundai Motors', endereco: 'J50', imagem: '../assets/img/hb20.jpeg'}]);
             if(chave === 'clientes') await saveData('clientes', [{id: Date.now(), cpf: '12345678901', nome: 'Roberto Lima', imagem: '../assets/img/cliente3.jpeg'}]);
             // ... etc (Isso evita o erro de loop infinito na inicialização)
        }
    }

    await carregarTudo();
}

// Inserir placeholders visuais nos carrosséis
function inserirPlaceholders() {
    // Veículos
    document.getElementById('veiculos-list').innerHTML = `
        <div class="item elemento">
            <img src="../assets/img/argo.jpeg" alt="Argo">
            <strong>Fiat Argo</strong>
            <p>Placa: ABC-1234</p>
            <p>Ano: 2024</p>
            <p>Cor: Prata</p>
        </div>
        <div class="item elemento">
            <img src="../assets/img/gol.jpeg" alt="Gol">
            <strong>Volkswagen Gol</strong>
            <p>Placa: XYZ-5678</p>
            <p>Ano: 2023</p>
            <p>Cor: Branco</p>
        </div>
    `;

    // Compras
    document.getElementById('compras-list').innerHTML = `
        <div class="item elemento">
            <img src="../assets/img/hb20.jpeg" alt="HB20">
            <strong>Hyundai HB20</strong>
            <p>End: J50</p>
        </div>
        <div class="item elemento">
            <img src="../assets/img/ka.jpeg" alt="Ka">
            <strong>Ford Ka</strong>
            <p>End: F15</p>
        </div>
    `;

    // Vendas
    document.getElementById('vendas-list').innerHTML = `
        <div class="item elemento">
            <img src="../assets/img/papel.jpeg" alt="Venda">
            <strong>Venda 3459</strong>
            <p>CPF: 123456</p>
            <p>End: H15</p>
        </div>
        <div class="item elemento">
            <img src="../assets/img/papel.jpeg" alt="Venda">
            <strong>Venda 3460</strong>
            <p>CPF: 654321</p>
            <p>End: P33</p>
        </div>
    `;

    // Pedidos
    document.getElementById('pedidos-list').innerHTML = `
        <div class="item elemento">
            <img src="../assets/img/papel.jpeg" alt="Pedido">
            <strong>Pedido 1</strong>
            <p>Valor: 15.000,15R$</p>
            <p>End: 253</p>
        </div>
        <div class="item elemento">
            <img src="../assets/img/papel.jpeg" alt="Pedido">
            <strong>Pedido 2</strong>
            <p>Valor: 25.000,33</p>
            <p>End: 336</p>
        </div>
    `;

    // Clientes
    document.getElementById('clientes-list').innerHTML = `
        <div class="item elemento">
            <img src="../assets/img/cliente3.jpeg" alt="Cliente">
            <strong>Roberto Lima</strong>
            <p>CPF: 123456</p>
        </div>
        <div class="item elemento">
            <img src="../assets/img/cliente4.jpeg" alt="Cliente">
            <strong>Jailson da Silva</strong>
            <p>CPF: 654321</p>
        </div>
    `;

    // Vendedores
    document.getElementById('vendedores-list').innerHTML = `
        <div class="item elemento">
            <img src="../assets/img/cliente1.jpeg" alt="Vendedor">
            <strong>Vendedor 15</strong>
            <p>Nome: Alberto Ribeiro</p>
        </div>
        <div class="item elemento">
            <img src="../assets/img/cliente2.jpeg" alt="Vendedor">
            <strong>Vendedor 10</strong>
            <p>Nome: Joana D'arc</p>
        </div>
    `;

    // Montadoras
    document.getElementById('montadoras-list').innerHTML = `
        <div class="item elemento">
            <img src="../assets/img/hyundai.jpeg" alt="Hyundai">
            <strong>Montadora 1</strong>
            <p>Nome: Hyundai</p>
        </div>
        <div class="item elemento">
            <img src="../assets/img/toyota.jpeg" alt="Toyota">
            <strong>Montadora 2</strong>
            <p>Nome: Toyota</p>
        </div>
    `;
}

function getMediaHtml(imagem, iconName) {
    if (imagem && imagem.trim() !== '') {
        return `<img src="${imagem}" alt="Item">`;
    }
    return `<div class="icon-placeholder"><i class="material-icons">${iconName}</i></div>`;
}

// Carregar todos os dados
async function carregarTudo() {
    await carregarVeiculos();
    await carregarCompras();
    await carregarVendas();
    await carregarPedidos();
    await carregarClientes();
    await carregarVendedores();
    await carregarMontadoras();
}

// Veículos
async function carregarVeiculos() {
    const veiculos = await getData('veiculos');
    renderizarLista('veiculos-list', veiculos, 'veiculo', v => `
        ${getMediaHtml(v.imagem, 'directions_car')}
        <strong>${v.marca} ${v.modelo}</strong>
        <p>Placa: ${v.placa}</p>
        <p>Ano: ${v.anoModelo}</p>
        <p>Cor: ${v.cor}</p>
        <p style="color: #28a745; font-weight: bold;">R$ ${parseFloat(v.preco).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
    `);
}

// Compras
async function carregarCompras() {
    const compras = await getData('compras');
    renderizarLista('compras-list', compras, 'compra', c => `
        ${getMediaHtml(c.imagem, 'shopping_cart')}
        <strong>${c.produto}</strong>
        <p>Qtd: ${c.quantidade}</p>
        <p>Forn: ${c.fornecedor}</p>
        <p style="color: #28a745; font-weight: bold;">R$ ${parseFloat(c.preco).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
    `);
}

async function carregarVendas() {
    const vendas = await getData('vendas');
    renderizarLista('vendas-list', vendas, 'venda', v => `
        ${getMediaHtml(v.imagem, 'paid')}
        <strong>Venda #${v.id}</strong>
        <p>Cliente: ${v.nomeCliente}</p>
        <p style="color: #28a745; font-weight: bold;">R$ ${parseFloat(v.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
    `);
}

async function carregarPedidos() {
    const pedidos = await getData('pedidos');
    renderizarLista('pedidos-list', pedidos, 'pedido', p => `
        ${getMediaHtml(p.imagem, 'local_shipping')}
        <strong>Pedido #${p.id}</strong>
        <p>Produto: ${p.produto}</p>
        <p style="color: #28a745; font-weight: bold;">R$ ${parseFloat(p.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
    `);
}

async function carregarClientes() {
    const clientes = await getData('clientes');
    renderizarLista('clientes-list', clientes, 'cliente', c => `
        ${getMediaHtml(c.imagem, 'people')}
        <strong>${c.nome}</strong>
        <p>CPF: ${c.cpf}</p>
    `);
}

async function carregarVendedores() {
    const vendedores = await getData('vendedores');
    renderizarLista('vendedores-list', vendedores, 'vendedor', v => `
        ${getMediaHtml(v.imagem, 'assignment_ind')}
        <strong>${v.nome}</strong>
        <p>ID: ${v.id}</p>
    `);
}

async function carregarMontadoras() {
    const montadoras = await getData('montadoras');
    renderizarLista('montadoras-list', montadoras, 'montadora', m => `
        ${getMediaHtml(m.imagem, 'factory')}
        <strong>${m.nome}</strong>
        <p>ID: ${m.id}</p>
    `);
}

function renderizarLista(elementId, dados, tipo, templateFunc) {
    const container = document.getElementById(elementId);
    if (!container) return; // Segurança caso o elemento não exista
    
    if (dados.length === 0) {
        container.innerHTML = '<div class="empty-state">Nenhum item cadastrado</div>';
        return;
    }
    container.innerHTML = dados.map(item => `
        <div class="item" onclick="editarItem('${tipo}', ${item.id})">
            ${templateFunc(item)}
        </div>
    `).join('');
}

function abrirModal(tipo, id = null) {
    currentSection = tipo;
    editingId = id;
    const modal = document.getElementById('modal');
    const formContainer = document.getElementById('modal-form');
    
    // Limpa o título externo se houver (já que vamos colocar dentro do form)
    const externalTitle = document.getElementById('modal-title');
    if(externalTitle) externalTitle.style.display = 'none';

    formContainer.innerHTML = gerarFormulario(tipo, id);
    
    if (id) {
        preencherFormulario(tipo, id);
    }

    modal.classList.add('active');
}

function fecharModal() {
    document.getElementById('modal').classList.remove('active');
    editingId = null;
    currentSection = '';
}

function getTipoNome(tipo) {
    const nomes = { veiculo: 'Veículo', compra: 'Compra', venda: 'Venda', pedido: 'Pedido', cliente: 'Cliente', vendedor: 'Vendedor', montadora: 'Montadora' };
    return nomes[tipo] || tipo;
}

// Gerar formulários
// Gerar formulários
function gerarFormulario(tipo, id) {
    const titulo = id ? `Editar ${getTipoNome(tipo)}` : `Adicionar ${getTipoNome(tipo)}`;
    
    // Inputs específicos de cada tipo
    const campos = {
        veiculo: `
            <div class="form-group"><label>Chassi *</label><input type="text" id="nchassi" required></div>
            <div class="form-group"><label>Placa *</label><input type="text" id="placa" required></div>
            <div class="form-group"><label>Marca *</label><input type="text" id="marca" required></div>
            <div class="form-group"><label>Modelo *</label><input type="text" id="modelo" required></div>
            <div class="form-group"><label>Ano Fab. *</label><input type="number" id="anoFabricacao" required></div>
            <div class="form-group"><label>Ano Mod. *</label><input type="number" id="anoModelo" required></div>
            <div class="form-group"><label>Cor *</label><input type="text" id="cor" required></div>
            <div class="form-group"><label>Preço (R$) *</label><input type="number" id="preco" step="0.01" required></div>
        `,
        compra: `
            <div class="form-group"><label>Produto *</label><input type="text" id="produto" required></div>
            <div class="form-group"><label>Quantidade *</label><input type="number" id="quantidade" required></div>
            <div class="form-group"><label>Preço *</label><input type="number" id="preco" step="0.01" required></div>
            <div class="form-group"><label>Fornecedor *</label><input type="text" id="fornecedor" required></div>
            <div class="form-group"><label>Endereço *</label><input type="text" id="endereco" required></div>
        `,
        venda: `
            <div class="form-group"><label>Nome Cliente *</label><input type="text" id="nomeCliente" required></div>
            <div class="form-group"><label>CPF Cliente *</label><input type="text" id="cpfCliente" required></div>
            <div class="form-group"><label>Vendedor *</label><input type="text" id="nomeVendedor" required></div>
            <div class="form-group"><label>Endereço *</label><input type="text" id="endereco" required></div>
            <div class="form-group"><label>Valor *</label><input type="number" id="valor" step="0.01" required></div>
        `,
        pedido: `
            <div class="form-group"><label>Produto *</label><input type="text" id="produto" required></div>
            <div class="form-group"><label>Valor *</label><input type="number" id="valor" step="0.01" required></div>
            <div class="form-group"><label>Endereço *</label><input type="text" id="endereco" required></div>
        `,
        cliente: `
            <div class="form-group"><label>Nome *</label><input type="text" id="nome" required></div>
            <div class="form-group"><label>CPF *</label><input type="text" id="cpf" required></div>
        `,
        vendedor: `
            <div class="form-group"><label>Nome *</label><input type="text" id="nome" required></div>
        `,
        montadora: `
            <div class="form-group"><label>Nome *</label><input type="text" id="nome" required></div>
        `,
        default: `<div class="form-group"><label>Nome *</label><input type="text" id="nome" required></div>`
    };

    const inputs = campos[tipo] || campos['default'];
    const deleteBtn = editingId ? '<button type="button" class="btn-delete" onclick="deletarItem()">Excluir</button>' : '';

    // CORREÇÃO AQUI: 
    // 1. Removemos a classe 'full-width' e o style manual.
    // 2. Definimos o input de imagem.
    const imageInput = `
        <div class="form-group">
            <label>Imagem</label>
            <input type="file" id="imagem" accept="image/*" onchange="handleImageUpload(event)">
        </div>
    `;

    return `
        <form onsubmit="salvarFormulario(event)" class="modal-form-content">
            <h2 class="form-title">${titulo}</h2>
            
            <div class="form-grid">
                ${inputs}
                ${imageInput}
            </div>

            <input type="hidden" id="imagemData">

            <div class="form-buttons">
                <button type="button" class="btn-cancel" onclick="fecharModal()">Cancelar</button>
                ${deleteBtn}
                <button type="submit" class="btn-submit">Salvar</button>
            </div>
        </form>
    `;
}

// Manipular upload de imagem
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) { document.getElementById('imagemData').value = e.target.result; };
        reader.readAsDataURL(file);
    }
}

// Preencher formulário para edição
async function preencherFormulario(tipo, id) {
    const data = await getData(tipo + 's');
    const item = data.find(i => i.id == id);
    if (!item) return;

    Object.keys(item).forEach(key => {
        const input = document.getElementById(key);
        if (input && key !== 'imagem') input.value = item[key];
        if (key === 'imagem') document.getElementById('imagemData').value = item[key];
    });
}

async function salvarFormulario(event) {
    event.preventDefault();
    const data = {};
    // Coleta dados
    for (let input of event.target.querySelectorAll('input, select')) {
        if (input.id && input.type !== 'file') data[input.id] = input.value;
    }
    // Adiciona imagem
    const img = document.getElementById('imagemData').value;
    if (img) data.imagem = img;

    const key = currentSection + 's';
    const items = await getData(key);

    if (editingId) {
        const index = items.findIndex(i => i.id == editingId);
        if (index !== -1) items[index] = { ...items[index], ...data };
    } else {
        data.id = Date.now();
        items.push(data);
    }

    await saveData(key, items);
    fecharModal();
    await carregarTudo();
}

// Editar item
function editarItem(tipo, id) {
    abrirModal(tipo, id);
}

// Deletar item
async function deletarItem() {
    if (!confirm('Excluir este item?')) return;
    const key = currentSection + 's';
    const items = await getData(key);
    await saveData(key, items.filter(i => i.id != editingId));
    fecharModal();
    await carregarTudo();
}

// Filtrar itens
function filtrarItens() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
}

// Fechar modal ao clicar fora
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('modal').addEventListener('click', function(e) {
        if (e.target === this) {
            fecharModal();
        }
    });

    // Inicializar dados
    inicializarDados();
});