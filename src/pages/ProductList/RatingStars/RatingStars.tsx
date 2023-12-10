import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
}

export default function RatingStars({ queryConfig }: Props) {
  const navigate = useNavigate()

  const handleRatingStar = (ratingFilter: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingFilter)
      }).toString()
    })
  }
  return (
    <ul className='my-1'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <li className='py-1' key={index}>
            <div
              className='flex items-center text-xs'
              onClick={() => handleRatingStar(5 - index)}
              tabIndex={0}
              aria-hidden='true'
              role='button'
            >
              {Array(5)
                .fill(0)
                .map((_, starIndex) => {
                  // 5 sao
                  // 4 sao
                  // 3 sao
                  // 2 sao
                  // 1 sao
                  if (starIndex < 5 - index) {
                    return (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        width={14}
                        height={14}
                        viewBox='0 0 12 12'
                        className='star-icon'
                        key={starIndex}
                      >
                        <g fill='none' fillRule='evenodd'>
                          <path
                            fill='#fdd835'
                            transform='matrix(-1 0 0 1 11 1)'
                            d='M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z'
                          />
                          <path
                            fill='#fdd835'
                            transform='translate(1 1)'
                            d='M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z'
                          />
                        </g>
                      </svg>
                    )
                  }
                  return (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      width={14}
                      height={14}
                      viewBox='0 0 12 12'
                      className='star-icon'
                      key={starIndex}
                    >
                      <g fill='none' fillRule='evenodd'>
                        <path
                          fill='#b8b8b8'
                          transform='matrix(-1 0 0 1 11 1)'
                          d='M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z'
                        />
                        <path
                          fill='#b8b8b8'
                          transform='translate(1 1)'
                          d='M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z'
                        />
                      </g>
                    </svg>
                  )
                })}
              <span className='ml-1 text-sm'>từ {5 - index} sao</span>
            </div>
          </li>
        ))}
    </ul>
  )
}
