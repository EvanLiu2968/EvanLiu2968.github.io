import { getToken, setToken, removeToken } from '@/libs/auth'

const user = {
  state: {
    userinfo: null,
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
    loginIn({ commit }, userinfo) {
      setToken(userinfo.token)
      commit('SET_USERINFO', userinfo)
    },
    loginOut({ commit }) {
      removeToken()
      commit('SET_USERINFO', null)
    }
  }
}

export default user
