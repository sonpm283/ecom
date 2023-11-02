import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

// mong muốn sau khi hàm này chạy xong thì error sẽ có kiểu AxiosError<T> với T là kiểu dữ liệu mong muốn khi lỗi trả về
// T sẽ là kiểu dữ liệu(ta quy định) mà Typescript mong đợi từ server trả về
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // trả về true nếu error là kiểu Axios error
  // Nếu error thực sự là một AxiosError, thì TypeScript sẽ hiểu rằng kiểu dữ liệu của error sau khi gọi hàm này sẽ là AxiosError<T>.
  //khi đó error sẽ có kiểu là AxiosError<T> nên đảm bảo về mặt Typescript
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError<FormError>(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

//format gía sản phẩm dạng: 3500000 ->  3.500.000(VND)
export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

//format số lượt bán dạng: 1k 2k 3k
export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}
