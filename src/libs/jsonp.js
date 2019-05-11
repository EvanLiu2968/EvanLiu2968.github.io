import jsonp from 'jsonp'
import { Message } from 'element-ui'

const service = function(url) {
  return new Promise((resolve, reject) => {
    jsonp(`https://bird.ioliu.cn/v1?url=${url}`, null, (error, res) => {
      if (error) {
        Message({
          message: error.message,
          type: 'error',
          duration: 3 * 1000
        })
        reject(error)
      } else {
        resolve(res);
      }
    });
  })
}
export default service
