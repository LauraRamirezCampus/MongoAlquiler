import dotenv from "dotenv";
import express from "express";
import appCliente from "./routers/cliente.js";
import appAuto from "./routers/automovil.js";
import appAlquiler from "./routers/alquiler.js";
import appReserva from "./routers/reserva.js";



dotenv.config();
let app = express();

app.use(express.json());
app.use("/cliente",appCliente);
app.use("/Automovil",appAuto);
app.use("/alquiler",appAlquiler);
app.use("/Reserva",appReserva);

let config = JSON.parse(process.env.MY_SERVER)

app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});