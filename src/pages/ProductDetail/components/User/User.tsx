export default function User() {
  return (
    <div className='flex items-center gap-2'>
      <div className='w-[40px] h-[40px] rounded-3xl overflow-hidden'>
        <img src='//tiki.vn/assets/img/avatar.png' alt='Thai Van Tung' />
      </div>
      <div className='flex flex-col gap-1'>
        <p className='font-medium text-[15px]'>Thai Van Tung</p>
        <span className='text-sm text-[#808089]'>Đã tham gia 2 năm</span>
      </div>
    </div>
  )
}
