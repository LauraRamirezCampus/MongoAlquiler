import {con} from "../db/atlas.js";
import {limitGrt} from "../limit/config.js"
import { Router } from "express";

const appAuto = Router();

let db= await con();
let Automovil = db.collection("Automovil");

appAuto.get("/",limitGrt(),async(req,res)=>{
    if(!req.rateLimit)return;
    let result = await Automovil.aggregate([
        {
            $lookup: {
                from: "Contrato",
                localField: "ID_Automovil",
                foreignField: "ID_Automovil",
                as: "contratos"
            }
        },
        {
            $match: {
                "contratos.Estado": "Disponible",
                "contratos.Tipo": "Alquiler"
            }
        },
        {
            $project: {
                _id:0,
                ID_Automovil: 1,
                Marca: 1,
                Modelo: 1,
                Anio: 1,
                Tipo: 1,
                Capacidad: 1,
                Precio_Diario: 1
            }
        }
    ]).toArray();
    res.send(result)
});

export default appAuto;