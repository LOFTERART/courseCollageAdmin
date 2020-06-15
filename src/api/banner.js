
import request from '@/utils/request'


//增加banner
export function createBanner(data) {
return request({
url: '/banner/createbanner',
method: 'post',
data
})
}



//获取banner
export function getBanner(data) {
return request({
url: '/banner/getbanner',
method: 'post',
data
})
}

//更新banner
export function upBanner(data) {
return request({
url: '/banner/upbanner',
method: 'post',
data
})
}
