-- Criar o banco de dados
CREATE DATABASE sigma_system;
USE sigma_system;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha varchar(10) NOT NULL
      
);
-- Tabela de Veículos
CREATE TABLE veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nchassi VARCHAR(50) NOT NULL,
    placa VARCHAR(20) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano_fabricacao INT (4)  NOT NULL,
    ano_modelo INT (4)  NOT NULL,
    cor VARCHAR(20),
    preco DECIMAL(10, 2)
);

-- Tabela de Compras
CREATE TABLE compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    fornecedor VARCHAR(100)
);

-- Tabela de Clientes
CREATE TABLE clientes (
    cpf INT(11)  PRIMARY KEY NOT NULL,
    nome VARCHAR(100) NOT NULL
      
);

-- Tabela de Vendas
CREATE TABLE vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_cpf INT(11) not null,
    vendedor_id int not null,
    endereco VARCHAR(100),
    valor DECIMAL(10, 2),
    FOREIGN KEY (cliente_cpf) REFERENCES clientes(cpf),
    FOREIGN KEY (vendedor_id) REFERENCES vendedores(id)
);

-- Tabela de Vendedores
CREATE TABLE vendedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
 
);

-- Tabela de Montadoras
CREATE TABLE montadoras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);
