import Role from "../model/Role.js";
import User from "../model/User.js";

export const createRoles = async () => {
    try {
        // chequeo que si existe algun Rol en la BD
        const count = await Role.estimatedDocumentCount();

        // chequeo que si existe algun Rol existente
        if (count > 0) return;

        // Creo Roles por defecto
        const values = await Promise.all([
            new Role({ tipo: "superAdmin" }).save(),
            new Role({ tipo: "admin" }).save(),
            new Role({ tipo: "default" }).save(),
            new Role({ tipo: "emprendedor" }).save(),
        ]);

        console.log(values);
    } catch (error) {
        console.error(error);
    }
};

export const createSuperAdmin = async () => {

    const count = await User.estimatedDocumentCount();

    // chequeo que si existe algun usuario en la BD
    if (count > 0) return;

    // chequeo que si existe algun usuario superAdmin
    const userFound = await User.findOne({ usuario: process.env.SUPER_ADMIN_USUARIO });

    if (userFound) return;

    // Obtengo el id del rol superAdmin
    const rol = await Role.findOne({ tipo: process.env.SUPER_ADMIN_ROLE });


    // Creo un usuario Super Admin
    if (rol) {

        const newUser = await User.create({
            nombre: process.env.SUPER_ADMIN_NOMBRE,
            apellido: process.env.SUPER_ADMIN_NOMBRE,
            email: process.env.SUPER_ADMIN_EMAIL,
            pass: await User.encryptPassword(process.env.SUPER_ADMIN_PASSWORD),
            roles: rol.id,
        });
        console.log(`new user created: ${newUser}`);
    } else {
        createSuperAdmin();
    }
};

createRoles();
createSuperAdmin();