import AsideFilter from './components/AsideFilter'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import categoryApi from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import SortProductList from './components/SortProductList'
import Product from './components/Product'
import Breadcrumbs from 'src/components/Breadcrumbs'

export default function ProductList() {
  const queryConfig = useQueryConfig()

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
    <div className='bg-[#f5f5fa]'>
      <div className='container'>
      <Breadcrumbs links={[{ name: 'Home', path: '/' }, { name: 'Product', path: '/product' }]} current='Current Page' />
        {productsData && (
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-0 md:col-span-2'>
              <AsideFilter categoriesData={categoriesData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-12 md:col-span-10'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <ul className='mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {productsData.data.data.products.map((product) => (
                  <li key={product._id}>
                    <Product product={product} />
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
