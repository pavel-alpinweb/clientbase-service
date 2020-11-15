export const actions = {
  async createTrade ({ commit }, trade) {
    try {
      this.$EventBus.$emit('showPreloader', { preloaderVisible: true })
      return await this.$axios.$post('/api/trade/admin/create', trade)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    } finally {
      this.$EventBus.$emit('showPreloader', { preloaderVisible: false })
    }
  },
  async updateTrade ({ commit }, trade) {
    try {
      this.$EventBus.$emit('showPreloader', { preloaderVisible: true })
      return await this.$axios.$put('/api/trade/admin/update/' + trade._id, trade)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    } finally {
      this.$EventBus.$emit('showPreloader', { preloaderVisible: false })
    }
  },
  async removeTrade ({ commit }, { clientId, tradeId }) {
    try {
      this.$EventBus.$emit('showPreloader', { preloaderVisible: true })
      return await this.$axios.$delete(`/api/trade/admin/delete/${clientId}/${tradeId}`)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    } finally {
      this.$EventBus.$emit('showPreloader', { preloaderVisible: false })
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
