"use strict";
import User from '../model/User.js'

export const existsUserInBD = async (req, res, next) => {

    const user = req.body.usuario
    try {
        const existe = await User.findOne({ usuario: user })

        if (existe) {
            return res.status(400).json({
                message: 'El usuario existe en la base de datos'
            });
        }
        return next()
    } catch (e) {
        console.log(e)
    }
};