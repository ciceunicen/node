import express from "express";
const router = express.Router();
import { requiereToken } from "../middlewares/requiereToken.js";

import {
    getAll,
    editRole
} from "../controllers/user.controller.js";

router.get('/usuarios', requiereToken, getAll)
router.put('/usuarios/:id/:tipo', requiereToken, editRole)

export default router;