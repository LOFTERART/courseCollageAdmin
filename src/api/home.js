import request from '@/utils/request'


//删除书籍
export function getHomeInfo() {
  return request({
    url: '/user/v1/adminHomeInfo',
    method: 'post',
  })
}
