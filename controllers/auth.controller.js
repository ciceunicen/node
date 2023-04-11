
import User from '../model/User.js'
import Role from '../model/Role.js'
import { generateToken } from '../utils/tokenManager.js';

export const register = async (req, res) => {
    try {

        let { nombre, pass, usuario, email } = req.body;

        const rol = await Role.findOne({ tipo: "usuario" });
        if (!rol)
            return res.status(403).json({ error: "No existe ese rol en la base de datos" });

        const newUser = new User({
            nombre,
            usuario,
            pass: await User.encryptPassword(pass),
            email,
            roles: rol._id
        })

        await newUser.save()
        return res.status(201).json({ ok: "ok" });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(403).json({ error: error.keyValue, message: "ya existe ese dato registrado " });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const login = async (req, res) => {
    try {
        let { usuario, pass } = req.body;

        const user = await User.findOne({ usuario }).populate("roles");
        console.log(user)


        if (!user)
            return res.status(403).json({ error: "No existe el usuario" });

        let coincidePass = await User.comparePassword(pass, user.pass)

        if (!coincidePass)
            return res.status(403).json({ error: "Password incorrecto" });


        let { _id, nombre, email, roles } = user


        //GENERAR TOKEN
        const { token, tiempoVidaToken } = generateToken(_id, usuario, nombre)

        return res.status(201).json({ token, tiempoVidaToken, _id, nombre, email, usuario, rol: roles })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Error de servidor" })

    }
}