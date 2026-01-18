CREATE DATABASE IF NOT EXISTS sigma_system;
USE sigma_system;

-- Usuários (Aumentado tamanho da senha para hash futuro)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Clientes (CPF como CHAR/VARCHAR pois zero à esquerda importa)
CREATE TABLE clientes (
    cpf CHAR(11) PRIMARY KEY NOT NULL,
    nome VARCHAR(100) NOT NULL
);

-- Vendedores (Criada ANTES de vendas para evitar erro de FK)
CREATE TABLE vendedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Montadoras
CREATE TABLE montadoras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Veículos
CREATE TABLE veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nchassi VARCHAR(50) NOT NULL UNIQUE,
    placa VARCHAR(20) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano_fabricacao INT(4) NOT NULL,
    ano_modelo INT(4) NOT NULL,
    cor VARCHAR(20),
    preco DECIMAL(10, 2)
);

-- Compras
CREATE TABLE compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    fornecedor VARCHAR(100)
);

-- Vendas (Agora funciona pois Cliente e Vendedor já existem)
CREATE TABLE vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_cpf CHAR(11) NOT NULL,
    vendedor_id INT NOT NULL,
    endereco VARCHAR(100),
    valor DECIMAL(10, 2),
    FOREIGN KEY (cliente_cpf) REFERENCES clientes(cpf),
    FOREIGN KEY (vendedor_id) REFERENCES vendedores(id)
);