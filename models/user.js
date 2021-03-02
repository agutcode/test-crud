/**
 * @fileoverview modelo de usuarios
 * 
 * @version 1.0
 * 
 * @author Andres Gutierrez <andresg206@gmail.com>
 * 
 * History:
 * 1.0 - Version principal
 */

//incluimos el modulo de Mongodb
const mongoose = require('mongoose');

//seteamos el schema para los usuarios
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    legajo: {
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    birthday:{
        type:Date,
        required:true
    }

});

//exportamos el modelo con el schema de usuario
module.exports = mongoose.model('User',userSchema)