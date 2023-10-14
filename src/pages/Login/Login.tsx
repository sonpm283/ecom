import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

// pick kiểu cho login form chỉ bao gồm email và password
type FormData = Pick<Schema, 'email' | 'password'>
// chỉ cần pick email và password từ schema cho login form
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }

    // lúc này thì sử dụng loginSchema làm đối số cho yupResolver
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <h3 className='text-2xl'>Đăng Nhập</h3>

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

              <div className='mt-4'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase text-white text-sm bg-red-500 hover:bg-red-600 transition-all'
                >
                  Đăng nhập
                </button>
              </div>

              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400'>Bạn chưa có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
