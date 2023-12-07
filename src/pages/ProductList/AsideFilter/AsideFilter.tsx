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
  const { category } = queryConfig
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
    console.log(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category']))
    reset()
    navigate({
      pathname: path.home,
      // tương đương ...queryConfig(path hiện tại) nhưng xoá đi price_min, price_max, rating_filter, category
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <span>Tất cả danh mục</span>
      </Link>
      <ul>
        {categoriesData.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-2' key={categoryItem._id}>
              <Link
                className={classNames('text-sm relative px-3 inline-block', {
                  ' text-orange font-semibold': isActive
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
                  <svg viewBox='0 0 4 7' className='w-2 h-2 absolute left-0 top-[50%] translate-y-[-50%] fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='flex mt-8 items-center uppercase font-bold'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='w-3 h-3 mr-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        <span>Bộ lọc tìm kiếm</span>
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='my-5'>
        <div>Khoảng Giá:</div>
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
                    placeholder='From'
                    classNameInput='p-1 w-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none text-sm'
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
                    placeholder='To'
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
          <Button className='w-full p-2 bg-orange text-white text-sm hover:bg-orange/80'>Áp dụng</Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='text-sm'>Đánh giá</div>

      {/* RatingStar */}

      <RatingStars queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <Button
        className='w-full p-2 bg-orange text-white text-sm hover:bg-orange/80 uppercase'
        onClick={handleRemoveAll}
      >
        Xoá tất cả
      </Button>
    </div>
  )
}
