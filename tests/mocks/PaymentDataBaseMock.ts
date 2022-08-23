import { Payment } from "../../src/model/Payment"

const resultado = {
    payment_id: '1961861e-8878-4d68-9567-aaa351b8b4d4',
    status: 'pagamento concluido',
    user_id: '7af6b8b1-6751-4300-961d-650f361b60f7',
    client_id: '123456789',
    amount: 1000,
    type: 'credit card',
    card_holder_name: 'DIEGO E LIMA',
    card_number: '4916 6705 5586 8558',
    card_expiration_date: '08/2029',
    card_cvv: 560,
    emissor: 'Visa',
    id: '7af6b8b1-6751-4300-961d-650f361b60f7',
    name: 'Lucas',
    email: 'lucas@lucas.com',
    cpf: '12345678910',
    password: '$2a$12$27JtkLaQqNs7OXq35/X6j.ClFbR.tCcz2fq5p6akpFkZRk.e6Q4qK'
}

const resultado2: any[] = []
const payment_id = "1961861e-8878-4d68-9567-aaa351b8b4d4"

export class PaymentDatabaseMock {
    public async create(payment: Payment): Promise<void> {

    }

    public async getPayment(id: string): Promise<Payment> {

        if (id === payment_id) {
            return Payment.toStatusPaymentModel(resultado)
        } else {
            return Payment.toStatusPaymentModel(resultado2)
        }
    }

} 