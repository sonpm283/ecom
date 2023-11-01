export interface ErrorResponse<Data> {
  message: string
  // error response thì data có thể có hoặc không
  data?: Data
}

export interface SuccessResponse<Data> {
  message: string
  // success response thì data phải có để xử lý login/register ...
  data: Data
}
