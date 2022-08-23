import { Request, Response } from "express";
import { ClientBusiness } from "../business/ClientBusiness";
import { ClientDataBase } from "../data/ClientDataBase";
import Authenticator from "../services/Authenticator";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";

export class ClientController {
    createClient = async (req:Request, res:Response) =>{
        try {
            const {name, email, password, cpf} = req.body

            const token = await new ClientBusiness(new IdGenerator(), new HashGenerator(), new Authenticator(), new ClientDataBase()).create(name, email, password, cpf) 
            res.status(201).send({message:"customer registered successfully!", token:token})
        } catch (error:any) {
            res.status(400).send({message:error.message || error.sqlMessage})
        }
    }

    login = async (req:Request, res:Response) =>{
        try {
            const {email, password} = req.body

            
            const result = await new ClientBusiness(new IdGenerator(), new HashGenerator(), new Authenticator(), new ClientDataBase()).login(email, password)
        res.status(200).send({message:"logged in user!", result})
        } catch (error:any) {
        res.status(400).send({message:error.message || error.sqlMessage})
        }
    }
}