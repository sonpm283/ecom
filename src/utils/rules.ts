import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

// kiểu của options của register
// quy định rõ ràng các key cần validate để khi rules.email | rules.password sẽ gợi ý

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}
//hoặc viết kiểu này:
// type Rules = {
//   email?: RegisterOptions
//   password?: RegisterOptions
//   confirm_password?: RegisterOptions
// }

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

export const schema = yup
  .object({
    email: yup
      .string()
      .required('Email là bắt buộc')
      .email('Email không đúng định dạng')
      .min(5, 'Độ dài từ 5 - 160 ký tự')
      .max(160, 'Độ dài từ 5 - 160 ký tự'),
    password: yup
      .string()
      .required('Password là bắt buộc')
      .min(6, 'Độ dài từ 6 - 160 ký tự')
      .max(160, 'Độ dài từ 6 - 160 ký tự'),
    confirm_password: yup
      .string()
      .required('Nhập lại password là bắt buộc')
      .min(6, 'Độ dài từ 6 - 160 ký tự')
      .max(160, 'Độ dài từ 6 - 160 ký tự')
      .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
  })
  .required()

export type Schema = yup.InferType<typeof schema>
