export const actions = {
  async createClient ({ commit }, client) {
    const formData = new FormData()
    if (client.file) {
      for (const key in client) {
        if (key === 'file') {
          formData.append('file', client[key], client[key].name)
        } else if (key !== 'image') {
          formData.append(`${key}`, client[key])
        }
      }
    } else {
      for (const key in client) {
        formData.append(`${key}`, client[key])
      }
    }

    try {
      return await this.$axios.$post('/api/client/admin/create', formData)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async getAll ({ commit }, userId) {
    try {
      return await this.$axios.$get('/api/client/admin/' + userId)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  }
}
