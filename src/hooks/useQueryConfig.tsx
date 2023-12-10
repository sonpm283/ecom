import { ProductListConfig } from 'src/types/product.type'
import useQueryParams from './useQueryParams'
import { isUndefined, omitBy } from 'lodash'
export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  // thay vì truyền queryParams thông thường(trên url có gì thì lấy hết) thì chỉ truyền những params mà mình mong muốn gửi lên server thôi
  // ví dụ: khi có params là ?value=10 thì params value này sẽ không được gửi đi vì chỉ lấy bộ params queryConfig này thôi mặc dù queryParams.value vẫn lấy được()
  // nghĩa là dù cho url có param là ?value=10 thì cũng không lấy nó mà chỉ lấy đống bên dưới thôi
  // tóm lại: mong muốn gửi 1 bộ params mà mình xác định sẽ gửi chứ không phải lấy tất cả params

  // omitBy loại bỏ những trường thoả mãn là isUndefined (lodash)
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '10',
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
  return queryConfig
}
