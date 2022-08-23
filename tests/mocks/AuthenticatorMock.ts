import { authenticationData } from "../../src/model/AuthenticationData"

export class AuthenticatorMock{
    generateToken = (payload: authenticationData):string => {
        return "token" 
    }

    getData = (token: any):authenticationData => {
      return  {
            id:"id"
        }
    }
}