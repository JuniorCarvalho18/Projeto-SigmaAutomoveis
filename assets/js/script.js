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
        const result = await window.storage.get(key);
        return result ? JSON.parse(result.value) : [];
    } catch (error) {
        return [];
    }
}

async function saveData(key, data) {
    try {
        await window.storage.set(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Erro ao salvar:', error);
        return false;
    }
}

// Inicializar dados de exemplo com imagens reais
async function inicializarDados() {
    const veiculos = await getData('veiculos');
    if (veiculos.length === 0) {
        await saveData('veiculos', [
            {
                id: Date.now(),
                nchassi: '9BWZZZ377VT004251',
                placa: 'ABC-1234',
                marca: 'Fiat',
                modelo: 'Argo',
                anoFabricacao: '2023',
                anoModelo: '2024',
                cor: 'Prata',
                preco: '75000.00',
                imagem: '../assets/img/argo.jpeg'
            },
            {
                id: Date.now() + 1,
                nchassi: '9BWAB05U6EP042738',
                placa: 'XYZ-5678',
                marca: 'Volkswagen',
                modelo: 'Gol',
                anoFabricacao: '2023',
                anoModelo: '2023',
                cor: 'Branco',
                preco: '68000.00',
                imagem: '../assets/img/gol.jpeg'
            }
        ]);
    }

    const compras = await getData('compras');
    if (compras.length === 0) {
        await saveData('compras', [
            {
                id: Date.now(),
                produto: 'Hyundai HB20',
                quantidade: '5',
                preco: '65000.00',
                fornecedor: 'Hyundai Motors',
                endereco: 'J50',
                imagem: '../assets/img/hb20.jpeg'
            },
            {
                id: Date.now() + 1,
                produto: 'Ford Ka',
                quantidade: '3',
                preco: '58000.00',
                fornecedor: 'Ford Brasil',
                endereco: 'F15',
                imagem: '../assets/img/ka.jpeg'
            }
        ]);
    }

    const vendas = await getData('vendas');
    if (vendas.length === 0) {
        await saveData('vendas', [
            {
                id: 3459,
                nomeCliente: 'Roberto Lima',
                cpfCliente: '12345678901',
                nomeVendedor: 'Alberto Ribeiro',
                endereco: 'H15',
                valor: '75000.00',
                imagem: '../assets/img/papel.jpeg'
            },
            {
                id: 3460,
                nomeCliente: 'Jailson da Silva',
                cpfCliente: '98765432109',
                nomeVendedor: 'Joana D\'arc',
                endereco: 'P33',
                valor: '68000.00',
                imagem: '../assets/img/papel.jpeg'
            }
        ]);
    }

    const pedidos = await getData('pedidos');
    if (pedidos.length === 0) {
        await saveData('pedidos', [
            {
                id: Date.now(),
                produto: 'Hyundai HB20',
                endereco: '253',
                valor: '15000.15',
                imagem: '../assets/img/papel.jpeg'
            },
            {
                id: Date.now() + 1,
                produto: 'Ford Ka',
                endereco: '336',
                valor: '25000.33',
                imagem: '../assets/img/papel.jpeg'
            }
        ]);
    }

    const clientes = await getData('clientes');
    if (clientes.length === 0) {
        await saveData('clientes', [
            {
                id: Date.now(),
                cpf: '12345678901',
                nome: 'Roberto Lima',
                imagem: '../assets/img/cliente3.jpeg'
            },
            {
                id: Date.now() + 1,
                cpf: '98765432109',
                nome: 'Jailson da Silva',
                imagem: '../assets/img/cliente4.jpeg'
            }
        ]);
    }

    const vendedores = await getData('vendedores');
    if (vendedores.length === 0) {
        await saveData('vendedores', [
            {
                id: 15,
                nome: 'Alberto Ribeiro',
                imagem: '../assets/img/cliente1.jpeg'
            },
            {
                id: 10,
                nome: 'Joana D\'arc',
                imagem: '../assets/img/cliente2.jpeg'
            }
        ]);
    }

    const montadoras = await getData('montadoras');
    if (montadoras.length === 0) {
        await saveData('montadoras', [
            {
                id: Date.now(),
                nome: 'Hyundai',
                imagem: '../assets/img/hyundai.jpeg'
            },
            {
                id: Date.now() + 1,
                nome: 'Toyota',
                imagem: '../assets/img/toyota.jpeg'
            }
        ]);
    }

    await carregarTudo();
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
    const container = document.getElementById('veiculos-list');
    
    if (veiculos.length === 0) {
        container.innerHTML = '<div class="empty-state">Nenhum veículo cadastrado</div>';
        return;
    }

    container.innerHTML = veiculos.map(v => `
        <div class="item" onclick="editarItem('veiculo', ${v.id})">
            <img src="${v.imagem || '../assets/img/argo.jpeg'}" alt="${v.modelo}">
            <strong>${v.marca} ${v.modelo}</strong>
            <p>Placa: ${v.placa}</p>
            <p>Ano: ${v.anoModelo}</p>
            <p>Cor: ${v.cor}</p>
            <p style="color: #28a745; font-weight: bold;">R$ ${parseFloat(v.preco).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
        </div>
    `).join('');
}

// Compras
async function carregarCompras() {
    const compras = await getData('compras');
    const container = document.getElementById('compras-list');
    
    if (compras.length === 0) {
        container.innerHTML = '<div class="empty-state">Nenhuma compra cadastrada</div>';
        return;
    }

    container.innerHTML = compras.map(c => `
        <div class="item" onclick="editarItem('compra', ${c.id})">
            <img src="${c.imagem || '../assets/img/hb20.jpeg'}" alt="${c.produto}">
            <strong>${c.produto}</strong>
            <p>Qtd: ${c.quantidade}</p>
            <p>Fornecedor: ${c.fornecedor}</p>
            <p>End: ${c.endereco}</p>
            <p style="color: #28a745; font-weight: bold;">R$ ${parseFloat(c.preco).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
        </div>
    `).join('');
}

// Vendas
async function carregarVendas() {
    const vendas = await getData('vendas');
    const container = document.getElementById('vendas-list');
    
    if (vendas.length === 0) {
        container.innerHTML = '<div class="empty-state">Nenhuma venda cadastrada</div>';
        return;
    }

    container.innerHTML = vendas.map(v => `
        <div class="item" onclick="editarItem('venda', ${v.id})">
            <img src="${v.imagem || '../assets/img/papel.jpeg'}" alt="Venda">
            <strong>Venda #${v.id}</strong>
            <p>Cliente: ${v.nomeCliente}</p>
            <p>CPF: ${v.cpfCliente ? v.cpfCliente.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : 'N/A'}</p>
            <p>Vendedor: ${v.nomeVendedor}</p>
            <p>End: ${v.endereco}</p>
            <p style="color: #28a745; font-weight: bold;">R$ ${parseFloat(v.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
        </div>
    `).join('');
}

// Pedidos
async function carregarPedidos() {
    const pedidos = await getData('pedidos');
    const container = document.getElementById('pedidos-list');
    
    if (pedidos.length === 0) {
        container.innerHTML = '<div class="empty-state">Nenhum pedido cadastrado</div>';
        return;
    }

    container.innerHTML = pedidos.map(p => `
        <div class="item" onclick="editarItem('pedido', ${p.id})">
            <img src="${p.imagem || '../assets/img/papel.jpeg'}" alt="Pedido">
            <strong>Pedido #${p.id}</strong>
            <p>Produto: ${p.produto}</p>
            <p>End: ${p.endereco}</p>
            <p style="color: #28a745; font-weight: bold;">R$ ${parseFloat(p.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
        </div>
    `).join('');
}

// Clientes
async function carregarClientes() {
    const clientes = await getData('clientes');
    const container = document.getElementById('clientes-list');
    
    if (clientes.length === 0) {
        container.innerHTML = '<div class="empty-state">Nenhum cliente cadastrado</div>';
        return;
    }

    container.innerHTML = clientes.map(c => `
        <div class="item" onclick="editarItem('cliente', ${c.id})">
            <img src="${c.imagem || '../assets/img/cliente3.jpeg'}" alt="${c.nome}">
            <strong>${c.nome}</strong>
            <p>CPF: ${c.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</p>
        </div>
    `).join('');
}

// Vendedores
async function carregarVendedores() {
    const vendedores = await getData('vendedores');
    const container = document.getElementById('vendedores-list');
    
    if (vendedores.length === 0) {
        container.innerHTML = '<div class="empty-state">Nenhum vendedor cadastrado</div>';
        return;
    }

    container.innerHTML = vendedores.map(v => `
        <div class="item" onclick="editarItem('vendedor', ${v.id})">
            <img src="${v.imagem || '../assets/img/cliente1.jpeg'}" alt="${v.nome}">
            <strong>${v.nome}</strong>
            <p>ID: ${v.id}</p>
        </div>
    `).join('');
}

// Montadoras
async function carregarMontadoras() {
    const montadoras = await getData('montadoras');
    const container = document.getElementById('montadoras-list');
    
    if (montadoras.length === 0) {
        container.innerHTML = '<div class="empty-state">Nenhuma montadora cadastrada</div>';
        return;
    }

    container.innerHTML = montadoras.map(m => `
        <div class="item" onclick="editarItem('montadora', ${m.id})">
            <img src="${m.imagem || '../assets/img/hyundai.jpeg'}" alt="${m.nome}">
            <strong>${m.nome}</strong>
            <p>ID: ${m.id}</p>
        </div>
    `).join('');
}

// Abrir Modal
function abrirModal(tipo, id = null) {
    currentSection = tipo;
    editingId = id;
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const formContainer = document.getElementById('modal-form');

    title.textContent = id ? `Editar ${getTipoNome(tipo)}` : `Adicionar ${getTipoNome(tipo)}`;
    formContainer.innerHTML = gerarFormulario(tipo);
    
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
    const nomes = {
        veiculo: 'Veículo',
        compra: 'Compra',
        venda: 'Venda',
        pedido: 'Pedido',
        cliente: 'Cliente',
        vendedor: 'Vendedor',
        montadora: 'Montadora'
    };
    return nomes[tipo] || tipo;
}

// Gerar formulários
function gerarFormulario(tipo) {
    const formularios = {
        veiculo: `
            <div class="form-group">
                <label>Chassi *</label>
                <input type="text" id="nchassi" required>
            </div>
            <div class="form-group">
                <label>Placa *</label>
                <input type="text" id="placa" required>
            </div>
            <div class="form-group">
                <label>Marca *</label>
                <input type="text" id="marca" required>
            </div>
            <div class="form-group">
                <label>Modelo *</label>
                <input type="text" id="modelo" required>
            </div>
            <div class="form-group">
                <label>Ano de Fabricação *</label>
                <input type="number" id="anoFabricacao" min="1900" max="2030" required>
            </div>
            <div class="form-group">
                <label>Ano do Modelo *</label>
                <input type="number" id="anoModelo" min="1900" max="2030" required>
            </div>
            <div class="form-group">
                <label>Cor *</label>
                <input type="text" id="cor" required>
            </div>
            <div class="form-group">
                <label>Preço (R$) *</label>
                <input type="number" id="preco" step="0.01" min="0" required>
            </div>
            <div class="form-group">
                <label>Imagem</label>
                <input type="file" id="imagem" accept="image/*" onchange="handleImageUpload(event)">
            </div>
        `,
        compra: `
            <div class="form-group">
                <label>Produto *</label>
                <input type="text" id="produto" required>
            </div>
            <div class="form-group">
                <label>Quantidade *</label>
                <input type="number" id="quantidade" min="1" required>
            </div>
            <div class="form-group">
                <label>Preço (R$) *</label>
                <input type="number" id="preco" step="0.01" min="0" required>
            </div>
            <div class="form-group">
                <label>Fornecedor *</label>
                <input type="text" id="fornecedor" required>
            </div>
            <div class="form-group">
                <label>Endereço *</label>
                <input type="text" id="endereco" required>
            </div>
            <div class="form-group">
                <label>Imagem</label>
                <input type="file" id="imagem" accept="image/*" onchange="handleImageUpload(event)">
            </div>
        `,
        venda: `
            <div class="form-group">
                <label>Nome do Cliente *</label>
                <input type="text" id="nomeCliente" required>
            </div>
            <div class="form-group">
                <label>CPF do Cliente *</label>
                <input type="text" id="cpfCliente" maxlength="11" required>
            </div>
            <div class="form-group">
                <label>Nome do Vendedor *</label>
                <input type="text" id="nomeVendedor" required>
            </div>
            <div class="form-group">
                <label>Endereço *</label>
                <input type="text" id="endereco" required>
            </div>
            <div class="form-group">
                <label>Valor (R$) *</label>
                <input type="number" id="valor" step="0.01" min="0" required>
            </div>
            <div class="form-group">
                <label>Imagem</label>
                <input type="file" id="imagem" accept="image/*" onchange="handleImageUpload(event)">
            </div>
        `,
        pedido: `
            <div class="form-group">
                <label>Produto *</label>
                <input type="text" id="produto" required>
            </div>
            <div class="form-group">
                <label>Endereço *</label>
                <input type="text" id="endereco" required>
            </div>
            <div class="form-group">
                <label>Valor (R$) *</label>
                <input type="number" id="valor" step="0.01" min="0" required>
            </div>
            <div class="form-group">
                <label>Imagem</label>
                <input type="file" id="imagem" accept="image/*" onchange="handleImageUpload(event)">
            </div>
        `,
        cliente: `
            <div class="form-group">
                <label>Nome *</label>
                <input type="text" id="nome" required>
            </div>
            <div class="form-group">
                <label>CPF (apenas números) *</label>
                <input type="text" id="cpf" maxlength="11" required>
            </div>
            <div class="form-group">
                <label>Imagem</label>
                <input type="file" id="imagem" accept="image/*" onchange="handleImageUpload(event)">
            </div>
        `,
        vendedor: `
            <div class="form-group">
                <label>Nome *</label>
                <input type="text" id="nome" required>
            </div>
            <div class="form-group">
                <label>Imagem</label>
                <input type="file" id="imagem" accept="image/*" onchange="handleImageUpload(event)">
            </div>
        `,
        montadora: `
            <div class="form-group">
                <label>Nome *</label>
                <input type="text" id="nome" required>
            </div>
            <div class="form-group">
                <label>Imagem</label>
                <input type="file" id="imagem" accept="image/*" onchange="handleImageUpload(event)">
            </div>
        `
    };

    const deleteBtn = editingId ? '<button type="button" class="btn-delete" onclick="deletarItem()">Excluir</button>' : '';

    return `
        <form onsubmit="salvarFormulario(event)">
            ${formularios[tipo]}
            <input type="hidden" id="imagemData">
            <div class="form-buttons">
                <button type="button" class="btn-cancel" onclick="fecharModal()">Cancelar</button>
                ${deleteBtn}
                <button type="submit" class="btn-submit">${editingId ? 'Salvar' : 'Adicionar'}</button>
            </div>
        </form>
    `;
}

// Manipular upload de imagem
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagemData').value = e.target.result;
        };
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
        if (input && key !== 'id') {
            if (key === 'imagem') {
                // Para imagens, armazenar no campo oculto
                const imagemData = document.getElementById('imagemData');
                if (imagemData) {
                    imagemData.value = item[key];
                }
            } else {
                input.value = item[key];
            }
        }
    });
}

// Salvar formulário
async function salvarFormulario(event) {
    event.preventDefault();
    const form = event.target;
    const data = {};

    // Coletar dados do formulário
    for (let input of form.querySelectorAll('input, select')) {
        if (input.id && input.type !== 'file') {
            data[input.id] = input.value;
        }
    }

    // Adicionar imagem se foi carregada
    const imagemData = document.getElementById('imagemData');
    if (imagemData && imagemData.value) {
        data.imagem = imagemData.value;
    }

    const key = currentSection + 's';
    const items = await getData(key);

    if (editingId) {
        // Atualizar item existente
        const index = items.findIndex(i => i.id == editingId);
        if (index !== -1) {
            items[index] = { ...items[index], ...data };
        }
    } else {
        // Adicionar novo item
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
    if (!confirm('Tem certeza que deseja excluir este item?')) return;

    const key = currentSection + 's';
    const items = await getData(key);
    const newItems = items.filter(i => i.id != editingId);
    
    await saveData(key, newItems);
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