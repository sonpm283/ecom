import classNames from 'classnames'

interface PaginationProps {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

const RAGE = 2
export default function Pagination(props: PaginationProps) {
  const { page, setPage, pageSize } = props

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    // Xử lý trường hợp dấu 3 chấm ở đằng sau page hiện tại
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2' disabled>
            ...
          </button>
        )
      }
    }

    // Xử lý trường hợp dấu 3 chấm ở đằng trước page hiện tại
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true

        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2' disabled>
            ...
          </button>
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
          <button
            key={index}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              //nếu page = pageNumber thì cho active: border-cyan-500
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }

  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>Prev</button>
      {renderPagination()}
      <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>Next</button>
    </div>
  )
}
