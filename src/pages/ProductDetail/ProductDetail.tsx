import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from 'src/utils/utils'
import Product from '../ProductList/components/Product'
import { ProductListConfig } from 'src/types/product.type'
import InputNumber from 'src/components/InputNumber'
import Button from 'src/components/Button'
import Breadcrumbs from 'src/components/Breadcrumbs'
import FilterComment from './components/FilterComment'
import Commnent from './components/Comment'

export default function ProductDetail() {
  const [activeImage, setActiveImage] = useState<string>('')
  const [currentIndexImages, setCurrentIndexImages] = useState<number[]>([0, 5])
  const imageRef = useRef<HTMLImageElement>(null)
  const { nameId } = useParams()

  const { data: productDetailData } = useQuery({
    queryKey: ['product', nameId],
    queryFn: () => {
      return productApi.getProductDetail(nameId as string)
    }
  })
  const product = productDetailData?.data.data

  //query by category
  const queryConfig: ProductListConfig = { limit: '8', page: '1', category: product?.category._id }

  const { data: productsData } = useQuery({
    queryKey: ['product', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product)
  })

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  const handleActiveImage = (image: string) => {
    setActiveImage(image)
    setCurrentIndexImages([0, 5])
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    // Cách 1: Lấy offsetX, offsetY đơn giản khi đã xử lý được bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi không xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  if (!product) return null
  return (
    <div className='bg-[#f5f5fa]'>
      <div className='container '>
        <Breadcrumbs />
        <div className='grid grid-cols-12 gap-4 items-start'>
          <div className='col-span-4 p-3 bg-white rounded-md sticky top-[10px]'>
            <div className='flex flex-col'>
              <div
                className='relative pt-[100%] rounded-md overflow-hidden border border-x-gray-200'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product?.name}
                  ref={imageRef}
                  className='absolute top-0 left-0 right-0 bottom-0 object-cover w-full h-full'
                />
              </div>
              <div className='flex gap-2 mt-2'>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div key={img} className='relative flex-1' onMouseEnter={() => handleActiveImage(img)}>
                      <img src={img} alt='' />
                      {isActive && <div className='absolute inset-0 border-2 border-primary rounded-sm'></div>}
                      {!isActive && <div className='absolute inset-0 border border-gray-200 rounded-sm'></div>}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='col-span-5 '>
            <div className='bg-white rounded-md p-3'>
              <div className='flex items-center gap-2'>
                <img
                  srcSet='https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png'
                  width={89}
                  height={20}
                  alt='is_authentic'
                  className='styles__StyledImg-sc-p9s3t3-0 hbqSye loaded'
                  style={{ width: 89, height: 20, opacity: 1 }}
                />
                <span className='text-[13px]'>
                  Danh mục: <span className='text-primary cursor-pointer'>{product.category.name}</span>
                </span>
              </div>
              <h2 className='mt-2 text-xl font-medium'>{product?.name}</h2>
              <div className='flex gap-0.5 mt-3 items-center'>
                <span className='text-sm mr-1'>5.0</span>
                <ProductRating rating={product.rating} />
                <span className='text-sm ml-2 text-[#787878]'>({product.view})</span>
                <div className='text-sm'>
                  <span className='ml-1 pl-2 relative before:absolute before:h-[12px] before:w-[1px] before:top-1/2 before:bg-[#c7c7c7] before:translate-y-[-50%] before:left-[0] text-[#787878]'>
                    <span className='mr-1'>Đã bán</span>
                    {formatNumberToSocialStyle(product.sold)}
                  </span>
                </div>
              </div>
              <div className='mt-3'>
                <span className='text-2xl font-semibold'>
                  {formatCurrency(product.price)}
                  <sup>₫</sup>
                </span>
                <span className='ml-2 px-1 text-sm text[12px] rounded-[8px] bg-[#f5f5fa]'>
                  - {rateSale(product.price_before_discount, product.price)}
                </span>
              </div>

              <div className='mt-4'>
                <span className='font-semibold text-sm'>Màu</span>
                <div className='flex gap-2 mt-3'>
                  <div className='px-2 py-1 border rounded-md cursor-pointer flex items-center gap-1 text-sm relative before:absolute before:w-full before:h-full before:border-2 before:border-primary before:left-0 before:rounded-md hover:before:border-primary'>
                    <picture className='webpimg-container' style={{ width: 42, height: 42 }}>
                      <source
                        type='image/webp'
                        srcSet='https://salt.tikicdn.com/cache/100x100/ts/product/a2/38/6c/ce008c63f4ac771550439da44f5f8ee8.png.webp 1x, https://salt.tikicdn.com/cache/100x100/ts/product/a2/38/6c/ce008c63f4ac771550439da44f5f8ee8.png.webp 2x'
                      />
                      <img
                        alt='thumbnail'
                        src='https://salt.tikicdn.com/cache/280x280/ts/product/a2/38/6c/ce008c63f4ac771550439da44f5f8ee8.png'
                        width={42}
                        height={42}
                        srcSet='https://salt.tikicdn.com/cache/100x100/ts/product/a2/38/6c/ce008c63f4ac771550439da44f5f8ee8.png 1x, https://salt.tikicdn.com/cache/100x100/ts/product/a2/38/6c/ce008c63f4ac771550439da44f5f8ee8.png 2x'
                        className='WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo'
                        style={{ width: 42, height: 42 }}
                      />
                    </picture>
                    Hồng
                  </div>
                  <div className='px-2 py-1 border rounded-md cursor-pointer flex items-center gap-1 text-sm relative before:absolute before:w-full before:h-full before:border-2 before:border-transparent before:left-0 before:rounded-md hover:before:border-primary'>
                    <picture className='webpimg-container' style={{ width: 42, height: 42 }}>
                      <source
                        type='image/webp'
                        srcSet='https://salt.tikicdn.com/cache/100x100/ts/product/dd/2b/a6/fefd132c5ba9b5629c0119f57549e5d4.png.webp 1x, https://salt.tikicdn.com/cache/100x100/ts/product/dd/2b/a6/fefd132c5ba9b5629c0119f57549e5d4.png.webp 2x'
                      />
                      <img
                        alt='thumbnail'
                        src='https://salt.tikicdn.com/cache/280x280/ts/product/dd/2b/a6/fefd132c5ba9b5629c0119f57549e5d4.png'
                        width={42}
                        height={42}
                        srcSet='https://salt.tikicdn.com/cache/100x100/ts/product/dd/2b/a6/fefd132c5ba9b5629c0119f57549e5d4.png 1x, https://salt.tikicdn.com/cache/100x100/ts/product/dd/2b/a6/fefd132c5ba9b5629c0119f57549e5d4.png 2x'
                        className='WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo'
                        style={{ width: 42, height: 42 }}
                      />
                    </picture>
                    Trắng
                  </div>
                  <div className='px-2 py-1 border rounded-md cursor-pointer flex items-center gap-1 text-sm relative before:absolute before:w-full before:h-full before:border-2 before:border-transparent before:left-0 before:rounded-md hover:before:border-primary'>
                    <picture className='webpimg-container' style={{ width: 42, height: 42 }}>
                      <source
                        type='image/webp'
                        srcSet='https://salt.tikicdn.com/cache/100x100/ts/product/dd/42/95/ae7976cda4f1ae1de6be8c5e84df1815.png.webp 1x, https://salt.tikicdn.com/cache/100x100/ts/product/dd/42/95/ae7976cda4f1ae1de6be8c5e84df1815.png.webp 2x'
                      />
                      <img
                        alt='thumbnail'
                        src='https://salt.tikicdn.com/cache/280x280/ts/product/dd/42/95/ae7976cda4f1ae1de6be8c5e84df1815.png'
                        width={42}
                        height={42}
                        srcSet='https://salt.tikicdn.com/cache/100x100/ts/product/dd/42/95/ae7976cda4f1ae1de6be8c5e84df1815.png 1x, https://salt.tikicdn.com/cache/100x100/ts/product/dd/42/95/ae7976cda4f1ae1de6be8c5e84df1815.png 2x'
                        className='WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo'
                        style={{ width: 42, height: 42 }}
                      />
                    </picture>
                    Xanh dương
                  </div>
                </div>
              </div>

              <div className='mt-4'>
                <span className='font-semibold text-sm'>Dung lượng</span>
                <div className='flex gap-2 mt-3'>
                  <div className='p-2 border rounded-md cursor-pointer text-sm relative before:absolute before:w-full before:h-full before:border-2 before:border-primary before:left-0 before:rounded-md hover:before:border-primary before:top-0'>
                    128gb
                  </div>
                  <div className='p-2 border rounded-md cursor-pointer text-sm relative before:absolute before:w-full before:h-full before:border-2 before:border-transparent before:left-0 before:rounded-md hover:before:border-primary before:top-0'>
                    256gb
                  </div>
                </div>
              </div>
            </div>
            <div className='p-3 bg-white rounded-md mt-5'>
              <p className='text-md font-medium'>Thông tin vận chuyển</p>
              <div className='mt-4 text-sm flex justify-between'>
                Giao đến Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội
                <span className='text-primary cursor-pointer'>Đổi</span>
              </div>
              <div className='mt-4'>
                <span className='flex items-center gap-1 text-sm'>
                  <img
                    className='w-[32px] h-[16px]'
                    src='https://salt.tikicdn.com/ts/upload/14/11/46/13b71dceb805fb57ce37d57585bc3762.png'
                    alt=''
                    height='{16}'
                    width='{32}'
                  />
                  Giao Thứ Tư
                </span>
                <div className='text-sm text-[#27272A] mt-1'>
                  Trước 19h, 13/12: <span className='text-[#00AB56]'>Miễn phí</span>
                  <del className='text-sm ml-2 text-[#808089]'>
                    23.000
                    <sup>
                      <small>₫</small>
                    </sup>
                  </del>
                </div>
              </div>
            </div>
            <div className='p-3 bg-white rounded-md mt-5'>
              <p className='text-md font-medium'>Sản phẩm tương tự</p>
              {productsData && (
                <div className='mt-6 grid grid-cols-4 gap-y-5 gap-x-1'>
                  {productsData.data.data.products.map((product) => (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='col-span-3 p-3 bg-white rounded-md flex flex-col gap-4 sticky top-[10px]'>
            <div className='flex items-center gap-2 pb-3 border-b'>
              <img
                srcSet='https://vcdn.tikicdn.com/cache/w100/ts/seller/21/ce/5c/b52d0b8576680dc3666474ae31b091ec.jpg 1x, https://vcdn.tikicdn.com/cache/w100/ts/seller/21/ce/5c/b52d0b8576680dc3666474ae31b091ec.jpg 2x'
                className='styles__StyledImg-sc-p9s3t3-0 hbqSye logo loaded'
                width={40}
                height={40}
                alt='Tiki Trading'
                style={{ borderRadius: '50%', minWidth: 40, width: 40, height: 40, opacity: 1 }}
              />

              <div className='flex flex-col gap-2'>
                <span className='flex items-center gap-2'>
                  Tiki Trading
                  <img
                    srcSet='https://salt.tikicdn.com/cache/w100/ts/upload/6b/25/fb/c288b5bcee51f35f2df0a5f5f03de2e1.png 1x, https://salt.tikicdn.com/cache/w100/ts/upload/6b/25/fb/c288b5bcee51f35f2df0a5f5f03de2e1.png 2x'
                    className='styles__StyledImg-sc-p9s3t3-0 hbqSye badge-img loaded'
                    alt='seller-badge'
                    style={{ width: 72, height: 20, minWidth: 72, minHeight: 20, opacity: 1 }}
                  />
                </span>
                <span className='flex items-center gap-1 text-sm text-[#808089]'>
                  <span className='text-[#27272a] font-medium'>{product.rating}</span>
                  <img
                    alt='star-icon'
                    src='https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png'
                    width='16'
                    height='16'
                  ></img>{' '}
                  (5.4tr+ đánh giá)
                </span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <img
                className='w-[40px] h-[40px]'
                src='https://salt.tikicdn.com/cache/280x280/ts/product/99/86/04/7a74043bebfb2645b559fd94587ecf77.png'
                alt=''
              />
              Titan Xanh, 128GB
            </div>
            <div>
              <span className='font-medium text-md'>Số lượng</span>
              <div className='flex items-center gap-1 mt-4'>
                <button type='button' className='w-[34px] h-[32px] border flex items-center justify-center rounded-md'>
                  <img
                    src='https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg'
                    alt='remove-icon'
                    width={20}
                    height={20}
                  />
                </button>
                <InputNumber
                  classNameInput='p-3 w-full h-full border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-md outline-none text-sm text-center'
                  classNameError='hidden'
                  className='w-[40px] h-[32px] rounded-md'
                  value={1}
                />
                <button type='button' className='w-[34px] h-[32px] border flex items-center justify-center rounded-sm'>
                  <img
                    src='https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg'
                    alt='add-icon'
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
            <div>
              <p className='font-medium text-md'>Tạm tính</p>
              <div className='mt-2 text-2xl font-semibold'>
                {formatCurrency(product.price)}
                <sup>₫</sup>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <Button className='flex items-center justify-center w-full text-center p-2 text-white text-sm bg-[#ff424e] transition-all rounded-md'>
                Mua ngay
              </Button>
              <Button className='flex items-center justify-center w-full text-center p-2 font-medium text-sm bg-white border border-primary text-primary transition-all rounded-md'>
                Thêm vào giỏ
              </Button>
              <Button className='flex items-center justify-center w-full text-center p-2 font-medium text-sm bg-white border border-primary text-primary transition-all rounded-md'>
                Mua trả góp từ 2.332.500₫/tháng
              </Button>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4 mt-5'>
          <div className='col-span-9 p-3 bg-white rounded-md sticky top-[10px]'>
            <FilterComment />
            <div className='mt-5'>
              <Commnent />
              <Commnent />
              <Commnent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
