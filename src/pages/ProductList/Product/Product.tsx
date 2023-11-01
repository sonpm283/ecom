interface ProductProps {
  name: string
  oldPrice: number
  price: number
  image: string
  // rating?: number
}

export default function Product(props: ProductProps) {
  const { name, oldPrice, price, image } = props
  return (
    <div className='shadow-sm hover:shadow-md transition hover:translate-y-[-3px] rounded-sm overflow-hidden'>
      <div className='relative pt-[100%]'>
        <img src={image} className='absolute top-0 left-0 w-full h-full object-cover' alt='' />
      </div>
      <div className='p-2'>
        <h3 className='line-clamp-2 text-sm min-h-[40px]'>{name}</h3>
        <div className='flex items-center gap-2 mt-3'>
          <span className='text-sm text-gray-400 line-through'>₫{oldPrice}</span>
          <span className='text-orange text-sm'>₫{price}</span>
        </div>
        <div className='flex justify-end gap-1 mt-3'>
          <div className='flex items-center'>
            <div className='relative w-3 h-3'>
              <div className='absolute top-0 left-0 overflow-hidden' style={{ width: '50%' }}>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='w-3 h-3 fill-yellow-500'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
              <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className='w-3 h-3 fill-gray-400'>
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
          </div>
          <div className='text-xs'>
            <span className='ml-1'>Đã bán</span>
            <span className='ml-1'>5.66k</span>
          </div>
        </div>
      </div>
    </div>
  )
}
