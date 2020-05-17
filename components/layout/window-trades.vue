<template lang="pug">
    .window-description(v-if="visible")
      .window-description__overlay(@click="closeThisWindow")
      .window-description__content.window-description__content--big
       svg-icon(@click="closeThisWindow", class="close-icon", name="checkmark", width="18", height="18")
       .window-description__header
        .window-description__title Все сделки клиента <span>{{ clientName }}</span>
        .window-description__search-box
          .search
            input.search__input(type="text", placeholder="Введите название сдлеки", v-model="searchString")
            .search__clean(@click="cleanSearch")
                svg-icon(class="svg-icon", name="checkmark", width="18", height="18")
        .window-description__date-filter
       .window-description__trades-list
        .window-description__add-button
          button.button.button--add
            svg-icon(class="btn-icon", name="trades", width="20", height="20")
            |Создать сделку
        .window-description__trades-item(v-for="i in 20")
          tradesRow(:number="i")
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
      clientName: '',
      clientId: '',
      searchString: ''
    }
  },
  mounted () {
    this.$EventBus.$on('callTradesWindow', (data) => {
      this.visible = data.visible
      this.trades = data.trades
      this.clientName = data.clientName
      this.clientId = data.clientId
    })
  },
  methods: {
    closeThisWindow () {
      this.visible = false
    },
    cleanSearch () {
      this.searchString = ''
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/components/window-info.scss"></style>
<style lang="scss" scoped src="@/assets/styles/components/search.scss"></style>
<style lang="scss" scoped src="@/assets/styles/components/buttons.scss"></style>
<style lang="scss" scoped src="@/assets/styles/components/trades-row.scss"></style>
