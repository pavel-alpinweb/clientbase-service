<template lang="pug">
  .rating.rating--grid-two
    .rating_search
      Search
    .rating_sort
      nav.rating__menu
        ul.rating__menu-list
            li.rating__menu-item.rating__menu-item--active
              button.button.button--wait(
                :class="{'button--wait-active' : typeRatingSort === 'trades'}"
                @click="typeRatingSort = 'trades'"
              )
                svg-icon(class="btn-icon", name="trades", width="20", height="20")
                |По сделкам
            li.rating__menu-item
              button.button.button--wait(
                :class="{'button--wait-active' : typeRatingSort === 'payloads'}"
                @click="typeRatingSort = 'payloads'"
              )
                svg-icon(class="btn-icon", name="money", width="20", height="20")
                |По выплатам
    ul.rating__list
      li.rating__item(v-for="(client, index) in sortedClients")
        .rating__position {{ index + 1 }}
        RatingClient(:client="client", :procent="procent", :key="client.id", :typeRating="typeRatingSort")
</template>

<script>
import Search from '@/components/pages/search'
import RatingClient from '@/components/pages/rating-client'
export default {
  middleware: ['admin-auth'],
  components: {
    Search,
    RatingClient
  },
  data () {
    return {
      isHint: true,
      typeRatingSort: 'trades',
      currentStatus: 'all',
      textPage: 'На этой странице показан рейтинг всех клиентов, а так-же процент от общей прибыли, которую принес Вам каждый из клиентов.'
    }
  },
  computed: {
    procent () {
      let procent = 0
      if (this.typeRatingSort === 'payloads') {
        procent = this.getOnePayloadsProcent()
      } else if (this.typeRatingSort === 'trades') {
        procent = this.getOneTradesProcent()
      }
      return procent
    },
    sortedClients () {
      let clients = []
      if (this.currentStatus !== 'all') {
        clients = this.filterByStatus(this.clients)
      } else {
        clients = this.clients
      }
      if (this.typeRatingSort === 'payloads') {
        clients = this.sortByPayloads(clients)
      } else if (this.typeRatingSort === 'trades') {
        clients = this.sortByTrades(clients)
      }
      return clients
    }
  },
  async asyncData ({ store }) {
    const user = store.getters['auth/user']
    const clients = await store.dispatch('client/getAll', user.userId)
    return { clients }
  },
  mounted () {
    this.$EventBus.$on('switchHint', (data) => {
      this.isHint = data.active
    })
    this.$EventBus.$emit('changePageText', { textPage: this.textPage })
  },
  methods: {
    getOnePayloadsProcent () {
      let allMoney = 0
      let procent = 0
      for (const client of this.sortedClients) {
        for (const trade of client.trades) {
          allMoney += trade.pay
        }
      }
      if (allMoney !== 0) {
        procent = allMoney / 100
      }
      return procent
    },
    getOneTradesProcent () {
      let allTrades = 0
      let procent = 0
      for (const client of this.sortedClients) {
        allTrades += client.trades.length
      }
      if (allTrades !== 0) {
        procent = allTrades / 100
      }
      return procent
    },
    sortByTrades (array) {
      return array.sort((a, b) => {
        return b.trades.length - a.trades.length
      })
    },
    sortByPayloads (array) {
      return array.sort((a, b) => {
        let aPayloads = 0
        let bPayloads = 0
        for (const trade of a.trades) {
          aPayloads += trade.pay
        }
        for (const trade of b.trades) {
          bPayloads += trade.pay
        }
        return bPayloads - aPayloads
      })
    },
    filterByStatus (array) {
      return array.filter(client => client.status === this.currentStatus)
    }
  }
}
</script>

<style lang="scss" src="@/assets/styles/components/buttons.scss"></style>
<style lang="scss" scoped>
  @import '@/assets/styles/layout/vars.scss';
  .rating{
    width: 100%;
    align-self: flex-start;
  }
  .rating--grid-two{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  .rating_search{
    padding-bottom: 20px;
  }
  .rating__menu-list{
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
  .rating__list{
    border-left: 2px solid $mainColor;
    border-bottom: 2px solid $mainColor;
    min-height: 90vh;
    padding: 0;
    margin: 0;
    grid-column: 1 / span 3;
  }
  .rating__item{
    margin-bottom: 50px;
    display: flex;
    width:100%;
    align-items: center;
    padding-left: 20px;
  }
  .rating__position{
    color: $mainColor;
    font-family: $mainFont;
    font-size: $h3fontSize;
    font-weight: 700;
  }
  .rating__menu-item--active{
    .button--text{
      color: $mainColor;
      background: transparent;
    }
  }
</style>
