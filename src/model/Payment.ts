export class Payment {
    constructor(
        private payment_id: string,
        private status: string,
        private user_id: string,
        private client_id: string,
        private amount: number,
        private type: string,
        private cardHolderName?: string,
        private cardNumber?: string,
        private cardExpirationDate?: string,
        private cardCvv?: string,
        private emissor?: string,
        private name?: string,
        private email?: string,
        private cpf?: string

    ) { }

    public getId = () => this.payment_id
    public getStatus = () => this.status
    public getUserId = () => this.user_id
    public getClientId = () => this.client_id
    public getAmount = () => this.amount
    public getType = () => this.type
    public getCardHolderName = () => this.cardHolderName
    public getCardNumber = () => this.cardNumber
    public getExpirationDate = () => this.cardExpirationDate
    public getCvv = () => this.cardCvv
    public getEmissor = () => this.emissor
    

    static toPaymentModel(payment: any) {
        return new Payment(payment.payment_id, payment.status, payment.user_id, payment.client_id, payment.amount, payment.type, payment.card_holder_name, payment.card_number, payment.card_expiration_date, payment.card_cvv, payment.emissor);
    }
    static toStatusPaymentModel(payment: any) {
        return new Payment(payment.payment_id, payment.status, payment.user_id, payment.client_id, payment.amount, payment.type, payment.card_holder_name, payment.card_number, payment.card_expiration_date, payment.card_cvv, payment.emissor, payment.name, payment.email, payment.cpf);
    }
}


export interface inputPaymetDTO {
    clientId: string;
    amount: number;
    type: string;
    cardHolderName?: string;
    cardNumber?: string;
    cardExpirationDate?: string;
    cardCvv?: string
}

export interface creditCardType{
    cardNumber:string
}

export interface InputGetPayment{
    id:string,
    token:string
}