<template lang="pug">
  .history
    .history__search
      Search
    .history__date-filter
      DateFilter(:target="'page-clients'")
    .history__item(v-for="(client, index) in clientsArray")
      transition-group(name="component-fade",  mode="out-in")
        HistoryClientCard(:client="client", :index="index", :key="client._id")
</template>

<script>
import Search from '@/components/pages/search'
import HistoryClientCard from '@/components/pages/history-client-card'
import DateFilter from '@/components/pages/date-filter'

export default {
  middleware: ['admin-auth'],
  components: {
    Search,
    HistoryClientCard,
    DateFilter
  },
  data () {
    return {
      searchString: '',
      isHint: true,
      clientsFromDate: '',
      clientsToDate: '',
      textPage:
      `На этой странице показана вся история сотрудничества со всеми клиентами.
       Введите в поиск имя или id клиента, чтобы увидеть историю сотрудничества только с данным клиентом.`
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
        fromDate.setSeconds(fromDate.getSeconds() + 23 * 60 * 60 - 1)
        filtredClients = array.filter((client) => {
          const clientDate = new Date(client.date)
          if (clientDate >= fromDate) {
            return client
          }
        })
      }
      if (this.clientsToDate !== '') {
        const toDate = new Date(this.clientsToDate)
        toDate.setSeconds(toDate.getSeconds() + 23 * 60 * 60 - 1)
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

<style lang="scss" scoped>
@import '@/assets/styles/layout/vars.scss';
@import '@/assets/styles/layout/breakpoints.scss';

.history{
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
  @include tablets-portrait {
    grid-template-columns: repeat(2, 1fr);
  }
  @include tablets-landscape {
    grid-template-columns: repeat(3, 1fr);
  }
  @include all-small-mobiles {
    grid-template-columns: 1fr;
  }
}
.history__search{
  grid-column: 1 / 6;
  @include middle-desktops {
    grid-column: 1 / 5;
  }
  @include tablets-portrait {
    grid-column: 1 / 3;
  }
  @include tablets-landscape {
    grid-column: 1 / 4;
  }
  @include all-small-mobiles {
    grid-column: 1;
  }
}
.history__date-filter{
  grid-column: 1 / 6;
  @include middle-desktops {
    grid-column: 1 / 5;
  }
  @include tablets-portrait {
    grid-column: 1 / 3;
  }
  @include tablets-landscape {
    grid-column: 1 / 4;
  }
  @include all-small-mobiles {
    grid-column: 1;
  }
}
</style>
