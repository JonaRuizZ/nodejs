// Express
const express = require('express')
const app = express()
const path = require('path')
const connection = require('./connection')

// Puerto donde se levantará el server
//const port = 3000

// Importamos el archivo users
const user = require('./routes/users')

// Importamos el middleware que está dentro de logged.js
const loggedMiddleware = require('./middleware/logged')

//Utilizamos el middleware
app.use(loggedMiddleware.isLogged)
app.use(express.urlencoded({extended:false}))

//Utilizando un middleware para archivos estaticos (imgs, html, css, js...)
console.log(__dirname)
app.use(express.static(`${__dirname}/public`))

//Configuraciones y motores de vista
app.set('title', 'Aplicacion hecha en node')
app.set('port', 3000)

app.set('view engine', 'ejs') // ejs es el tipo de plantilla que vamos a usar
app.set('views', path.join(__dirname, 'views')) // Ubicación de views

// Cuando envíe la peticion para acceder a / (localhost:3000) se envía la petición (De el cliente al servidor) y antes que se emita la respuesta (Del servidor al cliente) se ejecuta la función my_middleware

// Rutas de la web, esto es lo que mostrará la raíz del sitio web
app.get('/', (req, res) => {
    res.render('index')
})

// Mi app con express va a utilizar todas las rutas que estén declaradas en routes > users, IMPORTANTE ese '/users' es lo que va antes de las funciones que están en: const user = require('./routes/users') o sea, en el explorador vamos a escribir localhost:3000/users/create donde crearemos un usuario ó localhost:3000/users/delete donde eliminaremos un usuario. Estamos diciendo que habrá un /users antes de cualquier acción que hagamos de los usuarios
app.use('/users', user)

// Funcionalidad para que nuestro servidor escuche por un puerto
app.listen(app.get('port'), () => {
    console.log(`Mi ${app.get('title')} está corriendo en el puerto:${app.get('port')}`)
})