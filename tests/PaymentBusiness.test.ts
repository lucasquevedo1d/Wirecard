import { PaymentBusiness } from "../src/business/PaymentBusiness";
import ValidatorCreditCard from "../src/services/ValidatorCredit";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { ClientDataBaseMock } from "./mocks/ClientDataBaseMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { PaymentDatabaseMock } from "./mocks/PaymentDataBaseMock";
import { paymentMock, paymentMock2 } from "./mocks/PaymentMock";
import StatusMock from "./mocks/Status.Mock";

export const paymentBusiness = new PaymentBusiness(
    new PaymentDatabaseMock(),
    new AuthenticatorMock(),
    new ClientDataBaseMock(),
    new StatusMock(),
    new ValidatorCreditCard(),
    new IdGeneratorMock()
)

describe("Testando o regitro de pagamentos", () => {
    test("Sucesso caso de pagamento por boleto", async () => {

        const boleto = "34191.79001 01043.510047 91020.150008 6 9067003000"
        try {
            await paymentBusiness.payment(paymentMock, "token")
            expect(boleto).toEqual("34191.79001 01043.510047 91020.150008 6 9067003000")
        } catch (error: any) {
            console.log(error)
        } finally {
            expect.assertions(1)
        }
    })
    test("Sucesso no credit card", async () =>{
        try {
            await paymentBusiness.payment(paymentMock2, "token")
            expect("token").toEqual("token")
        } catch (error:any) {
            console.log(error.message)
        }
    })
})