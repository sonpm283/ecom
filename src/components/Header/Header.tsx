import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Popover from '../Popover'
import { useMutation } from '@tanstack/react-query'
import { authApi } from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'
import { toast } from 'react-toastify'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useForm } from 'react-hook-form'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'

export default function Header() {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      toast.warning('Đã đăng xuất')
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
    //set lại thì cả app re-render // state nằm ở context cao nhất
  }

  type FormData = Pick<Schema, 'name'>
  const nameSchema = schema.pick(['name'])

  const queryConfig = useQueryConfig()
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const onSubmitSearch = handleSubmit((data) => {
    // nếu query config có order thì sau khi search sẽ loại bỏ ['order', 'sort_by']
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return (
    <header className='pb-5 pt-2 bg-white text-gray-700'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-4 mt-4 items-center'>
          <Link to={path.home} className='col-span-1 flex'>
            <img
              src='https://salt.tikicdn.com/ts/upload/c1/64/f7/4e6e925ea554fc698123ea71ed7bda26.png'
              alt='tiki-logo'
              width='72'
              height='72'
            />
          </Link>
          <form className='col-span-8' onSubmit={onSubmitSearch}>
            <div className='bg-white rounded-md p-1 flex border'>
              <input
                type='text'
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
                placeholder='Tìm kiếm...'
                {...register('name')}
              />
              <button
                className='rounded-sm py-2 px-4 flex-shrink-0 text-primary font-semibold text-sm border-l'
                type='submit'
              >
                Tìm kiếm
              </button>
            </div>
          </form>
          <div className='flex col-span-3 items-center justify-between gap-2'>
            <div className='flex'>
              <Popover
                className='flex items-center py-1 cursor-pointer'
                renderPopover={
                  <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
                    <div className='flex flex-col py-2 pr-14 pl-3'>
                      <button className='py-2 px-3 hover:text-primary text-left'>Tiếng Việt</button>
                      <button className='py-2 px-3 hover:text-primary mt-2 text-left'>English</button>
                    </div>
                  </div>
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                  />
                </svg>
                <span className='mx-1'>Tiếng Việt</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                </svg>
              </Popover>
              {isAuthenticated && (
                <>
                  <Popover
                    className='flex items-center py-1cursor-pointer ml-5'
                    renderPopover={
                      <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
                        <Link
                          to='/profile'
                          className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                        >
                          Tài khoản của tôi
                        </Link>
                        <Link
                          to='/'
                          className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                        >
                          Đơn mua
                        </Link>
                        <button
                          onClick={handleLogout}
                          className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                        >
                          Đăng xuất
                        </button>
                      </div>
                    }
                  >
                    <div className='w-5 h-5 mr-2 flex-shrink-0'>
                      <img
                        src='https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png'
                        alt='header_header_account_img'
                      />
                    </div>
                    <div className='hidden'>{profile?.email}</div>
                    <div>Tài khoản</div>
                  </Popover>
                </>
              )}
              {!isAuthenticated && (
                <div className='flex items-center'>
                  <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
                    Đăng ký
                  </Link>
                  <div className='border-r-[1px] border-r-white/40 h-4'></div>
                  <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
            <div className='col-span-1 justify-self-end'>
              <Popover
                renderPopover={
                  <div className='bg-white relative shadow-md rounded-sm border border-gray-200 max-w-[400px] text-sm'>
                    <div className='p-2'>
                      <div className='text-gray-400 capitalize'>Sản phẩm mới thêm</div>
                      <div className='mt-5'>
                        <div className='mt-4 flex'>
                          <div className='flex-shrink-0'>
                            <img src='' alt='anh' className='w-11 h-11 object-cover' />
                          </div>
                          <div className='flex-grow ml-2 overflow-hidden'>
                            <div className='truncate'>
                              [LIFEMCMBP2 -12% đơn 250K] Bộ Nồi Inox 3 Đáy SUNHOUSE SH334 16, 20, 24 cm
                            </div>
                          </div>
                          <div className='ml-2 flex-shrink-0'>
                            <span className='text-primary'>₫469.000</span>
                          </div>
                        </div>
                        <div className='mt-4 flex'>
                          <div className='flex-shrink-0'>
                            <img src='' alt='anh' className='w-11 h-11 object-cover' />
                          </div>
                          <div className='flex-grow ml-2 overflow-hidden'>
                            <div className='truncate'>
                              [LIFEMCMBP2 -12% đơn 250K] Bộ Nồi Inox 3 Đáy SUNHOUSE SH334 16, 20, 24 cm
                            </div>
                          </div>
                          <div className='ml-2 flex-shrink-0'>
                            <span className='text-primary'>₫469.000</span>
                          </div>
                        </div>
                        <div className='mt-4 flex'>
                          <div className='flex-shrink-0'>
                            <img src='' alt='anh' className='w-11 h-11 object-cover' />
                          </div>
                          <div className='flex-grow ml-2 overflow-hidden'>
                            <div className='truncate'>
                              [LIFEMCMBP2 -12% đơn 250K] Bộ Nồi Inox 3 Đáy SUNHOUSE SH334 16, 20, 24 cm
                            </div>
                          </div>
                          <div className='ml-2 flex-shrink-0'>
                            <span className='text-primary'>₫469.000</span>
                          </div>
                        </div>
                        <div className='mt-4 flex'>
                          <div className='flex-shrink-0'>
                            <img src='' alt='anh' className='w-11 h-11 object-cover' />
                          </div>
                          <div className='flex-grow ml-2 overflow-hidden'>
                            <div className='truncate'>
                              [LIFEMCMBP2 -12% đơn 250K] Bộ Nồi Inox 3 Đáy SUNHOUSE SH334 16, 20, 24 cm
                            </div>
                          </div>
                          <div className='ml-2 flex-shrink-0'>
                            <span className='text-primary'>₫469.000</span>
                          </div>
                        </div>
                        <div className='mt-4 flex'>
                          <div className='flex-shrink-0'>
                            <img src='' alt='anh' className='w-11 h-11 object-cover' />
                          </div>
                          <div className='flex-grow ml-2 overflow-hidden'>
                            <div className='truncate'>
                              [LIFEMCMBP2 -12% đơn 250K] Bộ Nồi Inox 3 Đáy SUNHOUSE SH334 16, 20, 24 cm
                            </div>
                          </div>
                          <div className='ml-2 flex-shrink-0'>
                            <span className='text-primary'>₫469.000</span>
                          </div>
                        </div>
                      </div>
                      <div className='flex mt-6 items-center justify-between'>
                        <div className='capitalize text-xs text-gray-500'>Thêm hàng vào giỏ</div>
                        <button className='capitalize bg-primary hover:bg-opacity-90 px-4 py-2 rounded-sm text-white'>
                          Xem giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                }
              >
                <Link to='/'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                    />
                  </svg>
                </Link>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
