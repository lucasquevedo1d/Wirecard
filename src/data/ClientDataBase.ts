import { Client, inputLoginDTO } from "../model/Client";
import BaseDataBase from "./BaseDatabase";

export class ClientDataBase extends BaseDataBase {
    insertClient = async (input:Client)=>{
       
        try {
            await BaseDataBase.connection
            .insert({
                id:input.getId(),
                name:input.getName(),
                email:input.getEmail(),
                password:input.getPassword(),
                cpf:input.getCpf()
            })
            .into("clientWirecard")
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
        }
    }

    login = async (email:any)=>{
        try {
            const client = await BaseDataBase.connection("clientWirecard")
            .select("*")
            .where({ email })
            return client[0] && Client.toUserModel(client[0]);
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }

    getId = async (id:any)=>{
        try {
            const client = await BaseDataBase.connection("clientWirecard")
            .select("*")
            .where({ id })
            return client[0] && Client.toUserModel(client[0]);
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }
}