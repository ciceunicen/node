"use strict";

// const express = require('express')
// const cookie = require('cookie-parser')
// const dontev = require('dotenv')
// const cors = require('cors');
// const connect = require('./database/connect_db')

import "dotenv/config";
import "./database/connect_db.js";
import express from "express";
import cors from "cors";
import cookie from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import "./libs/initialSetup.js";


//SETEAMOS VARIABLES DE ENTORNO
// dontev.config({
//     path: './env/.env'
// })

const app = express()



//HACEMOS USO DE LAS COOKIES
// app.use(cookie())

//HACEMOS USO DE LAS RUTAS PERMITIDAS DE LAS PROPIEDADES 
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2, process.env.ORIGIN3]

//HACEMOS USO DE LOS CORS
// app.use(cors(
//     {
//         origin: function (origin, callback) {
//             // console.log("🤞🤞🤞 => ", origin);
//             if (!origin || whiteList.includes(origin)) {
//                 return callback(null, origin);
//             }
//             return callback("Error de CORS origin: " + origin + " No autorizado")
//         }, credentials: true
//     }
// )
// )



//VAMOS A TRABAJAR CON JSON
app.use(express.json())



    //PARA PROCESAR DATOS ENVIADOS DESDE FORMS
    .use(express.urlencoded({
        extended: true
    }))



/*
ROUTER
*/
// app.use('/api', require('./routes/router.js'))
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`👍👍👍 Escuchando en el puerto ${PORT}`)
})


