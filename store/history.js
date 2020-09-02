export const actions = {
  async getAllHistory ({ commit }, userId) {
    try {
      return await this.$axios.$get('/api/history/admin/' + userId)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  }
}
