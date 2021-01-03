<template lang="pug">
  .archive
    .archive__search
      Search
    .archive__date-filter
      DateFilter(:target="'page-clients'")
    .archive__item(v-for="(client, i) in clientsArray")
      transition-group(name="component-fade",  mode="out-in")
        ClientCard(:client="client" :index="i", :key="client.id")
</template>

<script>
import Search from '@/components/pages/search'
import ClientCard from '@/components/pages/client-card'
import DateFilter from '@/components/pages/date-filter'

export default {
  middleware: ['admin-auth'],
  components: {
    Search,
    ClientCard,
    DateFilter
  },
  data () {
    return {
      searchString: '',
      clientsFromDate: '',
      clientsToDate: '',
      textPage: 'На этой странице находятся все клиенты, сотрудничество с которыми так или иначе не сложилось. Заметьте в этом приложении вообще нет кнопки "Удалить". Любого потерянного клиента можно вернуть в главную таблицу. Помните, каждый потерянный клиент это потерянная прибыль. Почитайте свои записи, оставленные к потерянному клиенту, посмотрите как развивалось Ваше сотрудничество, на странице "История". Может быть Вам удастся возобновить сотрудничество.'
    }
  },
  computed: {
    clientsArray () {
      if (this.searchString === '') {
        return this.filterClientsByDate(this.clients)
      } else {
        const checkClients = this.clients.filter((client) => {
          return client.name.toLowerCase().includes(this.searchString.toLowerCase()) ||
          client.id.toLowerCase().includes(this.searchString.toLowerCase())
        })
        return this.filterClientsByDate(checkClients)
      }
    }
  },
  async asyncData ({ store }) {
    const user = store.getters['auth/user']
    const clients = await store.dispatch('client/getAllArchive', user.userId)
    return { clients }
  },
  mounted () {
    this.$EventBus.$emit('changePageText', { textPage: this.textPage })
    this.$EventBus.$on('search', (data) => {
      this.searchString = data.searchString
    })
    this.$EventBus.$on('deleteClient', (data) => {
      this.clients.splice(data.index, 1)
    })
    this.$EventBus.$on('checkDate', (data) => {
      if (data.target === 'page-clients') {
        this.clientsFromDate = data.fromDate
        this.clientsToDate = data.toDate
      }
    })
  },
  methods: {
    filterClientsByDate (array) {
      let filtredClients = array
      if (this.clientsFromDate !== '') {
        const fromDate = new Date(this.clientsFromDate)
        filtredClients = array.filter((client) => {
          const clientDate = new Date(client.date)
          if (clientDate >= fromDate) {
            return client
          }
        })
      }
      if (this.clientsToDate !== '') {
        const toDate = new Date(this.clientsToDate)
        filtredClients = filtredClients.filter((client) => {
          const clientDate = new Date(client.date)
          if (clientDate <= toDate) {
            return client
          }
        })
      }
      return filtredClients
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/layout/vars.scss';
@import '@/assets/styles/layout/breakpoints.scss';

.archive{
  display:grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  align-self: flex-start;
  width:100%;
  min-height: 100vh;
  grid-auto-rows: max-content;
  @include middle-desktops {
    grid-template-columns: repeat(4, 1fr);
  }
}
.archive__search, .archive__date-filter{
  grid-column: 1 / 6;
  @include middle-desktops {
    grid-column: 1 / 5;
  }
}
</style>
<style lang="scss" src="@/assets/styles/components/hint.scss"></style>
<style lang="scss" scoped src="@/assets/styles/components/search.scss"></style>
<style lang="scss" scoped src="@/assets/styles/components/date-filter.scss"></style>
