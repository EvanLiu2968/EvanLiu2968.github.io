import request from '@/libs/request'
import jsonp from '@/libs/jsonp'

const CORS = true

export function getCloverPhotos(data = {}) {
  if (CORS) {
    return jsonp('https://raw.githubusercontent.com/EvanLiu2968/clover/master/photo.json')
  }
  return request({
    url: 'https://raw.githubusercontent.com/EvanLiu2968/clover/master/photo.json',
    method: 'get',
    params: data
  })
}

export function getCloverArticles(data = {}) {
  if (CORS) {
    return jsonp('https://raw.githubusercontent.com/EvanLiu2968/clover/master/blog.json')
  }
  return request({
    url: 'https://raw.githubusercontent.com/EvanLiu2968/clover/master/blog.json',
    method: 'get',
    params: data
  })
}
// getHistoryTodayList
export function getHistoryTodayList(month, day) {
  if (CORS) {
    return jsonp(`http://api.juheapi.com/japi/toh?key=e676ca1db545a88c1a22c7da35253776&v=1.0&month=${month}&day=${day}`)
  }
}
// getHistoryTodayDetail
export function getHistoryTodayDetail(id) {
  if (CORS) {
    return jsonp(`http://api.juheapi.com/japi/tohdet?key=e676ca1db545a88c1a22c7da35253776&v=1.0&id=${id}`)
  }
}
