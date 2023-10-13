import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getRules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules(getValues)

  const onSubmit = handleSubmit(
    (data) => {
      console.log(data)
    },
    () => {
      const password = getValues('password')
      console.log(password)
    }
  )

  return (
    <div className='bg-orange'>
      <div className=' max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <h3 className='text-2xl'>Đăng Ký</h3>

              <div className='mt-8'>
                <input
                  type='email'
                  className='p-3 w-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none text-sm'
                  placeholder='Email'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-xs'>{errors.email?.message}</div>
              </div>

              <div className='mt-2'>
                <input
                  type='password'
                  className='p-3 w-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none text-sm'
                  placeholder='Nhập mật khẩu'
                  autoComplete='on'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-xs'>{errors.password?.message}</div>
              </div>

              <div className='mt-2'>
                <input
                  type='password'
                  className='p-3 w-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none text-sm'
                  placeholder='Nhập lại mật khẩu'
                  autoComplete='on'
                  {...register('confirm_password', { ...rules.confirm_password })}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-xs'>{errors.confirm_password?.message}</div>
              </div>

              <div className='mt-4'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase text-white text-sm bg-red-500 hover:bg-red-600 transition-all'
                >
                  Đăng ký
                </button>
              </div>

              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
