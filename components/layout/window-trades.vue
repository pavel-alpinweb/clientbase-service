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
        .window-description__date-filter
       .window-description__trades-list
        .window-description__add-button
          button.button.button--add(@click="createTrade")
            svg-icon(class="btn-icon", name="trades", width="20", height="20")
            |Создать сделку
        .window-description__trades-item(v-for="(trade, i) in trades.slice().reverse()", :key="i")
          tradesRow(:number="trades.length - (i + 1)", :trade="trade")
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
      client: {}
    }
  },
  computed: {
    number () {
      return this.trades.length
    }
  },
  mounted () {
    this.$EventBus.$on('callTradesWindow', (data) => {
      this.visible = data.visible
      this.trades = data.trades
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
    createTrade () {
      const trade = {
        client: this.client,
        title: '',
        date: '',
        pay: 0,
        isNewTrade: true,
        clientId: this.client.id
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
