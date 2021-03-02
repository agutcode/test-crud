/**
 * @fileoverview rutas de usuarios
 * 
 * @version 1.0
 * 
 * @author Andres Gutierrez <andresg206@gmail.com>
 * 
 * History:
 * 1.0 - Version principal
 */

//Incluimos el metodo Router de express
const router = require('express').Router();

//Incluimos los controladores
const controllers = {
    users: require('../controllers/users')
}

//Seteamos las rutas para cada metodo
router.post('/',controllers.users.create);
router.get('/:id?',controllers.users.read);
router.put('/:id?',controllers.users.update);
router.delete('/:id',controllers.users.delete);


//exportamos el modulo
module.exports = router;