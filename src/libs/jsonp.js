import jsonp from 'jsonp'
import { Message, Loading } from 'element-ui'

const service = function(url, isProxy = false) {
  return new Promise((resolve, reject) => {
    if (isProxy) {
      url = `https://bird.ioliu.cn/v1?url=${url}`
    }
    const loadingInstance = Loading.service({})
    jsonp(url, null, (error, res) => {
      loadingInstance.close()
      if (error) {
        Message({
          message: error.message,
          type: 'error',
          duration: 3 * 1000
        })
        reject(error)
      } else {
        resolve(res)
      }
    })
  })
}
export default service
