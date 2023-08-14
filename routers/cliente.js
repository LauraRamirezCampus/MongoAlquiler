import {con} from "../db/atlas.js";
import {limitGrt} from "../limit/config.js"
import { Router } from "express";

const appCliente = Router();

let db = await con();
let cliente = db.collection("Cliente");

appCliente.get("/",limitGrt(),async(req,res)=>{
    if(!req.rateLimit) return;
    console.log(req.rateLimit);
    let resul = await cliente.find({}).toArray();
    res.send(resul);
    
});
export default appCliente;
