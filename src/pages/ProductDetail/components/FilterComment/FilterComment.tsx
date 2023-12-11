export default function FilterComment() {
  return (
    <div>
      <span className='text-sm text-[#38383d] font-medium'>Lọc theo</span>
      <div className='flex items-center gap-2 mt-3 flex-wrap'>
        <button className='px-3 py-2 border rounded-3xl text-sm text-[#27272a]'>Mới nhất</button>
        <button className='px-3 py-2 border rounded-3xl text-sm text-[#27272a]'>Có hình ảnh</button>
        <button className='px-3 py-2 border rounded-3xl text-sm text-[#27272a]'>Đã mua hàng</button>
        <button className='px-3 py-2 border rounded-3xl text-sm text-[#27272a]'>5 sao</button>
        <button className='px-3 py-2 border rounded-3xl text-sm text-[#27272a]'>4 sao</button>
        <button className='px-3 py-2 border rounded-3xl text-sm text-[#27272a]'>3 sao</button>
        <button className='px-3 py-2 border rounded-3xl text-sm text-[#27272a]'>2 sao</button>
        <button className='px-3 py-2 border rounded-3xl text-sm text-[#27272a]'>1 sao</button>
        <button className='px-3 py-2 border rounded-3xl text-sm text-[#27272a]'>Dung lượng pin lớn</button>
      </div>
    </div>
  )
}
