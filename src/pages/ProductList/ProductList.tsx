import { Link } from 'react-router-dom'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import { omitBy, isUndefined } from 'lodash'
import categoryApi from 'src/apis/category.api'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  // thay vì truyền queryParams thông thường(trên url có gì thì lấy hết) thì chỉ truyền những params mà mình mong muốn gửi lên server thôi
  // ví dụ: khi có params là ?value=10 thì params value này sẽ không được gửi đi vì chỉ lấy bộ params queryConfig này thôi mặc dù queryParams.value vẫn lấy được()
  // nghĩa là dù cho url có param là ?value=10 thì cũng không lấy nó mà chỉ lấy đống bên dưới thôi
  // tóm lại: mong muốn gửi 1 bộ params mà mình xác định sẽ gửi chứ không phải lấy tất cả params

  // omitBy loại bỏ những trường thoả mãn là isUndefined (lodash)
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      exclude: queryParams.exclude,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      name: queryParams.name,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
  )

  //queryConfig thay đổi sẽ gọi lại useQuery này
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      //ép kiểu queryConfig là ProductListConfig
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-[#f5f5fa] py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-2'>
              <AsideFilter categoriesData={categoriesData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-10'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <ul className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {productsData.data.data.products.map((product) => (
                  <li key={product._id}>
                    <Link to=''>
                      <Product product={product} />
                    </Link>
                  </li>
                ))}
              </ul>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
