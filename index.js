import "dotenv/config";
import express from "express";
const app = express()
import "./database/connect_db.js";
import authRoutes from "./routes/auth.route.js";

//VAMOS A TRABAJAR CON JSON
app.use(express.json())
    //PARA PROCESAR DATOS ENVIADOS DESDE FORMS
    .use(express.urlencoded({
        extended: true
    }))


/*
ROUTER
*/
app.use("/api", authRoutes);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`👍👍👍 Escuchando en el puerto ${PORT}`)
})
