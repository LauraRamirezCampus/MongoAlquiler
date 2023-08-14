import dotenv from "dotenv";
import express from "express";
import appCliente from "./routers/cliente.js";



dotenv.config();
let app = express();

app.use(express.json());
app.use("/cliente",appCliente)
let config = JSON.parse(process.env.MY_SERVER)

app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});