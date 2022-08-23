import { ClientDataBase } from "../data/ClientDataBase";
import { Client, ClientInputDTO, inputLoginDTO } from "../model/Client";
import Authenticator from "../services/Authenticator";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";

export class ClientBusiness{
    constructor(
        private IdGenerator:IdGenerator,
        private HashGenerator:HashGenerator,
        private Authenticator:Authenticator,
        private ClientDataBase:ClientDataBase
    ){}
    create = async (name:string, email:string, password:string, cpf:string):Promise<Client> =>{
       try {

        if(!name || !email ||  !password || !cpf){
            throw new Error("fill in the fields correctly!");
        }
        if (email.indexOf("@") === -1) {
            throw new Error("Email invalid");
        }
        if (password.length < 6) {
            throw new Error("Password should have at least 6 characters");
        }
        const id =  this.IdGenerator.generate()

        const hashPassword = this.HashGenerator.hash(password)

        const inputBusiness =  new Client(
            id,
            name, 
            email,
            hashPassword as any,
            cpf
        )

        await this.ClientDataBase.insertClient(inputBusiness)
        const token = this.Authenticator.generateToken({id}) 
       return token as any
        
       } catch (error:any) {
        throw new Error(error.message || error.sqlMessage);
        
       }
        
    }

    login = async (email:string, password:string) =>{
        try {
            
            if(!email || !password){
            throw new Error("fill in the fields correctly!");
            
        }

        const loginBusiness = await this.ClientDataBase.login(email) 

        if(!loginBusiness){
            throw new Error("Invalid credentials!")
        }
        
            if (email.indexOf("@") === -1) {
            throw new Error("Email invalid");
            
        }
            if (password.length < 6) {
            throw new Error("Password should have at least 6 characters");
            
        }

    

        const hash = this.HashGenerator.compareHash(password, loginBusiness.getPassword() ) as any

        if (!hash) {
            throw new Error("Invalid Password!");
        }

        const token = this.Authenticator.generateToken({id:loginBusiness.getId()}) as any
        return token
        } catch (error:any) {
        throw new Error(error.message || error.sqlMessage);
        
        }
    }
}

export default new ClientBusiness(new IdGenerator(), new HashGenerator(), new Authenticator(), new ClientDataBase())