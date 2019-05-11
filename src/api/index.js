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
