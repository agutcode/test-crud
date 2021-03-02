/**
 * @fileoverview Archivo principal de Rutas
 * 
 * @version 1.0
 * 
 * @author Andres Gutierrez <andresg206@gmail.com>
 * 
 * History:
 * 1.0 - Version principal
 */
//incluimos los modulos
const express = require('express');
const app = express()

app.use('/users',require('./users'));

module.exports = app;