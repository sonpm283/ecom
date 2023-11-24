import { InputHTMLAttributes } from 'react'
import type { UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // type: React.HTMLInputTypeAttribute
  // placeholder: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  // className: string
  // name: string
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
  autoComplete?: string
}

export default function Input(props: InputProps) {
  const {
    className,
    register,
    errorMessage,
    name,
    classNameInput = 'p-3 w-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none text-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-xs',
    ...rest
  } = props

  const registerResult = register && name ? register(name) : null

  return (
    <div className={className}>
      <input type={rest.type} className={classNameInput} placeholder={rest.placeholder} {...registerResult} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
