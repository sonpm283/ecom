export interface ErrorResponse<Data> {
  message: string
  // error respose thì data có thể có hoặc không
  data?: Data
}

export interface SuccessResponse<Data> {
  message: string
  // success respose thì data phải có để xử lý login/register ...
  data: Data
}
