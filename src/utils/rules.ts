import { RegisterOptions, UseFormGetValues } from 'react-hook-form'

// kiểu của options của register
// quy định rõ ràng các key cần validate để khi rules.email | rules.password sẽ gợi ý
type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 đến 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 5 đến 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 đến 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 5 đến 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 đến 160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại mật khẩu không khớp'
        : undefined
  }
})
