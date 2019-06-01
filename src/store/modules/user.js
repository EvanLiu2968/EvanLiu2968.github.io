import { getToken, setToken, removeToken } from '@/libs/auth'
const defaultUserInfo = {
  username: '游客',
  avatar: '/public/images/mao.jpg',
  routemap: ['/login']
}

const user = {
  state: {
    userinfo: defaultUserInfo,
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userinfo) => {
      state.userinfo = userinfo
    }
  },

  actions: {
    // 登录
    loginIn({ commit }, userInfo) {
      setToken('evanliu2968')
      commit('SET_USERINFO', userInfo)
    },
    loginOut({ commit }) {
      removeToken()
      commit('SET_USERINFO', defaultUserInfo)
    }
  }
}

export default user
