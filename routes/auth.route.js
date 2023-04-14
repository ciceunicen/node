import express from "express";
const router = express.Router();

import { validatorExpress } from "../middlewares/validatorExpress.js";
import { existsUserInBD } from "../middlewares/existsUserInBD.js";
import { body } from "express-validator";


import {
    register,
    login
} from "../controllers/auth.controller.js";


router.post('/register',
    [
        body("nombre", "faltan ingresar datos").trim().isLength({ min: 1 }),
        body("usuario", "faltan ingresar datos").trim().isLength({ min: 1 }),
        body("pass", "minimo 6 caracteres").trim().isLength({ min: 6 }),
        body("email", "Formato email incorrecto").trim().isEmail().normalizeEmail(),

    ],
    validatorExpress,
    existsUserInBD,
    register
)


router.post('/login',
    [
        body("usuario", "minimo 4 letras").trim().isLength({ min: 4 }),
        body("usuario", "maximo 20 letras").trim().isLength({ max: 20 }),
        body("pass", "minimo 6 caracteres").trim().isLength({ min: 6 }),
        body("pass", "maximo 20 caracteres").trim().isLength({ max: 20 }),
    ],
    validatorExpress,
    login
)

router.get('/logout', authController.logout)


export default router;
