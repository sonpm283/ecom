import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart: function (body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases: function (params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`, {
      params
    })
  }
}

export default purchaseApi
