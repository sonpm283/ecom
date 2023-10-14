export default function Footer() {
  return (
    <footer className='py-16 bg-neutral-100'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm text-[#0000008a]'>
          <div className='lg:col-span-1'>© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
          <div className='lg:col-span-2 '>
            Quốc gia & Khu vực: Singapore Indonesia Đài Loan Thái Lan Malaysia Việt Nam Philippines Brazil México
            Colombia Chile
          </div>
        </div>
        <div className='text-center mt-20 text-xs text-[#000000a6]'>
          <ul className='flex justify-center'>
            <li className='px-4 border-r border-[#00000017]'>
              <a href='#none'>CHÍNH SÁCH BẢO MẬT</a>
            </li>
            <li className='px-4 border-r border-[#00000017]'>
              <a href='#none'>QUY CHẾ HOẠT ĐỘNG</a>
            </li>
            <li className='px-4 border-r border-[#00000017]'>
              <a href='#none'>CHÍNH SÁCH VẬN CHUYỂN</a>
            </li>
            <li className='px-4'>
              <a href='#none'>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</a>
            </li>
          </ul>
          <div className='mt-5'>
            <span className=''>Công ty TNHH Shopee</span>
            <div className='mt-5'>
              <p className='mt-2'>
                Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình,
                Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
              </p>
              <p className='mt-2'>
                Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
              </p>
              <p className='mt-2'>
                Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
              </p>
              <p className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
