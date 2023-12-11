import ProductRating from 'src/components/ProductRating'
import User from '../User'

export default function Commnent() {
  return (
    <div className='grid grid-cols-12 gap-6 py-4 border-t'>
      <div className='col-span-4'>
        <User />
        <div className='mt-3'>
          <div className='flex items-center justify-between mb-3'>
            <span className='flex items-center gap-2 text-sm text-[#808089]'>
              <img
                className='w-[20px] h-[20px]'
                src='https://salt.tikicdn.com/ts/upload/c6/67/f1/444fc9e1869b5d4398cdec3682af7f14.png'
                alt='review-count'
              />
              Đã viết
            </span>
            <span className='text-sm text-[#38383d]'>16 Đánh giá</span>
          </div>
          <div className='w-full h-[2px] bg-slate-200'></div>
          <div className='flex items-center justify-between mt-2'>
            <span className='flex items-center gap-2 text-sm text-[#808089]'>
              <img
                className='w-[20px] h-[20px]'
                src='https://salt.tikicdn.com/ts/upload/cc/86/cd/1d5ac6d4e00abbf6aa4e4636489c9d80.png'
                alt='liked-count'
              />
              Đã nhận
            </span>
            <span className='text-sm text-[#38383d]'>12 Lượt cảm ơn</span>
          </div>
        </div>
      </div>
      <div className='col-span-8'>
        <div className=' flex items-center gap-3'>
          <div className='flex items-center gap-0.5'>
            <ProductRating rating={5} />
          </div>
          <span className='font-medium'>Cực kì hài lòng</span>
        </div>
        <div className='mt-2'>
          <span className='text-[#00ab56] text-xs flex items-center gap-2'>
            <span className='inline-block w-[14px] h-[14px] bg-[#00ab56] rounded-3xl relative before:absolute before:w-[6px] before:h-[3px] before:border-l-white before:border-b-white before:left-1/2 before:top-1/2 before:z-10 before:border-l-[1px] before:border-b-[1px] before:translate-y-[-80%] before:translate-x-[-50%] before:rotate-[-45deg]'></span>
            Đã mua hàng
          </span>
          <p className='mt-4 text-[13px] text-[#242424]'>
            Cấu hình cao, độ hoàn thiện phần cứng chưa cao. Màn hình hơi nhô lên so với thân máy, nếu thao tác vuốt từ 2
            bên sẽ thấy gợn tay đáng kể. Mua giá 6.940.000 do giảm 50k zalopay. Với mức tiền này thì tạm hài lòng chứ
            15tr như lúc mới ra mắt thì đắt so với thiết kế. Máy xuất xưởng ngày 28/6/23. Kích hoạt ngày 26/9/23. Vỏ hộp
            hơi cũ nhưng nguyên seal liêm phong.Hy vọng sẽ k phải gửi bảo hành với bất kì lý do nào
          </p>
          <ul className='flex mt-3 gap-2'>
            <li className='w-[77px] h-[77px] rounded-md overflow-hidden'>
              <img
                className='w-full h-full'
                src='https://salt.tikicdn.com/cache/w280/ts/review/7d/f2/1c/8778e391b96d7377b66e5f26808f6f64.jpg'
                alt=''
              />
            </li>
            <li className='w-[77px] h-[77px] rounded-md overflow-hidden'>
              <img
                className='w-full h-full'
                src='https://salt.tikicdn.com/cache/w280/ts/review/19/34/0e/a886560e1bb8e4c4e0cb36ae405b9867.jpg'
                alt=''
              />
            </li>
            <li className='w-[77px] h-[77px] rounded-md overflow-hidden'>
              <img
                className='w-full h-full'
                src='https://salt.tikicdn.com/cache/w280/ts/review/3b/07/1d/f8570a271de5c99f7cf2f2af19eb3bf1.jpg'
                alt=''
              />
            </li>
            <li className='w-[77px] h-[77px] rounded-md overflow-hidden'>
              <img
                className='w-full h-full'
                src='https://salt.tikicdn.com/cache/w280/ts/review/7d/f2/1c/8778e391b96d7377b66e5f26808f6f64.jpg'
                alt=''
              />
            </li>
            <li className='w-[77px] h-[77px] rounded-md overflow-hidden'>
              <img
                className='w-full h-full'
                src='https://salt.tikicdn.com/cache/w280/ts/review/7d/f2/1c/8778e391b96d7377b66e5f26808f6f64.jpg'
                alt=''
              />
            </li>
          </ul>
          <div className='flex flex-col mt-2 text-sm text-[#808089]'>
            <span>Màu: Xanh Khí Chất</span>
            <span>Đánh giá vào 1 tháng trước * Đã dùng 8 giờ</span>
          </div>

          <div className='flex items-center justify-between mt-4'>
            <div className='flex item-center gap-4'>
              <span className='flex items-center gap-2 text-[#808089]'>
                <img
                  src='https://salt.tikicdn.com/ts/upload/10/9f/8b/54e5f6b084fb9e3445036b4646bc48b5.png'
                  alt=''
                  width={24}
                  height={24}
                />
                6
              </span>
              <span className='flex items-center gap-2 text-[#808089]'>
                <img
                  src='https://salt.tikicdn.com/ts/upload/82/f0/7f/7353641630f811453e875bb5450065d8.png'
                  alt=''
                  width='24'
                  height='24'
                />
                1
              </span>
            </div>
            <div className='flex items-center gap-2 text-sm text-[#808089] cursor-pointer'>
              <img
                src='https://salt.tikicdn.com/ts/upload/3f/fa/d4/7057dfb58b682b1b0a2b9683228863ee.png'
                width='24'
                height='24'
                alt=''
              />
              Chia sẻ
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
