//CREATE DATABASE always_music
// \c always_music

//1. Realizar la conexión con PostgreSQL, utilizando la clase Pool y definiendo un
//máximo de 20 clientes, 5 segundos como tiempo máximo de inactividad de un
//cliente y 2 segundos de espera de un nuevo cliente.
const {Pool} = require('pg');
const argv = process.argv.slice(2);

let tipoConsulta = argv[0]
let arg1 = argv[1]
let arg2 = argv[2]
let arg3 = argv[3]
let arg4 = argv[4]


const config = {
user: 'postgres',
host: 'localhost',
database: 'always_music',
password: 'raby1949',
port: 5432,
max: 20,
idleTimeoutMillis: 5000,
connectionTimeoutMillis: 2000,
}
const pool = new Pool(config);

pool.connect((error_conexion, client, release) => {

    if (error_conexion) {
        console.log("Error de Conexion: ", error_conexion.code)
    } else {

        //2. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
        if (tipoConsulta == 'nuevo') {
            const registrar = async () => {
                const SQLQuery = {
                    name: "nuevo",
                    text: "insert into estudiantes (nombre,rut, curso, nivel) values ($1, $2, $3,$4) RETURNING *;",
                    values: [arg1, arg2, arg3, arg4],
                };
                try{
                    await client.query(SQLQuery);
                    console.log(`Estudiante ${arg1} agregado con exito`);
                }catch(error){
                    console.log("Error en Consulta", error.code);
                }
                release();
                pool.end();
            }
            registrar();
        }

        //3. Crear una función asíncrona para obtener por consola el registro de un estudiante
        //por medio de su rut.

        if (tipoConsulta == 'rut') {
            const consultaPorRut = async (rut) => {
                const SQLQuery = {
                    name: "rut",
                    text: "select * from estudiantes where rut=$1;",
                    values: [rut],
                };
               try{
                const res = await client.query(SQLQuery);
                console.log(res.rows);

               }catch(error){
                   console.log("Error en consulta", error.code);
               }
                release();
                pool.end();
            }
            consultaPorRut(arg1);
        }

        //   4. Crear una función asíncrona para obtener por consola todos los estudiantes registrados.

        if (tipoConsulta == 'consulta') {
            const totalEstudiantes = async () => {
                const SQLQuery = {
                    name: "estudiantes",
                    text: "select * from estudiantes",
                };
                try {
                    const res = await client.query(SQLQuery);
                    console.log("Registro Actual ", res.rows);

                }catch(error){
                    console.log("Error en Consulta", error.code);
                }
                release();
                pool.end();
            }
            totalEstudiantes();
        }

        //5. Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.

        if (tipoConsulta == 'editar') {
            const editarEstadiantes = async () => {
                const SQLQuery = {
                    name: "editar",
                    text: "UPDATE estudiantes SET rut = $1, curso = $2, nivel = $3 WHERE nombre = $4 RETURNING *;",
                    values: [arg2, arg3, arg4, arg1],
                };
                try {
                    await client.query(SQLQuery);
                    console.log(`Estudiante ${arg1} editado con exito`);
                }catch(error){
                    console.log("Error", error.code);
                }
                release();
                pool.end();
            }
            editarEstadiantes();
        }


        //6. Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.

        if (tipoConsulta == 'eliminar') {
            const eliminarEstudiantes = async (rut) => {
                const SQLQuery = {
                    name: "eliminar",
                    text: "DELETE FROM estudiantes WHERE rut=$1 RETURNING *;",
                    values: [rut],
                };
                try{
                    await client.query(SQLQuery);
                    console.log(`Registro de estudiante con rut ${rut} eliminado con exito`);
                }catch(error){
                    console.log("Error", error.code);
                }
                release();
                pool.end(); 
            }
            eliminarEstudiantes(arg1);
        }


        if (tipoConsulta == "arreglo"){
            const arregloEstudiantes = async ()=>{
                const SQLQuery= {
                    name: "arreglo",
                    rowMode: "array",
                    text: "SELECT * FROM estudiantes",
                };
                try{
                    const res = await client.query(SQLQuery);
                    console.log(res.rows);
                }catch(error){
                    console.log("Error", error.code)
                }
                release();
                pool.end();
            }
            arregloEstudiantes();
        }
    }
});