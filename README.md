# 🚗 Sigma Automóveis - Sistema de Gestão

![Logo Sigma Automóveis](assets/img/logo.jpeg)

> **Nota:** Este é um projeto de desenvolvimento web focado em Front-End, simulando funcionalidades de um sistema completo (SPA) utilizando LocalStorage para 
persistência de dados.

## 📖 Sobre o Projeto

O **Sigma Automóveis** (Rede Sigma Software System) é uma aplicação web desenvolvida para gerenciar as operações de uma concessionária de veículos. 
O projeto permite o controle total sobre o fluxo da loja, 
desde o cadastro de montadoras e veículos até o registro de vendas e pedidos.

Este projeto foi originalmente criado como um primeiro passo no desenvolvimento web e recentemente modernizado com melhorias 
em arquitetura de código, responsividade e interface do usuário.

## 🚀 Funcionalidades

O sistema conta com um **CRUD Completo** (Criar, Ler, Atualizar, Deletar) para os seguintes módulos:

* **🏎️ Controle de Veículos:** Cadastro detalhado com chassi, placa, ano, cor e preço.
* **🛒 Controle de Compras:** Registro de aquisições de veículos/peças junto a fornecedores.
* **💰 Controle de Vendas:** Registro de vendas para clientes, vinculando vendedores.
* **📦 Controle de Pedidos:** Gestão de pedidos internos e externos.
* **👥 Gestão de Clientes:** Base de dados de compradores.
* **card_membership Gestão de Vendedores:** Equipe de vendas da concessionária.
* **🏭 Controle de Montadoras:** Fabricantes parceiras.

### ✨ Destaques Técnicos

* **Persistência Local (LocalStorage):** O sistema salva todos os dados no navegador do usuário, permitindo testar todas as funcionalidades sem necessidade de 
configurar um banco de dados real.
* **Sidebar Responsiva:** Menu lateral com animação de colapso, adaptando-se para exibir apenas ícones ou menu completo.
* **Fallback Inteligente de Imagens:** Se o usuário não fizer upload de uma foto, o sistema gera automaticamente um ícone representativo para o item.
* **Sistema de Modais:** Formulários de cadastro e edição carregados dinamicamente em modais reutilizáveis.
* **Design Responsivo:** Interface adaptada para Desktop e Mobile.

## 🛠️ Tecnologias Utilizadas

* **HTML5** (Semântico)
* **CSS3** (Flexbox, Grid, Animações, Media Queries)
* **JavaScript** (ES6+, Async/Await, Manipulação de DOM)
* **Google Material Icons** (Ícones da interface)

## 📂 Estrutura do Projeto

```text
projeto-sigmaautomoveis/
│
├── assets/
│   ├── css/
│   │   └── styles.css       # Estilização global e responsiva
│   ├── img/                 # Imagens e ícones do sistema
│   └── js/
│       └── script.js        # Lógica de negócio, CRUD e LocalStorage
│
├── pages/
│   ├── main.html            # Dashboard principal (Aplicação SPA)
│   └── cadastro.html        # Página de registro de usuários
│
├── index.html               # Página de Login
├── sbase.sql                # (Referência) Estrutura do banco de dados SQL original
└── README.md                # Documentação do projeto
```

## ⚙️ Como Rodar o Projeto
Como o projeto utiliza LocalStorage e caminhos relativos, recomenda-se rodar através de um servidor local simples para evitar bloqueios de segurança do navegador (CORS).

### Pré-requisitos
* Um navegador moderno (Ex: Chrome, Firefox, Edge).

* Um editor de código (VS Code recomendado).

## Passo a Passo

* Clone o repositório:

```text
Bash

git clone [https://github.com/seu-usuario/projeto-sigmaautomoveis.git](https://github.com/seu-usuario/projeto-sigmaautomoveis.git)
```

* Abra a pasta no VS Code.

* Inicie com Live Server:

* Instale a extensão Live Server no VS Code.

* Clique com o botão direito no arquivo index.html.

* Selecione "Open with Live Server".

* Login:

* Na tela de login, você pode inserir qualquer e-mail/senha para entrar (simulação) ou clicar em "Cadastre-se".

## 🗄️ Sobre o Banco de Dados (SQL)
O arquivo sbase.sql incluído no projeto serve como documentação da estrutura de dados. Embora 
a versão atual rode inteiramente no navegador via LocalStorage para facilidade de demonstração 
em portfólio, a estrutura foi pensada para ser compatível com um banco de dados MySQL/MariaDB 
em uma futura implementação Back-End.

## ✒️ Autor
Desenvolvido por Junior Carvalho.

> **Este projeto é para fins educacionais e de portfólio.**