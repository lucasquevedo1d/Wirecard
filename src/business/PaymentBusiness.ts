import { ClientDataBase } from "../data/ClientDataBase";
import { PaymentDatabase } from "../data/PaymentDatabase";
import { InputGetPayment, inputPaymetDTO, Payment } from "../model/Payment";
import Authenticator from "../services/Authenticator";
import { IdGenerator } from "../services/idGenerator";
import ValidatorCreditCard from "../services/ValidatorCredit";
import StatusMock from "../../tests/mocks/Status.Mock";


export class PaymentBusiness{
    constructor(
        private PaymentDatabase:PaymentDatabase,
        private Authenticator:Authenticator,
        private ClientDataBase:ClientDataBase,
        private StatusMock:StatusMock,
        private ValidatorCreditCard:ValidatorCreditCard,
        private IdGenerator:IdGenerator

    ){}
    payment = async (input:inputPaymetDTO, auth:string ) =>{
        try {
            const {clientId, amount, type, cardHolderName, cardNumber, cardExpirationDate, cardCvv} = input 

            if(!auth){
                throw new Error("authorization denied!");
            }

            if(!clientId || !amount || !type){
               throw new Error("fill in the fields correctly!");
            }

           const authentication = this.Authenticator.getData(auth)
            
           if(!authentication){
            throw new Error("invalid authentication!");
           }
           
           const clientDB = await this.ClientDataBase.getId(authentication.id)

        
           const id =  this.IdGenerator.generate()

           if (type !== "credit card" && type !== "boleto") {
            throw new Error("Entered type is invalid, fill in 'credit card' or 'boleto' values.")
        }
        console.log(clientDB)

        if (type === "boleto") {
            const status = "Loading"
            const paymentCode = `34191.79001 01043.510047 91020.150008 6 906700${amount}`

            const newPayment = new Payment(id, status, clientDB.getId(), clientId, amount, type)

             this.PaymentDatabase.create(newPayment)
            return { paymentCode}
        }

        if (type === "credit card") {
            if (!cardHolderName || !cardNumber || !cardExpirationDate || !cardCvv) {
                throw new Error("Entered type is invalid, fill in 'cardHolderName','cardNumber','cardExpirationDate' e 'cardCvv'")
            }
            this.ValidatorCreditCard.validCreditCard(cardNumber)
             this.ValidatorCreditCard.validateCVV(cardNumber, cardCvv)


            const date = cardExpirationDate.split("/")

            const validExpirationDate = this.ValidatorCreditCard.validExpirationDate(date)

            if (validExpirationDate === false) {
                throw new Error("Card with expired expiration date")
            }

            const status = this.StatusMock.generate(amount)

            const newPayment = new Payment(id, status, clientDB.getId(), clientId, amount, type, cardHolderName, cardNumber, cardExpirationDate, cardCvv)

            await this.PaymentDatabase.create(newPayment)

            return newPayment
        }
    
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
        }
    }  
    getPayment = async (input:InputGetPayment) =>{
        try {
            const { id, token } = input 

            if (!token) {
                throw new Error("authorization denied!")
            }
            if (!id) {
                throw new Error("enter payment ID!")
            }
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
        }

        const Payment = await this.PaymentDatabase.getPayment(input.id)
            if (!Payment) {
                throw new Error("Payment not found, check if id is correct!")
            }
            return Payment
    }
}

export default new PaymentBusiness( new PaymentDatabase(), new Authenticator(), new ClientDataBase(), new StatusMock(), new ValidatorCreditCard, new IdGenerator() )