import {con} from "../db/atlas.js";
import {limitGrt} from "../limit/config.js"
import { Router } from "express";

const appAlquiler = Router();

let db = await con();
let Alquiler = db.collection("Cliente");

appAlquiler.get("/",limitGrt(),async(req,res)=>{
    if(!req.rateLimit) return;
    console.log(req.rateLimit);
    let resul = await Alquiler.aggregate([
        {
            $lookup: {
                from: "Contrato",
                localField: "ID_Cliente",
                foreignField: "ID_Cliente",
                as: "Alquiler"
            }
        },
        {
            $match: {
                "Alquiler.Estado": "Disponible",
                "Alquiler.Tipo": "Alquiler"
            }
        },
        {
            $project: {
                
                Nombre:1,
                "Alquiler.Fecha_Inicio":1,
                "Alquiler.Fecha_Fin":1,
                "Alquiler.Costo_Total":1
            }
        }
    ]).toArray();
    res.send(resul);
    
});
export default appAlquiler;      
