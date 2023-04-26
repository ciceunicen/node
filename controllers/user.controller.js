import User from '../model/User.js'
import Role from '../model/Role.js'

export const getAll = async (req, res) => {

    try {
        console.log("entroooooooooooooooo")
        const user = await User.find().populate("roles");

        if (user) {
            return res.status(201).json({ user })
        }

        return res.status(400).json({
            message: 'No existen usuarios en la base de datos'
        });
    }
    catch (e) {
        return res.status(500).json({ error: "Error de servidor" })
    }

}

export const editRole = async (req, res) => {
    const { id, tipo } = req.params;
    const rol = await Role.findOne({ tipo });

    try {
        if (rol) {
            let user = await User.updateOne({ _id: id }, { $set: { roles: rol } })
            return res.status(201).json({ user })
        }
        return res.status(403).json({ error: "Ese rol no es permitido" })

    }
    catch (e) {
        return res.status(500).json({ error: "Error de servidor" })
    }

}