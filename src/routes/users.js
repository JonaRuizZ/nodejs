const express = require('express')

// Ya no usamos la constante app, usamos las rutas, entonces usamos la función Router de express:
const router = express.Router()

// Importamos la carpeta users.js que está dentro de controllers
const userController = require('../controllers/users')

// Métodos get, estos son solamente vistas
router.get('/', userController.getViewUsers)
router.get('/create', userController.getCreateUser)
router.get('/update/:id', userController.getUpdateUser)
router.get('/delete/:id', userController.getDeleteUser)

// Métodos post, put y delete, acá está la lógica
router.post('/create', userController.createUser)
router.post('/update/:id', userController.updateUser) // Agregamos el parametro id /:id
router.post('/delete/:id', userController.deleteUser) // Agregamos el parametro id /:id

// Exportando este router para poder utilizarlo desde otro archivo
module.exports = router