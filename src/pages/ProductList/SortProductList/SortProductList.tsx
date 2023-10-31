export default function SortProductList() {
  return (
    <div className='p-3 bg-gray-300/40'>
      <div className='flex items-center gap-4'>
        <span className='text-sm text-gray-600'>Sắp xếp theo</span>
        <button className='py-2 px-4 capitalize text-sm bg-orange text-white rounded-sm hover:bg-orange/80'>
          Phổ biến
        </button>
        <button className='py-2 px-4 capitalize text-sm bg-white text-black rounded-sm hover:bg-slate-100'>
          Mới nhất
        </button>
        <button className='py-2 px-4 capitalize text-sm bg-white text-black rounded-sm hover:bg-slate-100'>
          Bán chạy
        </button>
        <select className='p-2 capitalize text-sm text-left bg-white text-black rounded-sm hover:bg-slate-100 outline-none'>
          <option value='' disabled>
            Giá
          </option>
          <option value='price:asc'>Giá: Thấp đến Cao</option>
          <option value='price:desc'>Giá: Cao đến Thấp</option>
        </select>
        <div className='ml-auto flex items-center'>
          <div>
            <span className='text-orange text-sm'>1</span>
            <span>/</span>
            <span className='text-sm'>9</span>
          </div>
          <div className='ml-4 flex items-center'>
            <button
              className='grid place-items-center w-8 h-8 rounded-sm cursor-not-allowed bg-gray-100 border border-gray-300'
              disabled
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
            </button>
            <button className='grid place-items-center w-8 h-8 rounded-sm bg-gray-200 hover:bg-white border border-gray-300'>
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
          </div>
        </div>
      </div>
    </div>
  )
}
