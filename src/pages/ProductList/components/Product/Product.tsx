import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
interface ProductProps {
  product: ProductType
}

//props phải có kiểu là ProductProps tức là phải bao gồm trường product: ProductType
export default function Product(props: ProductProps) {
  const { product } = props

  return (
    <Link to={`${path.home}${product._id}`}>
      <div className='shadow-sm bg-white hover:shadow-xl transition rounded-sm overflow-hidden'>
        <div className='relative pt-[100%]'>
          <img src={product.image} className='absolute top-0 left-0 w-full h-full object-cover' alt={product.name} />
        </div>
        <div className='p-2'>
          <img
            srcSet='https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png'
            width={89}
            height={20}
            alt='is_authentic'
            className='styles__StyledImg-sc-p9s3t3-0 hbqSye loaded'
            style={{ width: 89, height: 20, opacity: 1 }}
          />

          <h3 className='line-clamp-2 text-sm min-h-[40px] mt-1'>{product.name}</h3>
          <div className='flex gap-0.5 mt-3 flex-wrap'>
            <ProductRating rating={product.rating} />
            <div className='text-xs'>
              <span className='ml-1'>Đã bán</span>
              <span className='ml-1'>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
          <div className='flex items-center gap-2 mt-3 flex-wrap'>
            <span className='text-sm text-gray-400 line-through'>₫{formatCurrency(product.price_before_discount)}</span>
            <span className='text-[#27272a] text-[16px] text-sm font-semibold'>₫{formatCurrency(product.price)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
