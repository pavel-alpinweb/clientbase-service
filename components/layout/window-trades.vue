<template lang="pug">
    .window-description(v-if="visible")
      .window-description__overlay(@click="closeThisWindow")
      .window-description__content.window-description__content--big
        vuescroll
          .window-description__scroll-content
            svg-icon(@click="closeThisWindow", class="close-icon", name="checkmark", width="18", height="18")
            .window-description__header
             .window-description__title Все сделки клиента <span>{{ client.name }}</span>
             .window-description__search-box
               .search
                 input.search__input(type="text", placeholder="Поиск сделки", v-model="searchString")
                 .search__clean(@click="cleanSearch")
                     svg-icon(class="svg-icon", name="checkmark", width="18", height="18")
             .window-description__lastTrade(v-if="client.lastChangedTrade")
               .window-description__sub-title Последняя измененная сделка
               TradesRow(
                 :number="-1",
                 :trade="client.lastChangedTrade.trade",
                 :actualClientStatus="client.status",
                 :hasClientPropertyChange="true",
                 :lastChangedTradeType="client.lastChangedTrade.type")
             .window-description__date-filter
               DateFilter(:target="'window-trades'")
            .window-description__trades-list
             .window-description__add-button(v-if="client.status !== 'archive' && !client.hasOwnProperty('change')")
               button.button.button--add(@click="createTrade")
                 svg-icon(class="btn-icon", name="plus", width="20", height="20")
                 |Создать сделку
             transition-group(name="component-fade",  mode="out-in")
               .window-description__trades-item(v-for="(trade, i) in filtredTradesArray", :key="i")
                 TradesRow(
                   :number="filtredTradesArray.length - (i + 1)",
                   :trade="trade", :actualClientStatus="client.status",
                   :hasClientPropertyChange="client.hasOwnProperty('change')")
</template>

<script>
import TradesRow from '@/components/pages/trades-row'
import DateFilter from '@/components/pages/date-filter'
import vuescroll from 'vuescroll'

export default {
  name: 'WindowDesc',
  components: {
    TradesRow,
    DateFilter,
    vuescroll
  },
  data () {
    return {
      trades: [],
      user: {},
      visible: false,
      searchString: '',
      tradesFromDate: '',
      tradesToDate: '',
      client: {}
    }
  },
  computed: {
    number () {
      return this.trades.length
    },
    filtredTradesArray () {
      if (this.searchString === '') {
        return this.filterTradeByDate(this.trades).slice().reverse()
      } else {
        const checkTrades = this.trades.filter((trade) => {
          return trade.title.toLowerCase().includes(this.searchString.toLowerCase())
        })
        return this.filterTradeByDate(checkTrades).slice().reverse()
      }
    }
  },
  mounted () {
    this.setUser()
    this.$EventBus.$on('callTradesWindow', (data) => {
      this.visible = data.visible
      this.trades = this.sortByDate(data.trades)
      this.client = data.client
    })
    this.$EventBus.$on('deleteTrade', (data) => {
      this.trades.splice(data.index, 1)
      this.client.name = data.client.name
      this.client.id = data.client.id
      this.client._id = data.client._id
      this.client.clientImage = data.client.image
      this.client.status = data.client.status
    })
    this.$EventBus.$on('updateTrade', (data) => {
      this.trades.splice(data.index, 1, data.trade)
      // this.filtredTradesArray[data.index] = data.trade
      this.client.name = data.client.name
      this.client.id = data.client.id
      this.client._id = data.client._id
      this.client.clientImage = data.client.image
      this.client.status = data.client.status
    })
    this.$EventBus.$on('checkDate', (data) => {
      if (data.target === 'window-trades') {
        this.tradesFromDate = data.fromDate
        this.tradesToDate = data.toDate
      }
    })
  },
  methods: {
    setUser () {
      this.user = this.$store.getters['auth/user']
    },
    closeThisWindow () {
      this.visible = false
    },
    cleanSearch () {
      this.searchString = ''
    },
    filterTradeByDate (array) {
      let filtredTrades = array
      if (this.tradesFromDate !== '') {
        const fromDate = new Date(this.tradesFromDate)
        filtredTrades = array.filter((trade) => {
          const tradeDate = new Date(trade.date)
          if (tradeDate >= fromDate) {
            return trade
          }
        })
      }
      if (this.tradesToDate !== '') {
        const toDate = new Date(this.tradesToDate)
        filtredTrades = filtredTrades.filter((trade) => {
          const tradeDate = new Date(trade.date)
          if (tradeDate <= toDate) {
            return trade
          }
        })
      }
      return filtredTrades
    },
    sortByDate (array) {
      return array.sort((a, b) => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        return aDate - bDate
      })
    },
    createTrade () {
      const trade = {
        client: this.client,
        title: '',
        date: '',
        pay: 0,
        isNewTrade: true,
        clientId: this.client._id,
        userId: this.user.userId
      }
      this.trades.push(trade)
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/components/window-info.scss"></style>
<style lang="scss" scoped src="@/assets/styles/components/search.scss"></style>
<style lang="scss" scoped src="@/assets/styles/components/buttons.scss"></style>
<style lang="scss" scoped src="@/assets/styles/components/trades-row.scss"></style>
<style lang="scss" scoped src="@/assets/styles/components/date-filter.scss"></style>
