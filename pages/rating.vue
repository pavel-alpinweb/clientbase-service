<template lang="pug">
  .rating
    .rating_search
      Search
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
      typeRatingSort: 'payloads',
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
      if (this.typeRatingSort === 'payloads') {
        clients = this.sortByPayloads(this.clients)
      } else if (this.typeRatingSort === 'trades') {
        clients = this.sortByTrades(this.clients)
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
      for (const client of this.clients) {
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
      for (const client of this.clients) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/layout/vars.scss';
  .rating{
    width: 100%;
    align-self: flex-start;
  }
  .rating_search{
    padding-bottom: 20px;
  }
  .rating__list{
    border-left: 2px solid $mainColor;
    border-bottom: 2px solid $mainColor;
    min-height: 90vh;
    padding: 0;
    margin: 0;
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
