import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps {
  type: React.HTMLInputTypeAttribute
  placeholder: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  className: string
  name: string
  rules?: RegisterOptions
  errorMessage?: string
}

export default function Input(props: InputProps) {
  const { type, className, placeholder, register, rules, errorMessage, name } = props
  return (
    <div className={className}>
      <input
        type={type}
        className='p-3 w-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none text-sm'
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-xs'>{errorMessage}</div>
    </div>
  )
}
