//创建课程分类

import request from "@/utils/request";

export function createWeChatIndex(data) {
  return request({
    url: '/admin/weChatIndex',
    method: 'post',
    data
  })
}



export function getWeChatIndexList() {
  return request({
    url: '/admin/weChatIndex/list',
    method: 'post',

  })
}
