"use strict";

import jwt from "jsonwebtoken";


export const generateToken = (id, user, name) => {
    try {
        let tiempoVidaToken = 60 * 15 // 60 seg (1 min) * 15 = total = 15 min

        //EL SIGN CONTIENE EL PAYLOAD QUE ES LA INFORMACION DEL USUARIO
        let token = jwt.sign({ id, email: user, nombre: name }, process.env.JWT_SECRET, { expiresIn: tiempoVidaToken })

        return { token, tiempoVidaToken }
    } catch (e) {
        console.log(e)
    }
}


export const saveInCookie = (res, token) => {
    try {
        let tiempoVidaToken = 60 * 15 // 60 seg (1 min) * 15 = total = 15 min
        res.cookie("token", token, {
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + tiempoVidaToken * 1000)
        })
    } catch (e) {
        console.log(e)
    }
}
