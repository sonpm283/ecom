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
      <div className='shadow-sm bg-white hover:shadow-md transition hover:translate-y-[-3px] rounded-sm overflow-hidden'>
        <div className='relative pt-[100%]'>
          <img src={product.image} className='absolute top-0 left-0 w-full h-full object-cover' alt={product.name} />
        </div>
        <div className='p-2'>
          <h3 className='line-clamp-2 text-sm min-h-[40px]'>{product.name}</h3>
          <div className='flex gap-0.5 mt-3'>
            <ProductRating rating={product.rating} />
            <div className='text-xs'>
              <span className='ml-1'>Đã bán</span>
              <span className='ml-1'>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
          <div className='flex items-center gap-2 mt-3'>
            <span className='text-sm text-gray-400 line-through'>₫{formatCurrency(product.price_before_discount)}</span>
            <span className='text-[#27272a] text-[16px] text-sm font-semibold'>₫{formatCurrency(product.price)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}