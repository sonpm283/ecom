import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type AuthReponse = SuccessResponse<{
  access_token: string
  expire: string
  user: User
}>
