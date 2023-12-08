import { sortBy, order as orderConstant } from 'src/constants/product'
import { QueryConfig } from '../ProductList'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import classNames from 'classnames'
import { ProductListConfig } from 'src/types/product.type'
import { omit } from 'lodash'

interface SortProductListProps {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList(props: SortProductListProps) {
  const { queryConfig, pageSize } = props
  const page = Number(queryConfig.page)
  // nếu queryConfig thì mặc đinh lấy bằng view/createdAt do mình quy định
  // const { sort_by = sortBy.view } = queryConfig
  const { sort_by = sortBy.sold, order } = queryConfig
  const navigate = useNavigate()

  // sortByValue: 'createdAt' | 'view' | 'sold' | 'price' lấy từ ProductListConfig loại bỏ undefined bằng Exclude
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        // khi lọc không liên quan đến giá cao thấp thì loại bỏ order(trong trường hợp đang lọc theo giá từ thấp đến cao rồi bầm vào lọc phổ biến/mới nhất/bán chạy thì loại bỏ order=desc/order=asc trên url)
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handleOrderSort = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        //sortBy.price luôn vì đang lọc theo giá (để active select box thành màu cam)
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='p-3 bg-white'>
      <div className='flex items-center gap-4'>
        <span className='text-sm text-gray-600'>Sắp xếp theo</span>
        <button
          className={classNames(
            'py-2 px-4 capitalize text-smrounded-sm relative after:absolute after:w-[50%] after:translate-x-[-50%] after:rounded-sm after:left-[50%] after:h-[4px] after:bottom-0 transition text-sm after:transition',
            {
              'after:bg-primary text-primary': isActiveSortBy(sortBy.view),
              'text-black hover:after:bg-primary hover:text-primary': !isActiveSortBy(sortBy.view)
            }
          )}
          onClick={() => handleSort(sortBy.view)}
        >
          Phổ biến
        </button>
        <button
          className={classNames(
            'py-2 px-4 capitalize text-smrounded-sm relative after:absolute after:w-[50%] after:translate-x-[-50%] after:rounded-sm after:left-[50%] after:h-[4px] after:bottom-0 transition text-sm after:transition',
            {
              'after:bg-primary': isActiveSortBy(sortBy.createdAt),
              'text-black hover:after:bg-primary hover:text-primary': !isActiveSortBy(sortBy.createdAt)
            }
          )}
          onClick={() => handleSort(sortBy.createdAt)}
        >
          Mới nhất
        </button>
        <button
          className={classNames(
            'py-2 px-4 capitalize text-smrounded-sm relative after:absolute after:w-[50%] after:translate-x-[-50%] after:rounded-sm after:left-[50%] after:h-[4px] after:bottom-0 transition text-sm after:transition',
            {
              'after:bg-primary': isActiveSortBy(sortBy.sold),
              'text-black hover:after:bg-primary hover:text-primary': !isActiveSortBy(sortBy.sold)
            }
          )}
          onClick={() => handleSort(sortBy.sold)}
        >
          Bán chạy
        </button>
        <select
          className={classNames('p-2 capitalize text-sm text-left outline-none', {
            'bg-primary text-white hover:bg-primary/80': isActiveSortBy(sortBy.price),
            'text-black cursor-pointer bg-[#f5f5fa]': !isActiveSortBy(sortBy.price)
          })}
          value={order || ''}
          onChange={(e) => handleOrderSort(e.target.value as Exclude<ProductListConfig['order'], undefined>)}
        >
          <option value='' disabled className='bg-white text-black'>
            Giá
          </option>
          <option value={orderConstant.asc} className='bg-white text-black'>
            Giá: Thấp đến Cao
          </option>
          <option value={orderConstant.desc} className='bg-white text-black'>
            Giá: Cao đến Thấp
          </option>
        </select>
        <div className='ml-auto flex items-center'>
          <div>
            <span className='text-primary text-sm'>{page}</span>
            <span>/</span>
            <span className='text-sm'>{pageSize}</span>
          </div>
          <div className='ml-4 flex items-center'>
            {page === 1 ? (
              <button className='grid place-items-center w-10 h-10 rounded-sm cursor-not-allowed'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </button>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='grid place-items-center w-8 h-8 rounded-sm'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}

            {page === pageSize ? (
              <button className='grid place-items-center w-8 h-8 rounded-sm cursor-not-allowed '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='grid place-items-center w-8 h-8 rounded-sm'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
