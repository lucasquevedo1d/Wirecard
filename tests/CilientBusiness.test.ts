import { ClientBusiness } from "../src/business/ClientBusiness";
import { inputLoginDTO } from "../src/model/Client";
import Authenticator from "../src/services/Authenticator";
import { ClientDataBaseMock } from "./mocks/ClientDataBaseMock";
import { HashGeneratorMock } from "./mocks/HashGenratorMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";

const clientBusinessMock = new ClientBusiness(
    new IdGeneratorMock(),
    new HashGeneratorMock(),
    new Authenticator(),
    new ClientDataBaseMock()
)

describe("testando o insert", () =>{
    test("deve retornar o erro quando nome está vazio", async () =>{
        try {
            await clientBusinessMock.create("","lucas@lucas.com", "111.111.111.11","123456")
        } catch (error:any) {
            expect(error.message).toEqual("fill in the fields correctly!")
        }finally{
            expect.assertions(1)
        }
    })

    test("deve retornar o erro quando email está vazio", async () =>{
        try {
            await clientBusinessMock.create("Lucas","", "111.111.111.11","123456")
        } catch (error:any) {
            expect(error.message).toEqual("fill in the fields correctly!")
        }finally{
            expect.assertions(1)
        }
    })

    test("deve retornar o erro quando email está @", async () =>{
        try {
            await clientBusinessMock.create("lucas","lucaslucas.com", "111.111.111.11","123456")
        } catch (error:any) {
            expect(error.message).toEqual("Email invalid")
        }finally{
            expect.assertions(1)
        }
    })

    test("deve retornar o erro quando cpf está vazio", async () =>{
        try {
            await clientBusinessMock.create("Lucas","lucas@lucas.com", "","123456")
        } catch (error:any) {
            expect(error.message).toEqual("fill in the fields correctly!")
        }finally{
            expect.assertions(1)
        }
    })

    test("deve retornar o erro quando password está vazio", async () =>{
        try {
            await clientBusinessMock.create("Lucas","lucas@lucas.com", "111.111.111.11","")
        } catch (error:any) {
            expect(error.message).toEqual("fill in the fields correctly!")
        }finally{
            expect.assertions(1)
        }
    })

    test("deve cadastrar com sucesso o client", async () =>{
        try {
            const token = await clientBusinessMock.create("Lucas","lucas@lucas.com", "111.111.111.11","123123")
            expect(token).toEqual("token")
        } catch (error:any) {
            console.log(error.message)
        }finally{
            expect.assertions(1)
        }
    })
})

describe("testanto o login", () =>{
    test("deve testar o erro de login quando o email não é valido", async () =>{
        try {
            await clientBusinessMock.login("batatinha@batata.com", "123456")
        } catch (error:any) {
            expect(error.message).toEqual("Invalid credentials!")
        }finally{
            expect.assertions(1)
        }
    })

    test("deve testar o erro de login quando o email está vazio", async () =>{
        try {
            await clientBusinessMock.login("", "123456")
        } catch (error:any) {
            expect(error.message).toEqual("fill in the fields correctly!")
        }finally{
            expect.assertions(1)
        }
    })

    test("deve testar o erro de login quando a senha está vazia", async () =>{
        try {
            await clientBusinessMock.login("client@Client.com", "")
        } catch (error:any) {
            expect(error.message).toEqual("fill in the fields correctly!")
        }finally{
            expect.assertions(1)
        }
    })

    test("deve testar o erro de login quando a senha está menor que 6 caracteres", async () =>{
        try {
            await clientBusinessMock.login("client@Client.com", "123")
        } catch (error:any) {
            expect(error.message).toEqual("Password should have at least 6 characters")
        }finally{
            expect.assertions(1)
        }
    })

    test("deve testar o  login quando é passado os campos coretamente", async () =>{
        try {
            const token = await clientBusinessMock.login("client@Client.com", "client123")
            expect(token).toEqual("token")
        } catch (error:any) {
            console.log(error.message)
        }finally{
            expect.assertions(1)
        }
    })
    
})

