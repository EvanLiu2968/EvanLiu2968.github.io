const getters = {
  device: state => state.app.device,
  token: state => state.user.token,
  userinfo: state => state.user.userinfo
}
export default getters
