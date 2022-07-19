const connection = require('../connection')

// const users = [
//     {id: 1, nombre: 'Jonathan', edad: '29'},
//     {id: 2, nombre: 'Simón', edad: '30'},
//     {id: 3, nombre: 'Felipe', edad: '30'}
// ]

const getViewUsers = (req, res) => {
    // res.send('Página para mostrar todos los usuarios')
    // sendfile para enviar archivos html
    // res.sendFile('view-users.html', {root: root})
    const sql = 'SELECT * FROM users' //Sentencia SQL que nos permitirá leer los archivos de la tabla

    // Ejecutamos dicha sentencia
    connection.query(sql, (err, result) => { // .query va a requerir 2 parametros (sql y un callback), Le diremos que en err almacene el error en el caso de que haya alguno. Le pondremos result si es que la consulta se efectua correctamente y ahí (en result) me almacene el resultado de la consulta
        if (err) {
            console.log('Ha ocurrido un error')
        }else{
            //console.log(result) // Mostramos lo que nos devuelve .query, en este caso es result que contiene la data de la bdd
            res.render('view-users', {users: result}) // Result: los datos directamente de la base de datos
        }
     }) 
}
const getCreateUser = (req, res) => {
    // res.send('Página para la creación de usuario')
    // sendfile para enviar archivos html
    // res.sendFile('create-user.html', {root: root})
    res.render('create-user')
}
const getUpdateUser = (req, res) => {
    // res.send('Página para la actualización de usuario')
    // sendfile para enviar archivos html
    // res.sendFile('update-user.html', {root: root})
    const param = req.params.id
    const sql = 'SELECT * FROM users where id=?'
    connection.query(sql, param, (err, result) => {
        if (err) {
            console.log(`Ha ocurrido un error: ${err}`)
        }else{
            console.log(result)
            res.render('update-user', {user: result}) // user: es el valor que tiene update-user.ejs en los value, cuando encuentra el usuario en el forEach
        }
    })
}

const getDeleteUser = (req, res) => {
    // res.send('Página para borrar usuario')
    // sendfile para enviar archivos html
    // res.sendFile('delete-user.html', {root: root})
    const param = req.params.id
    const sql = 'SELECT * FROM users where id=?'
    connection.query(sql, param, (err, result) => {
        if (err) {
            console.log(`Ha ocurrido un error: ${err}`)
        }else{
            console.log(result)
            res.render('delete-user', {user: result}) // user: es el valor que tiene update-user.ejs en los value, cuando encuentra el usuario en el forEach
        }
    })
}

const createUser = (req, res) => {
    //Mostrar datos del cliente
    // console.log(req.body) // Con req.body accedemos a datos que han sido enviados desde un formulario a nuestro servidor en node
	// users.push(req.body) // users es el array que está a principio del código que es el arreglo con los usuarios, hacemos un push para agregar el usuario al arreglo
    const sql = 'INSERT INTO users SET ?'
    const data = req.body // [Object: null prototype] { nombre: 'Kuyen', edad: '4' }
    connection.query(sql, data, (err, result) => {
        if (err) {
            console.log('Ha ocurrido un error al insertar el usuario')
        }else{
            console.log(data)
            console.log('Usuario registrado exitosamente') // Mostramos lo que nos devuelve .query, en este caso es result que contiene la data de la bdd
            res.redirect('/users') // Enviamos el arreglo cuando entremos a viewUsers
        }
    })
    console.log(req.body)
	// res.render('view-users', {users: users}) // Copiamos la linea de getViewUsers para realizar el render
}
const updateUser = (req, res) => {
/*     console.log(req.params) // Dentro de params hay un objeto: { id: '1' } me imagino que devuelve el parametro que le damos en la URL, entonces:
    const param = req.params.id // Almacenamos el id del parametro en una constante param
    for (let i = 0; i < users.length; i++) { // For que recorre mi array de usuarios
        if (param == users[i].id){ // Condicion si el parametroo es igual al array de usuarios en la posicion actual es decir [i] y que compare el id 
            // Entonces si coincide con el id que está guardado en el array usuario, lo que hago es:
            users[i].nombre = req.body.nombre // Asignamos el nombre que le damos en el formulario (req.body.nombre) al de la posicion [i].nombre (En donde estemos parados, donde haya hecho match con el id)
            users[i].edad = req.body.edad // Asignamos la edad que le damos en el formulario (req.body.edad) al de la posicion [i].nombre (En donde estemos parados, donde haya hecho match con el id))
            break
        }
    }
    res.render('view-users', {users: users}) */

    const param = req.params.id
    const sql = `UPDATE users SET nombre='${req.body.nombre}', edad=${req.body.edad} WHERE id=${param}`
    // Ahora efectuamos la coneccion
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(`Ha ocurrido un error: ${err}`)
        } else {
            console.log(`Usuario ${param} con nombre ${req.body.nombre} se ha actualizado`)
            res.redirect('/users')
        }
    })
}
const deleteUser = (req, res) => {
/*     console.log(req.params) // Dentro de params hay un objeto: { id: '1' } me imagino que devuelve el parametro que le damos en la URL, entonces:
    const param = req.params.id // Almacenamos el id del parametro en una constante param
    for (let i = 0; i < users.length; i++) { // For que recorre mi array de usuarios
        if (param == users[i].id){ // Condicion si el parametroo es igual al array de usuarios en la posicion actual es decir [i] y que compare el id 
            users.splice(i, 1) // Con splice( Posicion i, cantidad a eliminar)
            break
        }
    }
    res.render('view-users', {users: users})  */
    const param = req.params.id
    console.log(param)
    const sql = `DELETE FROM users WHERE id=${param}`
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(`Ha ocurrido un error: ${err}`)
        }else{
            res.redirect('/users')
        }
    })
}

// Debemos exportar cada una de estas funciones
module.exports = {getViewUsers, getCreateUser, getUpdateUser, getDeleteUser, createUser, updateUser, deleteUser}