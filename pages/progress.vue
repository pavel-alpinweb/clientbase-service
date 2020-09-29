<template lang="pug">
  .progress
    .progress__graffics
      ratingCategory(:categoryName="'Архивные'", :procent="procent", :typeProgress="typeProgress", :categoryTrades="getCategoryTrades('archive')")
      ratingCategory(:categoryName="'Спящие'", :procent="procent", :typeProgress="typeProgress", :categoryTrades="getCategoryTrades('sleep')")
      ratingCategory(:categoryName="'Открытые'", :procent="procent", :typeProgress="typeProgress", :categoryTrades="getCategoryTrades('open')")
      ratingCategory(:categoryName="'Постоянные'", :procent="procent", :typeProgress="typeProgress", :categoryTrades="getCategoryTrades('repeat')")
      ratingCategory(:categoryName="'V.I.P.'", :procent="procent", :typeProgress="typeProgress", :categoryTrades="getCategoryTrades('vip')")
</template>

<script>
import ratingCategory from '@/components/pages/rating-category'

export default {
  middleware: ['admin-auth'],
  components: {
    ratingCategory
  },
  data () {
    return {
      isHint: true,
      typeProgress: 'payloads',
      textPage:
      `На этой странице показана общая статистика за все время использования этого приложения. 
      Здесь вы можете узнать, сколько клиентов попадало в каждую из категорий. 
      Чтобы узнать подобно, о том кто эти клиенты, зайдите на страницу "Списки"`
    }
  },
  computed: {
    procent () {
      let procent = 0
      if (this.typeProgress === 'payloads') {
        procent = this.getOnePayloadsProcent()
      } else if (this.typeProgress === 'trades') {
        procent = this.getOneTradesProcent()
      }
      return procent
    }
  },
  async asyncData ({ store }) {
    const user = store.getters['auth/user']
    const trades = await store.dispatch('trade/getAll', user.userId)
    return { trades }
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
      for (const trade of this.trades) {
        allMoney += trade.pay
      }
      if (allMoney !== 0) {
        procent = allMoney / 100
      }
      return procent
    },
    getOneTradesProcent () {
      const allTrades = this.trades.length
      let procent = 0
      if (allTrades !== 0) {
        procent = allTrades / 100
      }
      return procent
    },
    getCategoryTrades (category) {
      return this.trades.filter(trade => trade.client.status === category)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/layout/vars.scss';
  .progress{
      width: 100%;
      height: auto;
      position: relative;
       .preloader__spinner{
          display: none;
      }
  }

  .progress__graffics{
      border-left: 2px solid $mainColor;
      border-bottom: 2px solid $mainColor;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 150px;
      margin-bottom:20px;
      min-height: 85vh;
  }
</style>
