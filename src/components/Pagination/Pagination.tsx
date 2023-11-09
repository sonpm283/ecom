import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/pages/ProductList/ProductList'

interface PaginationProps {
  queryConfig: QueryConfig
  pageSize: number
}

const RAGE = 2
export default function Pagination(props: PaginationProps) {
  // truyền cả queryConfig sang thay vì truyền mỗi page để khi bấm vào pagination sẽ vẫn lấy được các params khác
  // thay vì bấm vào và chỉ có ?page=1 thì thay vào đó ?page=1&limit=10&sort=asc được giữ nguyên
  const { queryConfig, pageSize } = props
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    // Xử lý trường hợp dấu 3 chấm ở đằng sau page hiện tại
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2'>
            ...
          </span>
        )
      }
    }

    // Xử lý trường hợp dấu 3 chấm ở đằng trước page hiện tại
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true

        return (
          <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2'>
            ...
          </span>
        )
      }
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        //Điều kiện để return về dấu ...
        if (page <= RAGE * 2 + 1 && pageNumber > page + RAGE && pageNumber < pageSize - RAGE + 1) {
          return renderDotAfter(index)
        } else if (page > RAGE * 2 + 1 && page < pageSize - RAGE * 2) {
          if (pageNumber < page - RAGE && pageNumber > RAGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RAGE && pageNumber < pageSize - RAGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RAGE * 2 && pageNumber > RAGE && pageNumber < page - RAGE) {
          return renderDotBefore(index)
        }

        // Nếu không thoả mãn các điều kiện trên thì sẽ render về các con số
        return (
          <Link
            // thay vì chỉ link to={/page=1} thì sẽ link to 1 bộ params trước đó dạng ?page=1&limit=10 để khi bấm và pagination thì vẫn giữ nguyên bộ params cũ
            to={{
              pathname: path.home,
              // sử dụng createSearchParams của 'react-router-dom'
              // search là những param trên url được biến đổi từ queryConfig(1 object {page:1,imit:10 }) thành dạng ?page=1&limit=10 và ghi đè lại page là pageNumber

              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              //nếu page = pageNumber thì cho active: border-cyan-500
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page === 1 ? (
        <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border'>Prev</button>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Prev
        </Link>
      )}

      {renderPagination()}

      {page === pageSize ? (
        <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border'>Next</button>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Next
        </Link>
      )}
    </div>
  )
}
