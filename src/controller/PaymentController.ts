import { Request, Response } from "express";
import { PaymentBusiness } from "../business/PaymentBusiness";
import { ClientDataBase } from "../data/ClientDataBase";
import { PaymentDatabase } from "../data/PaymentDatabase";
import { inputPaymetDTO } from "../model/Payment";
import Authenticator from "../services/Authenticator";
import { IdGenerator } from "../services/idGenerator";
import ValidatorCreditCard from "../services/ValidatorCredit";
import StatusMock from "../../tests/mocks/Status.Mock";

export class PaymentController {


    payment = async (req:Request, res:Response) =>{
        try {
            const {clientId, amount, type, cardHolderName, cardNumber, cardExpirationDate, cardCvv} = req.body
            const auth = req.headers.authorization as string
            const input:inputPaymetDTO={
                clientId,
                amount,
                type,
                cardHolderName,
                cardNumber,
                cardExpirationDate,
                cardCvv
            }
            const result = await new PaymentBusiness(new PaymentDatabase(), new Authenticator(), new ClientDataBase(), new StatusMock(), new ValidatorCreditCard(), new IdGenerator()).payment(input, auth)
            res.status(201).send({message: result})
        } catch (error:any) {
            res.status(400).send({message:error.message || error.sqlMessage})
            
        }
    }
    getPaymenteController = async (req:Request, res:Response) =>{
        try {
            const token = req.headers.authorization as string
            const id = req.body

            const input ={
                id,
                token
            }

            const result = await new PaymentBusiness(new PaymentDatabase(), new Authenticator(), new ClientDataBase(), new StatusMock(), new ValidatorCreditCard(), new IdGenerator()).getPayment(input)
            res.status(200).send({message:result})
        } catch (error:any) {
            res.status(400).send({message:error.message || error.sqlMessage})
        }
    }
   

}