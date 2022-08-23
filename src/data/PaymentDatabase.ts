import { Payment } from "../model/Payment";
import BaseDataBase from "./BaseDatabase";

export class PaymentDatabase extends BaseDataBase{
    create = async (payment:Payment) =>{
        
    try {
        await BaseDataBase.connection
          .insert({
            payment_id: payment.getId(),
            status: payment.getStatus(),
            user_id: payment.getUserId(),
            client_id: payment.getClientId(),
            amount: payment.getAmount(),
            type: payment.getType(),
            card_holder_name: payment.getCardHolderName(),
            card_number: payment.getCardNumber(),
            card_expiration_date: payment.getExpirationDate(),
            card_cvv: payment.getCvv(),
            emissor: payment.getEmissor()
          })
          .into("PaymentWirecard");
    }catch(error:any){
        throw new Error(error.message || error.sqlMessage);
        
    }
}

getPayment = async (id:string):Promise<any> =>{
    try {
        const result = await BaseDataBase.connection
        .select("*")
        .from("PaymentWirecard")
        .join("clientWirecard", "clientWirecard.id", "user_id" )
        .where(id)
        return result[0]
    } catch (error:any) {
        throw new Error(error.message || error.sqlMessage);
    }
}
}