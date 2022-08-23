# Wirecard
# Case WIRECARD

documentação 
Na construção dessa API foram criados 4 endpoints:
### create ### 
endpoint solicita as seguintes informações do Buyer:  
'name', 'email', 'senha' e  'cpf'. 
### Login ###
endpoint que retorna um token de autenticação
dessa forma é possivel criar um pagamento 
### Payment ###
nesse endpoint é necessario informar:
- amount
- type
- client id 

em caso de pagamento for do tipo 'credit card' será necessario as seguintes informações:
 - card holder name
 - card number
 - card expiration date
 - card cvv

 As tabelas do banco de dados ficaram organizadas dessa maneira:

### TABLE clientWirecard (
- id VARCHAR(255) PRIMARY KEY,
- name VARCHAR(255) NOT NULL,
- email VARCHAR(255) NOT NULL,
- cpf VARCHAR(11) NOT NULL,
- password VARCHAR(255) NOT NULL);
### TABLE PaymentWirecard (
- payment_id VARCHAR(255) PRIMARY KEY,
- status VARCHAR(255) NOT NULL,
- user_id VARCHAR(255) NOT NULL,
- client_id VARCHAR(255) NOT NULL,
- amount FLOAT NOT NULL,
- type ENUM("credit card","boleto") DEFAULT "boleto",
- card_holder_name VARCHAR(255),
- card_number VARCHAR(25),
- card_expiration_date VARCHAR(7),
- card_cvv INT,
- emissor VARCHAR(255),
- FOREIGN KEY(user_id) REFERENCES User_Wirecard(id)
);

### Get Payment
este endpoint retorna todas as informações do pagamento e o status
é necessario informar um token e id do pagamento
O retorno será todas informações essenciais do pagamento e do comprador.

Testes unitarios foram realizados nos endpoints de create payment e get payment

Abaixo está o link da documentação da API:
https://documenter.getpostman.com/view/20354224/VUjSF49w
