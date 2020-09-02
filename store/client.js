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
  async updateClient ({ commit }, client) {
    const formData = new FormData()
    if (client.file) {
      for (const key in client) {
        if (key === 'file') {
          formData.append('file', client[key], client[key].name)
        }
      }
    } else {
      for (const key in client) {
        if (key === 'trades') {
          formData.append(`${key}`, JSON.stringify(client[key]))
        } else if (key !== '_id') {
          formData.append(`${key}`, client[key])
        }
      }
    }
    try {
      return await this.$axios.$put('/api/client/admin/update/' + client._id, formData)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async archiveClient ({ commit }, { clientId, userId }) {
    try {
      return await this.$axios.$put(`/api/client/admin/archive/${clientId}/${userId}`)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async reopenClient ({ commit }, { clientId, userId }) {
    try {
      return await this.$axios.$put(`/api/client/admin/reopen/${clientId}/${userId}`)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async sleepClient ({ commit }, { clientId, userId }) {
    try {
      return await this.$axios.$put(`/api/client/admin/sleep/${clientId}/${userId}`)
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
  },
  async getAllArchive ({ commit }, userId) {
    try {
      return await this.$axios.$get('/api/client/admin/archive/' + userId)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  }
}
