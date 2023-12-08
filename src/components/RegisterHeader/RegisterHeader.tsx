import { Link, useMatch } from 'react-router-dom'

export default function RegisterHeader() {
  //nếu url match với '/register' thì sẽ tồn tại 1 object chứa thông tin params register
  const registerMatch = useMatch('/register')
  const isRegister = Boolean(registerMatch)

  return (
    <header className='py-5 sticky top-0 z-10 bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <nav className='flex items-end'>
          <Link to='/'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' className='w-14'>
              <path
                d='M35 32a3 3 0 0 0-6 0v2h6zM27 51h10a3.003 3.003 0 0 0 3-3V36H24v12a3.003 3.003 0 0 0 3 3zm9-13a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-8 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1z'
                style={{ fill: '#232328' }}
              />
              <path
                d='M0 54a6.005 6.005 0 0 0 6 6h52a6.005 6.005 0 0 0 6-6V20H0zm51.293-16.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L53.586 40zM22 36a2.002 2.002 0 0 1 2-2h3v-2a5 5 0 0 1 10 0v2h3a2.002 2.002 0 0 1 2 2v12a5.006 5.006 0 0 1-5 5H27a5.006 5.006 0 0 1-5-5zM8.293 39.293l3-3a1 1 0 0 1 1.414 1.414L10.414 40l2.293 2.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414z'
                style={{ fill: '#232328' }}
              />
              <circle cx={14} cy={12} r={1} style={{ fill: '#232328' }} />
              <circle cx={7} cy={12} r={1} style={{ fill: '#232328' }} />
              <circle cx={21} cy={12} r={1} style={{ fill: '#232328' }} />
              <path
                d='M58 6H6a6.005 6.005 0 0 0-6 6v6h64v-6a6.005 6.005 0 0 0-6-6zM7 15a3 3 0 1 1 3-3 3.003 3.003 0 0 1-3 3zm7 0a3 3 0 1 1 3-3 3.003 3.003 0 0 1-3 3zm7 0a3 3 0 1 1 3-3 3.003 3.003 0 0 1-3 3zm37-2H40a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z'
                style={{ fill: '#232328' }}
              />
            </svg>
          </Link>
          <span className='ml-5 text-xl lg:text-2xl'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</span>
          <a
            href='hiveshop.com'
            className='self-center ml-auto text-[14px] text-primary'
            target='_blank'
            rel='noreferrer'
          >
            Bạn cần giúp đỡ?
          </a>
        </nav>
      </div>
    </header>
  )
}
