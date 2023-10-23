import { AuthReponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthReponse>('/register', body)

export const login = (body: { email: string; password: string }) => http.post<AuthReponse>('/login', body)

export const logout = () => http.post('/logout')
