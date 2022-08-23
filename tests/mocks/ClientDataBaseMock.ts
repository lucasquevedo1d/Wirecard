import { Client } from "../../src/model/Client";
import { ClientMock } from "./ClientMock";

export class ClientDataBaseMock{
    insertClient = async (input:Client) =>{

    }

    login = async (email:string) =>{
        switch(email){
            case "client@Client.com":
                return ClientMock
                default:
                    return undefined
        }
    }

    getId = async (id:string) =>{
        switch(id){
            case "id":
                return ClientMock
                default:
                    return undefined
        }
    }
}
