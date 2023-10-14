import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { schema, Schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) })

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
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <h3 className='text-2xl'>Đăng Ký</h3>

              <Input
                className='mt-8'
                type='email'
                name='email'
                placeholder='Email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                className='mt-3'
                type='password'
                name='password'
                placeholder='Nhập mật khẩu'
                register={register}
                errorMessage={errors.password?.message}
                autoComplete='on'
              />

              <Input
                className='mt-3'
                type='password'
                name='confirm_password'
                placeholder='Nhập lại mật khẩu'
                register={register}
                errorMessage={errors.confirm_password?.message}
                autoComplete='on'
              />

              <input type='text' autoComplete='on' />

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
