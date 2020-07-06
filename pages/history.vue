<template lang="pug">
  .history
    .history__search
      Search
    .history__item(v-for="(client, index) in clientsArray", :key="client._id")
      HistoryClientCard(:client="client", :index="index")
</template>

<script>
import Search from '@/components/pages/search'
import HistoryClientCard from '@/components/pages/history-client-card'
export default {
  middleware: ['admin-auth'],
  components: {
    Search,
    HistoryClientCard
  },
  data () {
    return {
      searchString: '',
      isHint: true,
      textPage:
      `На этой странице показана вся история сотрудничества со всеми клиентами.
       Введите в поиск имя или id клиента, чтобы увидеть историю сотрудничества только с данным клиентом.
       Важный совет. Прежде чем перемещать клиента из одной категории в другую, оставляйте запись почему вы это сделали и не забывайте сохранить.
       Это поможет, Вам увидеть точную ретроспективу Вашего сотрудничества.`
    }
  },
  computed: {
    clientsArray () {
      if (this.searchString === '') {
        return this.clients
      } else {
        const checkClients = this.clients.filter((client) => {
          return client.name.toLowerCase().includes(this.searchString.toLowerCase())
        })
        return checkClients
      }
    }
  },
  async asyncData ({ store }) {
    const user = store.getters['auth/user']
    const clients = await store.dispatch('history/getAllHistory', user.userId)
    return { clients }
  },
  mounted () {
    this.$EventBus.$on('switchHint', (data) => {
      this.isHint = data.active
    })
    this.$EventBus.$on('search', (data) => {
      this.searchString = data.searchString
    })
    this.$EventBus.$emit('changePageText', { textPage: this.textPage })
  }
}
</script>

<style lang="scss">
.history{
  display:grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  align-self: flex-start;
  width:100%;
  min-height: 100vh;
  grid-auto-rows: max-content;
}
.history__search{
  grid-column: 1 / 6;
}
</style>
