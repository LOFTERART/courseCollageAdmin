import request from '@/utils/request'


//添加文章
export function CreateArticleHelp(data) {
  return request({
    url: '/admin/help/createArticle',
    method: 'post',
    data
  })
}

//添加文章
export function GetArticleHelp() {
  return request({
    url: '/admin/help/getArticle',
    method: 'post',
  })
}
