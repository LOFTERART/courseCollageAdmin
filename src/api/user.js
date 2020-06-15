import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/v1/loginAdmin',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/user/v1/getAdminInfo',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function createAdmin(data) {
  return request({
    url: '/user/v1/createAdmin',
    method: 'post',
    data
  })
}


//获取用户
export function GetUsers() {
  return request({
    url: '/admin/getUsers',
    method: 'post',
  })
}

//获取课程排行榜
export function GetCourseRank() {
  return request({
    url: '/admin/courseRank',
    method: 'post',
  })
}
