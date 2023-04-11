"use strict";

import jwt from "jsonwebtoken";


export const generateToken = (id, user, name) => {
    try {
        let tiempoVidaToken = 60 * 1 // 60 seg (1 min) * 15 = total = 15 min

        //EL SIGN CONTIENE EL PAYLOAD QUE ES LA INFORMACION DEL USUARIO
        let token = jwt.sign({ id, usuario: user, nombre: name }, process.env.JWT_SECRET, { expiresIn: tiempoVidaToken })
        return { token, tiempoVidaToken }
    } catch (e) {
        console.log(e)
    }
}
