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

appReserva.get("/:id",limitGrt(),async(req,res)=>{
    if (!req.rateLimit) return;
    let id = Number(req.params.id);
    let db = await con();
    let collection = db.collection("Contrato");
    let result = await collection.find({"ID":id, Tipo:"Alquiler"}).toArray();
    res.send(result);
});
export default appReserva; 