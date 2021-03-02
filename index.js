/**
 * @fileoverview Archivo principal 
 * 
 * @version 1.0
 * 
 * @author Andres Gutierrez <andresg206@gmail.com>
 * 
 * History:
 * 1.0 - Version principal
 */

//Incluimos los modulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//incluimos las variables de entorno
require('dotenv').config();

//obtenemos la data de configuración
const config = require('./config.json');

//Condicionamos el puerto segun el enviroment
const config_port = process.env.NODE_ENV == 'development' ? config.mainInfo.dev_port : config.mainInfo.default_port;
const port = process.env.PORT || config_port;

//iniciamos express
const app = express();

//Incluimos body parser en toda la app
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//incluimos las rutas
app.use(require('./routes/index.js'));

//conectamos la base de datos
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(()=> {
    console.log('Base de datos conectada');
    //Iniciamos el servidor
    app.listen(port,() => {
        console.log(`Servidor iniciado en el puerto:`, port);
    })
})
.catch(e => console.log(e))

