CREATE DATABASE always_music
\c always music

 CREATE TABLE estudiantes (
    nombre VARCHAR(50) NOT NULL,
    rut VARCHAR(50) PRIMARY KEY,
    curso VARCHAR(100) NOT NULL,
    nivel SMALLINT NOT NULL
);