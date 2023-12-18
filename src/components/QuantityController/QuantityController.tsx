import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onType,
  onDecrease,
  value,
  classNameWrapper = '',
  ...rest
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let currentValue = Number(event.target.value)
    if (max !== undefined && currentValue > max) {
      currentValue = max
    } else if (currentValue < 1) {
      currentValue = 1
    }

    onType && onType(currentValue)
  }

  const handleIncrease = () => {
    let currentValue = Number(value) + 1
    if (max !== undefined && currentValue > max) {
      currentValue = max
    }

    onIncrease && onIncrease(currentValue)
  }

  const handleDecrease = () => {
    let currentValue = Number(value) - 1
    if (currentValue < 1) {
      currentValue = 1
    }

    onDecrease && onDecrease(currentValue)
  }
  return (
    <div className={'flex items-center gap-1 mt-4' + classNameWrapper}>
      <button
        type='button'
        className='w-[34px] h-[32px] border flex items-center justify-center rounded-md'
        onClick={handleDecrease}
      >
        <img
          src='https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg'
          alt='remove-icon'
          width={20}
          height={20}
        />
      </button>
      <InputNumber
        classNameInput='p-3 w-full h-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-md outline-none text-sm text-center'
        classNameError='hidden'
        className='w-[100px] h-[32px] rounded-md'
        onChange={handleChange}
        value={value}
        {...rest}
      />
      <button
        type='button'
        className='w-[34px] h-[32px] border flex items-center justify-center rounded-sm'
        onClick={handleIncrease}
      >
        <img
          src='https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg'
          alt='add-icon'
          width={20}
          height={20}
        />
      </button>
    </div>
  )
}
