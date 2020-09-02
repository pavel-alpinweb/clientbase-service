import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  clearToken (state) {
    state.token = null
  }
}

export const actions = {
  async login ({ commit, dispatch }, formData) {
    try {
      const token = await this.$axios.$post('/api/auth/admin/login', formData)
      dispatch('setToken', token)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async createUser ({ commit, dispatch }, formData) {
    try {
      const user = await this.$axios.$post('/api/auth/admin/create', formData)
      dispatch('setToken', user)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  setToken ({ commit }, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    Cookies.set('jwt-token', token)
  },
  logout ({ commit }) {
    commit('clearToken')
    Cookies.remove('jwt-token')
  },
  autoLogin ({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie
    const cookie = Cookie.parse(cookieStr || '') || {}
    const token = cookie['jwt-token']

    if (isJWTValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  }
}

export const getters = {
  isAuthenticated: (state) => {
    return Boolean(state.token)
  },
  token: state => state.token,
  user: (state) => {
    const tokenObj = jwtDecode(state.token)
    return {
      userId: tokenObj.userId,
      login: tokenObj.login
    }
  }
}

function isJWTValid (token) {
  if (!token) {
    return false
  }

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}
