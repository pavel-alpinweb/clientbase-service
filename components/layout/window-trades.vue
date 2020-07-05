<template lang="pug">
    .window-description(v-if="visible")
      .window-description__overlay(@click="closeThisWindow")
      .window-description__content.window-description__content--big
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
          tradesRow(
            :number="-1",
            :trade="client.lastChangedTrade.trade",
            :actualClientStatus="client.status",
            :hasClientPropertyChange="true",
            :lastChangedTradeType="client.lastChangedTrade.type")
        .window-description__date-filter
          .date-filter
            .date-filter__half-item
              .date-filter__form-title Все сделки с
              .date-filter__datepicker
                .date-filter__date-clean(@click="tradesFromDate = ''")
                  svg-icon(class="svg-icon", name="checkmark", width="18", height="18")
                input.search__input.date-filter__input(type="date", placeholder="Выберите дату", v-model="tradesFromDate")
            .date-filter__half-item
              .date-filter__form-title Все сделки по
              .date-filter__datepicker
                .date-filter__date-clean(@click="tradesToDate = ''")
                  svg-icon(class="svg-icon", name="checkmark", width="18", height="18")
                input.search__input.date-filter__input(type="date", placeholder="Выберите дату", v-model="tradesToDate")
       .window-description__trades-list
        .window-description__add-button(v-if="client.status !== 'archive' && !client.hasOwnProperty('change')")
          button.button.button--add(@click="createTrade")
            svg-icon(class="btn-icon", name="plus", width="20", height="20")
            |Создать сделку
        .window-description__trades-item(v-for="(trade, i) in filtredTradesArray", :key="i")
          tradesRow(
            :number="filtredTradesArray.length - (i + 1)",
            :trade="trade", :actualClientStatus="client.status",
            :hasClientPropertyChange="client.hasOwnProperty('change')")
</template>

<script>
import tradesRow from '@/components/pages/trades-row'

export default {
  name: 'WindowDesc',
  components: {
    tradesRow
  },
  data () {
    return {
      trades: [],
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
    this.$EventBus.$on('callTradesWindow', (data) => {
      this.visible = data.visible
      this.trades = this.sortByDate(data.trades)
      this.client = data.client
    })
    this.$EventBus.$on('deleteTrade', (data) => {
      this.trades.splice(data.index, 1)
    })
    this.$EventBus.$on('updateTrade', (data) => {
      this.trades[data.index] = data.trade
    })
  },
  methods: {
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
        clientId: this.client._id
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
