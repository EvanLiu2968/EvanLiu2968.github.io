/**
 * Created by zhongquan.liu on 2019/4/13.
 */

/**
 *
 * @returns 随机数ID
 */
export function randomNumberId() {
  const timestamp = +new Date() // 13位
  return parseInt(Math.random() * (9 << 16) + timestamp)
}
/**
 *
 * @returns 随机字符串ID
 */
export function randomStringId() {
  const timestamp = +new Date() + ''
  const randomNum = ~~((1 + Math.random()) * (1 << 16)) + ''
  return (+(randomNum + timestamp)).toString(32)
}
/**
 * R,G,B可取值在0~255,当前设定在128~255
 * @returns 随机颜色
 */
export function randomColor() {
  const R = Math.random() * 127 + 128
  const G = Math.random() * 127 + 128
  const B = Math.random() * 127 + 128
  return '#' + (R << 16 | G << 8 | B).toString(16)
}

/**
 *
 *
 * @param {Object} obj
 * @returns
 */
export function parseClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
