import {con} from "../db/atlas.js";
import {limitGrt} from "../limit/config.js"
import { Router } from "express";

const appReserva = Router();

let db = await con();
let Reserva = db.collection("Cliente");

appReserva.get("/",limitGrt(),async(req,res)=>{
    if(!req.rateLimit) return;
    console.log(req.rateLimit);
    let resul = await Reserva.aggregate([
        {
            $lookup: {
                from: "Contrato",
                localField: "ID_Cliente",
                foreignField: "ID_Cliente",
                as: "Reserva"
            }
        },
        {
            $lookup: {
                from: "Automovil",
                localField: "Reserva.ID_Automovil",
                foreignField: "ID_Automovil",
                as: "Automovil"
            }
        },{
            $unwind:'$Reserva'
        },
        {
            $unwind:'$Automovil'
        },
        {
            $project: {
                _id:0,
                "Reserva":1,
                "Automovil":1,
                Nombre:1,
                Nombre: 1,
                Apellido: 1,
                DNI: 1,
                Direccion: 1,
                Telefono: 1, 
                Email: 1,
                Marca:1
                
            }
        }
    ]).toArray();
    res.send(resul);
    
});
export default appReserva; 