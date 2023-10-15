type Role = 'User' | 'Admin'
export interface User {
  _id: string
  // roles là 1 mảng chưa 'User' hoặc 'Admin' ví dụ: roles: ['User'] hoặc  roles: ['Admin']
  roles: Role[]
  email: string
  name: string
  date_of_birth: null
  address: string
  phone: string
  createdAt: string
  updatedAt: string
}
