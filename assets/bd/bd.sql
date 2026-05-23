CREATE DATABASE IF NOT EXISTS fcaullan_db1;

USE fcaullan_db1;

CREATE TABLE IF NOT EXISTS usuario(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) UNIQUE NOT NULL,
    pasword VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS perfil(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_bio VARCHAR(100) NOT NULL,
    mini_bio VARCHAR(30) NOT NULL,
    detalle_bio TEXT NOT NULL,
    img_bio VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS skils(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_skill VARCHAR(20) NOT NULL UNIQUE,
    img_icono VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS dominiotec(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_Tec VARCHAR(100) NOT NULL,
    porcentaje INT NOT NULL,
    img_icono VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS trabajos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    img_prev VARCHAR(255),
    demo_url VARCHAR(255),
    github_url VARCHAR(255)
);
CREATE Table if not exists llamado(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_jefe VARCHAR(100) not null,
    email VARCHAR(255) not null,
    dato_importa VARCHAR(30) not null,
    msg_importa TEXT not null
);