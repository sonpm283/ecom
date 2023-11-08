import { Link } from 'react-router-dom'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import Pagination from 'src/components/Pagination'
import { useState } from 'react'

export default function ProductList() {
  const queryParams = useQueryParams()
  const [page, setPage] = useState<number>(1)

  //queryParams thay đổi sẽ gọi lại useQuery này
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-2'>
            <AsideFilter />
          </div>
          <div className='col-span-10'>
            <SortProductList />
            <ul className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {data &&
                data.data.data.products.map((product) => (
                  <li key={product._id}>
                    <Link to=''>
                      <Product product={product} />
                    </Link>
                  </li>
                ))}
            </ul>
            <Pagination page={page} setPage={setPage} pageSize={50} />
          </div>
        </div>
      </div>
    </div>
  )
}
