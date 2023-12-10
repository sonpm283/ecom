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
        <div className='flex justify-end'>
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
                className='flex items-center py-1cursor-pointer ml-6'
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
                  <svg viewBox='-10.5 -9.45 21 18.9' fill='none' xmlns='http://www.w3.org/2000/svg' className=''>
                    <circle cx={0} cy={0} r={2} fill='currentColor' />
                    <g stroke='currentColor' strokeWidth={1} fill='none'>
                      <ellipse rx={10} ry='4.5' />
                      <ellipse rx={10} ry='4.5' transform='rotate(60)' />
                      <ellipse rx={10} ry='4.5' transform='rotate(120)' />
                    </g>
                  </svg>
                </div>
                <div>{profile?.email}</div>
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
        <div className='grid grid-cols-12 gap-4 mt-4 items-center'>
          <Link to={path.home} className='col-span-2 flex justify-center'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' className='w-12'>
              <path
                d='M35 32a3 3 0 0 0-6 0v2h6zM27 51h10a3.003 3.003 0 0 0 3-3V36H24v12a3.003 3.003 0 0 0 3 3zm9-13a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-8 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1z'
                style={{ fill: '#0b74e5' }}
              />
              <path
                d='M0 54a6.005 6.005 0 0 0 6 6h52a6.005 6.005 0 0 0 6-6V20H0zm51.293-16.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L53.586 40zM22 36a2.002 2.002 0 0 1 2-2h3v-2a5 5 0 0 1 10 0v2h3a2.002 2.002 0 0 1 2 2v12a5.006 5.006 0 0 1-5 5H27a5.006 5.006 0 0 1-5-5zM8.293 39.293l3-3a1 1 0 0 1 1.414 1.414L10.414 40l2.293 2.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414z'
                style={{ fill: '#0b74e5' }}
              />
              <circle cx={14} cy={12} r={1} style={{ fill: '#0b74e5' }} />
              <circle cx={7} cy={12} r={1} style={{ fill: '#0b74e5' }} />
              <circle cx={21} cy={12} r={1} style={{ fill: '#0b74e5' }} />
              <path
                d='M58 6H6a6.005 6.005 0 0 0-6 6v6h64v-6a6.005 6.005 0 0 0-6-6zM7 15a3 3 0 1 1 3-3 3.003 3.003 0 0 1-3 3zm7 0a3 3 0 1 1 3-3 3.003 3.003 0 0 1-3 3zm7 0a3 3 0 1 1 3-3 3.003 3.003 0 0 1-3 3zm37-2H40a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z'
                style={{ fill: '#0b74e5' }}
              />
            </svg>
          </Link>
          <form className='col-span-9' onSubmit={onSubmitSearch}>
            <div className='bg-white rounded-sm p-1 flex border'>
              <input
                type='text'
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
                placeholder='Tìm kiếm...'
                {...register('name')}
              />
              <button className='rounded-sm py-2 px-4 flex-shrink-0 text-primary text-sm border-l' type='submit'>
                Tìm kiếm
              </button>
            </div>
          </form>
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
                  className='w-8 h-8'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  )
}
