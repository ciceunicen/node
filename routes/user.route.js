import express from "express";
const router = express.Router();

// import { validatorExpress } from "../middlewares/validatorExpress.js";
// import { existsUserInBD } from "../middlewares/existsUserInBD.js";

import {
    getAll,
    editRole
} from "../controllers/user.controller.js";

router.get('/usuarios', getAll)
router.put('/usuarios/:id/:tipo', editRole)

export default router;