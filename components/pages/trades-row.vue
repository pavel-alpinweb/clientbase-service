<template lang="pug">
  .trades-row
    .trades-row__cell
      .trades-row__cell-title Название
      .trades-row__cell-value
        span {{ number + 1 }}
        input.trades-row__input(type="text", placeholder="Введите название сделки", v-model="trade.title", @input="isSave = false")
    .trades-row__cell
      .trades-row__cell-title Дата
      .trades-row__cell-value
        input.trades-row__input(type="date", placeholder="Введите дату сделки", v-model="trade.date", @input="isSave = false")
    .trades-row__cell
      .trades-row__cell-title Сумма
      .trades-row__cell-value
        input.trades-row__input(type="number", placeholder="Введите дату сделки", min="0", v-model="trade.pay", @input="isSave = false")
    .trades-row__cell
    .trades-row__cell-title Действия
      .trades-row__cell-value
        button.trades-row__button.trades-row__button--save(@click="saveTrade" :class="{'desabled' : trade.isNewTrade || !isSave}")
          svg-icon(class="trades-row__option-icon", name="save", width="20", height="20")
        button.trades-row__button.trades-row__button--delete(@click="deleteTrade")
            svg-icon(class="trades-row__option-icon", name="trash", width="20", height="20")
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      required: true
    },
    trade: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isSave: true
    }
  },
  methods: {
    async deleteTrade () {
      if (this.trade.isNewTrade) {
        this.$EventBus.$emit('deleteTrade', {
          index: this.number
        })
      } else {
        try {
          const req = await this.$store.dispatch('trade/removeTrade', this.trade._id)
          this.$EventBus.$emit('deleteTrade', {
            index: this.number
          })
          this.$EventBus.$emit('adminMessage', {
            text: req.message,
            class: '',
            visible: true
          })
        } catch (error) {
          this.$EventBus.$emit('adminMessage', {
            text: error.response.data.message,
            class: 'm-fail',
            visible: true
          })
        }
      }
    },
    async saveTrade () {
      const valide = this.trade.title !== '' && this.trade.date !== '' && this.trade.pay !== ''
      const succesString = this.trade.isNewTrade ? 'Новая сделка успешно добавлена' : 'Сделка успешно обновлена'
      if (valide) {
        try {
          let trade = null
          if (this.trade.isNewTrade) {
            trade = await this.$store.dispatch('trade/createTrade', this.trade)
          } else {
            trade = await this.$store.dispatch('trade/updateTrade', this.trade)
          }
          this.trade = trade
          this.isSave = true
          this.$EventBus.$emit('updateTrade', { trade, index: this.number })
          this.$EventBus.$emit('adminMessage', {
            text: succesString,
            class: '',
            visible: true
          })
        } catch (error) {
          this.$EventBus.$emit('adminMessage', {
            text: error.response.data.message,
            class: 'm-fail',
            visible: true
          })
        }
      } else {
        this.$EventBus.$emit('adminMessage', {
          text: 'Необходимо заполнить все поля',
          class: 'm-fail',
          visible: true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/components/trades-row.scss"></style>
