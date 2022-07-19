const mysql = require('mysql')
const { mysql_database } = require('./config') // Cuando se trata de un objeto como en este caso que tiene datos dentro, HAY QUE DECLARARLO COMO UN OBJETO
const connection = mysql.createConnection(mysql_database) // CreateConection viene dentro del modulo mysql, esta funcion requiere un parametro que hay que ponerle los datos de la coneccion

connection.connect((err, conn) => { // Metodo connect me duelve una función
    if (err) {
        console.log('Ocurrió un error al conectarse')
    } else {
        console.log('Conexión exitosa')
        return conn
    }
})

module.exports = connection