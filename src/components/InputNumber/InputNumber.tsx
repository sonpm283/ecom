import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

export default function InputNumber({
  errorMessage,
  className,
  classNameInput = 'p-3 w-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none text-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-xs',
  onChange,
  ...rest
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
