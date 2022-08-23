import { inputPaymetDTO } from "../../src/model/Payment";

export const paymentMock2: inputPaymetDTO = {
    clientId: "123456789",
    amount: 8000,
    type: "credit card",
    cardHolderName: "Lucas Quevedo",
    cardNumber: "4916 6705 5586 8558",
    cardExpirationDate: "04/2022",
    cardCvv: "560"
}

export const paymentMock: any = {
    clientId: "123456789",
    amount: 3000,
    type: "boleto",
    cardHolderName: "",
    cardNumber: "",
    cardExpirationDate: "",
    cardCvv: ""
}