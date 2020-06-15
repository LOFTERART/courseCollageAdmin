import request from '@/utils/request'


//增加分类
export function createClassify(data) {
  return request({
    url: '/classify/createClassify',
    method: 'post',
    data
  })
}



//获取分类
export function getClassify(data) {
  return request({
    url: '/classify/getClassify',
    method: 'post',
    data
  })
}

//更新分类
export function upClassify(data) {
  return request({
    url: '/classify/upClassify',
    method: 'post',
    data
  })
}
