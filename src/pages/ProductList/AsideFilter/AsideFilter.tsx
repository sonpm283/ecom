import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import Category from 'src/types/category.type'
import { QueryConfig } from '../ProductList'
import classNames from 'classnames'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { ObjectSchema } from 'yup'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStars from '../RatingStars'
import { omit } from 'lodash'

interface Props {
  categoriesData: Category[]
  queryConfig: QueryConfig
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

// Rules validate
// Nếu có price_min và price_max thì price_max >= price_min
// Còn không thì có price_min thì không có price_max và ngược lại

const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ categoriesData, queryConfig }: Props) {
  const { category, price_max, price_min } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>),
    shouldFocusError: false
  })

  const navigate = useNavigate()

  // nếu vượt qua được validate thì sẽ chạy vào đây
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    reset()
    navigate({
      pathname: path.home,
      // tương đương ...queryConfig(path hiện tại) nhưng xoá đi price_min, price_max, rating_filter, category
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

  const handleFilterPriceClick = (priceMin: number, priceMax: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: String(priceMin),
        price_max: priceMax == 0 ? '' : String(priceMax)
      }).toString()
    })
  }

  const isActiveFitlerPrice = (pirceMin: number, priceMax: number) => {
    const newPriceMax = priceMax === 0 ? '' : String(priceMax)
    return newPriceMax === price_max && String(pirceMin) === price_min
  }

  return (
    <div className='px-2 py-4 bg-white'>
      <Link
        to={path.home}
        className={classNames('flex items-center', {
          'text-gray-500': !category
        })}
      >
        <span className='text-gray-700 text-sm px-3 hover:text-primary'>Danh Mục Sản Phẩm</span>
      </Link>
      <ul>
        {categoriesData.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-2' key={categoryItem._id}>
              <Link
                className={classNames('text-sm hover:text-primary text-gray-500 relative px-3 inline-block', {
                  'text-primary': isActive
                })}
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='w-2 h-2 absolute left-0 top-[50%] translate-y-[-50%] fill-primary'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='text-sm text-gray-700'>Giá</div>
      <div className='inline-flex flex-col gap-2 mt-2'>
        <div
          tabIndex={0}
          aria-hidden={true}
          role='button'
          className={classNames('border text-[12px] w-max bg-[#eee] py-[4px] px-[12px] rounded-[12px]', {
            'border border-primary bg-[#f0f8ff] text-primary order-[-1]': isActiveFitlerPrice(0, 300000)
            // 'text-[#38383d]': !isActiveFitlerPrice(0, 300000)
          })}
          onClick={() => handleFilterPriceClick(0, 300000)}
        >
          Dưới 300.000
        </div>
        <div
          tabIndex={0}
          aria-hidden={true}
          role='button'
          className={classNames('border text-[12px] w-max text-[#38383d] bg-[#eee] py-[4px] px-[12px] rounded-[12px]', {
            'border border-primary bg-[#f0f8ff] text-primary order-[-1]': isActiveFitlerPrice(300000, 700000)
            // 'text-[#38383d]': !isActiveFitlerPrice(300000, 700000)
          })}
          onClick={() => handleFilterPriceClick(300000, 700000)}
        >
          300.000 &rarr; 700.000
        </div>
        <div
          tabIndex={0}
          aria-hidden={true}
          role='button'
          className={classNames('border text-[12px] w-max text-[#38383d] bg-[#eee] py-[4px] px-[12px] rounded-[12px]', {
            'border border-primary bg-[#f0f8ff] text-primary order-[-1]': isActiveFitlerPrice(700000, 1800000)
            // 'text-[#38383d]': !isActiveFitlerPrice(700000, 1800000)
          })}
          onClick={() => handleFilterPriceClick(700000, 1800000)}
        >
          700.000 &rarr; 1.800.000
        </div>
        <div
          tabIndex={0}
          aria-hidden={true}
          role='button'
          className={classNames('border text-[12px] w-max text-[#38383d] bg-[#eee] py-[4px] px-[12px] rounded-[12px]', {
            'border border-primary bg-[#f0f8ff] text-primary order-[-1]': isActiveFitlerPrice(1800000, 0)
            // 'text-[#38383d]': !isActiveFitlerPrice(1800000, 0)
          })}
          onClick={() => handleFilterPriceClick(1800000, 0)}
        >
          Trên 1.800.000
        </div>
      </div>
      <div className='my-4'>
        <span className='text-sm text-gray-700'>Chọn khoảng giá:</span>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='0'
                    classNameInput='p-1 w-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none text-sm '
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    // value={field.value}
                    // ref={field.ref}
                    classNameError='hidden'
                  />
                )
              }}
            />
            <div className='mx-2 mt-1 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='0'
                    classNameInput='p-1 w-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none text-sm'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                    // value={field.value}
                    // ref={field.ref}
                    classNameError='hidden'
                  />
                )
              }}
            />
          </div>
          {/* nếu price_min và price_max lỗi thì sẽ có error, lúc này nhập nhập price_max sẽ chỉ cập nhật lại error của price_max nên cần sử dụng trigger('price_min') validate lại */}
          <div className='mt-1 text-red-600 min-h-[1.25rem] text-xs'>{errors.price_min?.message}</div>
          <Button className='w-full p-1 text-primary border rounded-sm border-primary text-sm'>Áp dụng</Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='text-sm text-gray-500'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <Button className='w-full p-1 text-primary border rounded-sm border-primary text-sm' onClick={handleRemoveAll}>
        Xoá tất cả
      </Button>
    </div>
  )
}
