
import request from '@/utils/request'


//增加分类
export function createStudio(data) {
  return request({
    url: '/studio/createstudio',
    method: 'post',
    data
  })
}



//获取分类
export function getStudio(data) {
  return request({
    url: '/studio/getstudio',
    method: 'post',
    data
  })
}

//更新分类
export function upStudio(data) {
  return request({
    url: '/studio/upstudio',
    method: 'post',
    data
  })
}
