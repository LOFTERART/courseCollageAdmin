import request from '@/utils/request'


//获取订单
export function getUserOrder(data) {
  return request({
    url: '/api/v1/getOrders',
    method: 'post',
    data
  })
}

//更新发货状态
export function upUserOrderSendType(data) {
  return request({
    url: '/api/v1/order/upSendType',
    method: 'post',
    data
  })
}
