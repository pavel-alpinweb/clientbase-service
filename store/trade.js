export const actions = {
  async createTrade ({ commit }, trade) {
    try {
      return await this.$axios.$post('/api/trade/admin/create', trade)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async updateTrade ({ commit }, trade) {
    try {
      return await this.$axios.$put('/api/trade/admin/update/' + trade._id, trade)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async removeTrade ({ commit }, { clientId, tradeId }) {
    try {
      return await this.$axios.$delete(`/api/trade/admin/delete/${clientId}/${tradeId}`)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async getAll ({ commit }, userId) {
    try {
      return await this.$axios.$get('/api/trade/admin/' + userId)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  }
}
