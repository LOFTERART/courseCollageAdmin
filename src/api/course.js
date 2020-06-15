import request from '@/utils/request'

//创建课程分类

export function createCourse(data) {
  return request({
    url: '/api/v1/addcat',
    method: 'post',
    data
  })
}


//获取课程课程
export function getCourseList() {
  return request({
    url: '/api/v1/getCourseCat',
    method: 'post',
  })
}



//创建书籍
export function createBook(data) {
  return request({
    url: '/api/v1/createCourseBook',
    method: 'post',
    data
  })
}

//删除书籍
export function delBookById(data) {
  return request({
    url: '/api/v1/book/delbooks',
    method: 'post',
    data
  })
}
//获取书籍

export function getBookList(data) {
  return request({
    url: '/api/v1/book/getbooks',
    method: 'post',
    data
  })
}


//图片上传地址

export const UPLOADURL= process.env.VUE_APP_BASE_API+"/api/v1/upload"
//传单图
export const UPLOADURLSingle= process.env.VUE_APP_BASE_API+"/admin/weChatIndex/uploadImg"


//获取课程详情

export function getCourseDetail(data) {
  return request({
    url: '/admin/courseDetail',
    method: 'post',
    data
  })
}
