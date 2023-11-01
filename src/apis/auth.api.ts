import { AuthReponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const authApi = {
  registerAccount: function (body: { email: string; password: string }) {
    return http.post<AuthReponse>('/register', body)
  },
  login: function (body: { email: string; password: string }) {
    return http.post<AuthReponse>('/login', body)
  },
  logout: function () {
    return http.post('/logout')
  }
}
