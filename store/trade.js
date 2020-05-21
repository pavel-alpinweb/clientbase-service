export const actions = {
  async createTrade ({ commit }, trade) {
    try {
      return await this.$axios.$post('/api/trade/admin/create', trade)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  }
}
