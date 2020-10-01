<template lang="pug">
  .progress
    .progress.progress--grid-two
      .progress__date-filter
        DateFilter(:target="'page-progress'")
      .progress__progress-type
        nav.rating__menu
          ul.rating__menu-list
              li.rating__menu-item.rating__menu-item--active
                button.button.button--wait(
                  :class="{'button--wait-active' : typeProgress === 'trades'}"
                  @click="typeProgress = 'trades'"
                )
                  svg-icon(class="btn-icon", name="trades", width="20", height="20")
                  |По сделкам
              li.rating__menu-item
                button.button.button--wait(
                  :class="{'button--wait-active' : typeProgress === 'payloads'}"
                  @click="typeProgress = 'payloads'"
                )
                  svg-icon(class="btn-icon", name="money", width="20", height="20")
                  |По выплатам
    .progress.progress--grid-two
      .progress__paylods-summ
        b Общая сумма сделок: {{ allMoney }}
      .progress__tardes-summ
        b Общее число сделок: {{ trades.length }}
    .progress__graffics
      ratingCategory(:categoryName="'Новые'", :procent="procent", :typeProgress="typeProgress", :categoryTrades="getCategoryTrades('aspirant')")
      ratingCategory(:categoryName="'Открытые'", :procent="procent", :typeProgress="typeProgress", :categoryTrades="getCategoryTrades('open')")
      ratingCategory(:categoryName="'Постоянные'", :procent="procent", :typeProgress="typeProgress", :categoryTrades="getCategoryTrades('repeat')")
      ratingCategory(:categoryName="'V.I.P.'", :procent="procent", :typeProgress="typeProgress", :categoryTrades="getCategoryTrades('vip')")
</template>

<script>
import ratingCategory from '@/components/pages/rating-category'
import DateFilter from '@/components/pages/date-filter'

export default {
  middleware: ['admin-auth'],
  components: {
    ratingCategory,
    DateFilter
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
    },
    allMoney () {
      let allMoney = 0
      for (const trade of this.trades) {
        allMoney += trade.pay
      }

      return allMoney
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
      let procent = 0
      if (this.allMoney !== 0) {
        procent = this.allMoney / 100
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

<style lang="scss" src="@/assets/styles/components/buttons.scss"></style>
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

  .progress--grid-two {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    align-items: end;
  }

  .rating__menu{
    margin-bottom: 15px;
  }

  .rating__menu-list{
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }

  .rating__menu-item--active{
    .button--text{
      color: $mainColor;
      background: transparent;
    }
  }

  .progress__graffics{
      border-left: 2px solid $mainColor;
      border-bottom: 2px solid $mainColor;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 150px;
      margin-bottom:20px;
      min-height: 85vh;
  }
</style>
