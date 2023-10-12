import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className='bg-orange'>
      <div className=' max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm'>
              <h3 className='text-2xl'>Đăng Ký</h3>

              <div className='mt-8'>
                <input
                  type='text'
                  name='email'
                  className='p-3 w-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none text-sm'
                  placeholder='Email'
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-xs'>Email không hợp lệ</div>
              </div>

              <div className='mt-3'>
                <input
                  type='password'
                  name='password'
                  className='p-3 w-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none text-sm'
                  placeholder='Nhập mật khẩu'
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-xs'>Mật khẩu không hợp lệ</div>
              </div>

              <div className='mt-3'>
                <input
                  type='password'
                  name='confirm_password '
                  className='p-3 w-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none text-sm'
                  placeholder='Nhập lại mật khẩu'
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-xs'>Mật khẩu không hợp lệ</div>
              </div>

              <div className='mt-4'>
                <button className='w-full text-center py-4 px-2 uppercase text-white text-sm bg-red-500 hover:bg-red-600 transition-all'>
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
