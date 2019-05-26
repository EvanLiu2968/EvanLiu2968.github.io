import request from '@/libs/request'
import jsonp from '@/libs/jsonp'

const CORS = true

export function getCloverPhotos(data = {}) {
  if (CORS) {
    return jsonp('https://raw.githubusercontent.com/EvanLiu2968/clover/master/photo.json', true)
  }
  return request({
    url: 'https://raw.githubusercontent.com/EvanLiu2968/clover/master/photo.json',
    method: 'get',
    params: data
  })
}

export function getCloverArticles(data = {}) {
  if (CORS) {
    return jsonp('https://raw.githubusercontent.com/EvanLiu2968/clover/master/blog.json', true)
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
    return jsonp(`http://api.juheapi.com/japi/toh?key=e676ca1db545a88c1a22c7da35253776&v=1.0&month=${month}&day=${day}`, true)
  }
}
// getHistoryTodayDetail
export function getHistoryTodayDetail(id) {
  if (CORS) {
    return jsonp(`http://api.juheapi.com/japi/tohdet?key=e676ca1db545a88c1a22c7da35253776&v=1.0&id=${id}`, true)
  }
}
// getDoubanMovieList
export function getDoubanMovieList(type, start, count) {
  if (CORS) {
    return jsonp(`https://api.douban.com/v2/movie/${type}?start=${start}&count=${count}`)
  }
}
// getDoubanMovieDetail
export function getDoubanMovieDetail(id) {
  if (CORS) {
    return jsonp(`https://api.douban.com/v2/movie/subject/${id}`)
  }
}
// searchDoubanMovie
export function searchDoubanMovie(q, start, count) {
  if (CORS) {
    return jsonp(`https://api.douban.com/v2/movie/search?q=${q}&start=${start}&count=${count}`)
  }
}
