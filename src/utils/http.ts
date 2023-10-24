import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthReponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenFromLS, saveAccessTokenToLS, setProfileToLS } from './auth'
import path from 'src/constants/path'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    //khi đăng nhập vào app thì this.accessToken sẽ được lấy 1 lần duy nhất trong local storage thông qua hàm getAccessTokenFromLS() và sử dụng nó trên ram xuyên suốt quá trình đăng nhập thay vì mỗi lần phải getAccessToken trong localStorage(truy xuất vào ổ cứng tốc độ sẽ chậm hơn) chính vì vậy nên phải tạo 1 thuộc tính this.accessToken

    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    //khi thực hiện công việc cần yêu cầu xác thực/sử dụng interceptors request để gửi lên server accessToken
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // xử lý các lỗi chung chung không phải 422
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          // ép kiểu response.data là AuthReponse(có 'message' và 'data' => kiểu response trả về từ api)
          // lưu vào ram
          const data = response.data as AuthReponse
          this.accessToken = (data as AuthReponse).data.access_token
          //khi đăng nhập thành công thì lưu thông tin user vào LS
          setProfileToLS(data.data.user)
          // sau khi lấy được accessToken thì lưu vào local storage
          saveAccessTokenToLS(this.accessToken)
        } else if (url === path.logout) {
          // khi logout thì xoá khỏi local storage
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          // kiểu dữ liệu trả về sẽ có dạng:
          /*
          response: {
            message: '',
            data: {}
          }
          nên trong trường hợp mà lỗi trả về không có message thì sẽ lấy từ error.message
        */
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
