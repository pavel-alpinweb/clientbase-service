import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null,
  user: null
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setUser (state, user) {
    state.user = user
  },
  clearToken (state) {
    state.token = null
  },
  clearUser (state) {
    state.user = null
  }
}

export const actions = {
  async login ({ commit, dispatch }, formData) {
    try {
      const token = await this.$axios.$post('/api/auth/admin/login', formData)
      const user = jwtDecode(token)
      dispatch('setToken', token)
      dispatch('setUser', { _id: user.userId, login: user.login })
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async createUser ({ commit, dispatch }, formData) {
    try {
      const user = await this.$axios.$post('/api/auth/admin/create', formData)
      dispatch('setToken', user)
      dispatch('setUser', { _id: user._id, login: user.login })
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
  setUser ({ commit }, user) {
    commit('setUser', user)
  },
  logout ({ commit }) {
    commit('clearToken')
    commit('clearUser')
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
      const user = jwtDecode(token)
      dispatch('setUser', { _id: user.userId, login: user.login })
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
  user: state => state.user
}

function isJWTValid (token) {
  if (!token) {
    return false
  }

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}
