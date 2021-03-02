/**
 * @fileoverview controladores de usuarios
 * 
 * @version 1.0
 * 
 * @author Andres Gutierrez <andresg206@gmail.com>
 * 
 * History:
 * 1.0 - Version principal
 */

//Incluimos el modelo del usuario
const User  = require('../models/user');

//incluimos el modulo para validaciones
const Joi = require('@hapi/joi');

//incluimos las funciones complementarias
const helper = require('../helper');

//Creamos el schema de validación para nuevos usuarios
const schemaCreate = Joi.object({
    name:Joi.string().required(),
    last_name: Joi.string().required(),
    legajo: Joi.string().required(),
    email:Joi.string().required().email(),
    birthday: Joi.date().required()
})
//Creamos el schema de validación para actualizar usuarios
const schemaUpdate = Joi.object({
    name:Joi.string().min(3),
    last_name: Joi.string().min(2),
    legajo: Joi.string().min(8),
    email:Joi.string().min(8).email(),
    birthday: Joi.date()
})

const controller = {
    create: async (req,res) => {

        //Validamos tipos de datos y que no traiga campos requeridos vacios
        const {error} = schemaCreate.validate(req.body); 
        if(error){
            //devolvemos bad request y el primer mensaje de error
            return res.status(400).json({
                error: error.details[0].message
            })
        }
        //Validamos que el legajo no esté registrado
        const legajoExist = await User.findOne({legajo: req.body.legajo});
        if(legajoExist) return res.status(400).json({error:true, mensaje:'Legajo ya registrado'});

        //Validamos que el email no esté registrado
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(400).json({error:true, mensaje:'Email ya registrado'});

        const user = new User({
            name: req.body.name,
            last_name: req.body.last_name,
            legajo: req.body.legajo,
            email: req.body.email,
            birthday: req.body.birthday
        })
        try {
            const userDB = await user.save();
            res.json({
                error:null,
                data:userDB
            })
        } catch (error) {
            res.status(400).json({
                error:true,
                data:error
            })
        }
    },
    read: async (req, res) => {
        //identificamos el id de usuario y otros parametros de query (Si se enviaron en el request)
        const {id} = req.params;
        const query_params = req.query;
        const limit = parseInt(query_params.limit) || 10;
        const offset = parseInt(query_params.offset) || 0;

        let where = {};
        //Si se solicito un id se agrega como parametro de busqueda
        if(id){
            where._id = id;
        } 
        //inicializamos el array de respuesta
        const data = [];
        //buscamos el o los usuarios 
        const search = await User.find(where).limit(limit).skip(offset);
        for (const {_id:id,name,last_name,birthday} of search) {
            const o = {
                id,
                name,
                last_name,
                age:helper.getAge(birthday)
            }
            //Agregamos el objeto al array de respuesta
            data.push(o);
        }
        res.json({data});
    },
    update: async (req,res) => {
        let {id} = req.params;
        if(!id) return res.status(400).json({error: 'Error: No se ha recibido el parametro id'});

        //Validamos tipos de datos y que no traiga campos requeridos vacios
        const {error} = schemaUpdate.validate(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});

        //Validamos que el legajo no esté registrado
        const legajoExist = await User.findOne({legajo: req.body.legajo});
        if(legajoExist && legajoExist.id !== id) return res.status(400).json({error:true, mensaje:'Legajo ya registrado'});

        //Validamos que el email no esté registrado
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist && emailExist.id !== id) return res.status(400).json({error:true, mensaje:'Email ya registrado'});

        try {
            //Buscar y editar el usuario
            const updateUser = await User.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
            res.json({
                error:null,
                message:'Datos del usuario actualizados'
            })
        } catch (error) {
            res.status(400).json({error})
        }        
    },
    delete: async (req,res) => {
        let {id} = req.params;
        //Bad request en caso de que no proporcionaran el id en el request
        if(!id) return res.status(400).json({error: 'No se ha proporcionado el id del usuario'});

        try {            
            //buscar y eliminar el usuario de la base de datos
            const deleteUser = await User.findByIdAndDelete({_id: id});
            if(deleteUser) {
                res.json({
                    status:true,
                    message: 'Usuario eliminado'
                })
            } else {
                res.json({
                    status:false,
                    message:'No pudo eliminarse el usuario'
                })
            }
        } catch (error) {
            res.json({
                status:false,
                message:'No pudo eliminarse el usuario'
            })
        }
    }
};

module.exports = controller;