import request from '@/utils/request'


//添加文章
export function GetLiveVideoList(data) {
  return request({
    url: '/video/getRoomList',
    method: 'post',
    data
  })
}
