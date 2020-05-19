<template lang="pug">
  .trades-row
    .trades-row__cell
      .trades-row__cell-title Название
      .trades-row__cell-value
        span {{ number + 1 }}
        input.trades-row__input(type="text", placeholder="Введите название сделки", v-model="trade.title")
    .trades-row__cell
      .trades-row__cell-title Дата
      .trades-row__cell-value
        input.trades-row__input(type="date", placeholder="Введите дату сделки", v-model="trade.date")
    .trades-row__cell
      .trades-row__cell-title Сумма
      .trades-row__cell-value
        input.trades-row__input(type="number", placeholder="Введите дату сделки", min="0", , v-model="trade.pay")
    .trades-row__cell
    .trades-row__cell-title Действия
      .trades-row__cell-value
        button.trades-row__button.trades-row__button--save(@click="saveTrade")
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
  methods: {
    deleteTrade () {
      if (!this.trade.isNew) {
        this.$EventBus.$emit('deleteNewTrade', {
          index: this.number
        })
      }
    },
    saveTrade () {
      const valide = this.trade.title !== '' && this.trade.date !== '' && this.trade.pay !== ''

      if (valide) {
        console.log('Поехали!')
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
