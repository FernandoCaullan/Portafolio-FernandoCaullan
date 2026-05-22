CREATE DATABASE  if NOT EXISTS fcaullan_db1;

use  DATABASE fcaullan_db1;

CREATE table usuario(
    id int  AUTO_INCREMENT primary key,
    nombre varchar (20) unique not null,
    pasword varchar (50) unique not null
);

create table perfil(
    id int AUTO_INCREMENT primary key,
    nom_bio varchar(100) not null,
    mini_bio varchar(30) not null,
    detalle_bio text not null,
    img_bio varchar (255) not null
)

create table skils(
    id int AUTO_INCREMENT primary key,
    nom_skill varchar (20) not null unique,
    img_icono varchar (255) not null
)
