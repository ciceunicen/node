import User from '../model/User.js'
import Role from '../model/Role.js'
import { generateToken, saveInCookie } from '../utils/tokenManager.js';

export const register = async (req, res) => {
    try {

        let { nombre, apellido, pass, email, roles } = req.body;

        if (!roles) {
            const rol = await Role.findOne({ tipo: "default" });
            if (!rol)
                return res.status(403).json({ error: "No existe ese rol en la base de datos" });
            const newUser = new User({
                nombre,
                apellido,
                pass: await User.encryptPassword(pass),
                email,
                roles: rol._id
            })
            await newUser.save()
            return res.status(201).json({ ok: "ok" });
        }
        else {
            const rol = await Role.find({ tipo: { $in: roles } });
            const newUser = new User({
                nombre,
                apellido,
                pass: await User.encryptPassword(pass),
                email,
                roles: rol.map(role => role._id)
            })
            await newUser.save()
            return res.status(201).json({ ok: "ok" });
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.status(403).json({ error: error.keyValue, message: "ya existe ese dato registrado " });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const login = async (req, res) => {
    try {
        let { email, pass } = req.body;

        const user = await User.findOne({ email }).populate("roles");
        console.log(user)

        if (!user)
            return res.status(403).json({ error: "No existe el usuario" });

        let coincidePass = await User.comparePassword(pass, user.pass)

        if (!coincidePass)
            return res.status(403).json({ error: "Password incorrecto" });


        let { _id, nombre, apellido, roles } = user


        //GENERAR TOKEN
        const { token, tiempoVidaToken } = generateToken(_id, email, nombre)
        saveInCookie(res, token)

        return res.status(201).json({ token, tiempoVidaToken, _id, nombre, email, apellido, rol: roles })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Error de servidor" })

    }
}

export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ logout: true })
}

// export const getAll = async (req, res) => {

//     try {
//         const user = await User.find().populate("roles");

//         if (user) {
//             return res.status(201).json({ user })
//         }

//         return res.status(400).json({
//             message: 'No existen usuarios en la base de datos'
//         });
//     }
//     catch (e) {
//         return res.status(500).json({ error: "Error de servidor" })
//     }

// }

// export const editRole = async (req, res) => {
//     const { id, tipo } = req.params;
//     const rol = await Role.findOne({ tipo });

//     try {
//         if (rol) {
//             let user = await User.updateOne({ _id: id }, { $set: { roles: rol } })
//             return res.status(201).json({ user })
//         }
//         return res.status(403).json({ error: "Ese rol no es permitido" })

//     }
//     catch (e) {
//         return res.status(500).json({ error: "Error de servidor" })
//     }

// }