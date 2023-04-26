import express from "express";
const router = express.Router();

import { validatorExpress } from "../middlewares/validatorExpress.js";
import { existsUserInBD } from "../middlewares/existsUserInBD.js";
import { body } from "express-validator";


import {
    register,
    login,
    logout,
} from "../controllers/auth.controller.js";


router.post('/usuarios',
    [
        body("nombre", "faltan ingresar datos").trim().isLength({ min: 1 }),
        body("apellido", "faltan ingresar datos").trim().isLength({ min: 1 }),
        body("pass", "minimo 8 caracteres").trim().isLength({ min: 8 }),
        body("pass", "Formato de pass incorrecto").custom(
            (value, { req }) => {
                if (value !== req.body.re_pass) {
                    throw new Error("No coinciden las contraseñas")
                }
                return value;
            }
        ),
        body("email", "Formato email incorrecto").trim().isEmail().normalizeEmail(),


    ],
    validatorExpress,
    existsUserInBD,
    register
)


router.post('/auth/login',
    [
        body("email", "minimo 4 letras").trim().isLength({ min: 4 }),
        body("pass", "minimo 8 caracteres").trim().isLength({ min: 8 }),
        body("pass", "maximo 20 caracteres").trim().isLength({ max: 20 }),
    ],
    validatorExpress,
    login
)

router.get('/logout', logout)

export default router;
