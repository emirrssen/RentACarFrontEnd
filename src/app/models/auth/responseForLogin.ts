import { AccessToken } from "./accessToken";

export interface ResponseForLogin {
    accessToken: AccessToken
    firstName: string
    lastName: string
    email: string
    claims: string
}