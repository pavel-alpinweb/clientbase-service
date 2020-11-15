<template lang="pug">
  .trades-row(:class="`trades-row__cell--${lastChangedTradeType}`")
    .trades-row__cell
      .trades-row__cell-title Название
      .trades-row__cell-value
        span(v-if="!lastChangedTradeType") {{ number + 1 }}
        input.trades-row__input(:disabled="hasClientPropertyChange || actualClientStatus == 'archive'", type="text", placeholder="Введите название сделки", v-model="currentTrade.title", @input="isSave = false")
    .trades-row__cell
      .trades-row__cell-title Дата
      .trades-row__cell-value
        input.trades-row__input(:disabled="hasClientPropertyChange || actualClientStatus == 'archive'", type="date", placeholder="Введите дату сделки", v-model="currentTrade.date", @input="isSave = false")
    .trades-row__cell
      .trades-row__cell-title Сумма
      .trades-row__cell-value
        input.trades-row__input(:disabled="hasClientPropertyChange || actualClientStatus == 'archive'", type="number", placeholder="Введите дату сделки", min="0", v-model="currentTrade.pay", @input="isSave = false")
    .trades-row__cell(v-if="actualClientStatus !== 'archive' && !hasClientPropertyChange")
      .trades-row__cell-title Действия
      .trades-row__cell-value
        button.trades-row__button.trades-row__button--save(@click="saveTrade" :class="{'desabled' : currentTrade.isNewTrade || !isSave}")
          svg-icon(class="trades-row__option-icon", name="save", width="20", height="20")
        button.trades-row__button.trades-row__button--delete(@click="deleteTrade")
            svg-icon(class="trades-row__option-icon", name="trash", width="20", height="20")
    .trades-row__cell.trades-row__cell--center(v-if="lastChangedTradeType")
      .trades-row__cell-title.trades-row__cell-title--center Действие
      .trades-row__cell-value
        button(v-if="lastChangedTradeType === 'plus'").trades-row__button.trades-row__button--plus
          svg-icon(class="trades-row__option-icon", name="plus", width="20", height="20")
        button(v-if="lastChangedTradeType === 'edit'").trades-row__button.trades-row__button--save.trades-row__button--no-hover
          svg-icon(class="trades-row__option-icon", name="pencil", width="20", height="20")
        button(v-if="lastChangedTradeType === 'trash'").trades-row__button.trades-row__button--delete.trades-row__button--no-hover
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
    },
    actualClientStatus: {
      type: String,
      required: true
    },
    hasClientPropertyChange: {
      type: Boolean,
      required: true
    },
    lastChangedTradeType: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      isSave: true
    }
  },
  computed: {
    currentTrade: {
      get () {
        return this.$props.trade
      }
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
          const req = await this.$store.dispatch('trade/removeTrade', { clientId: this.trade.clientId, tradeId: this.trade._id })
          this.$EventBus.$emit('deleteTrade', {
            index: this.number,
            client: req.client
          })
          this.$EventBus.$emit('adminMessage', {
            text: req.message,
            class: '',
            visible: true
          })
          this.$EventBus.$emit('updateClient', { client: req.client })
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
      const valide = this.trade.title !== '' && this.trade.date !== '' && this.trade.pay > 0
      if (valide) {
        try {
          let req = null
          if (this.trade.isNewTrade) {
            req = await this.$store.dispatch('trade/createTrade', this.trade)
          } else {
            req = await this.$store.dispatch('trade/updateTrade', this.trade)
          }
          this.isSave = true
          this.$EventBus.$emit('updateTrade', { trade: req.trade, client: req.client, index: this.number })
          this.$EventBus.$emit('adminMessage', {
            text: req.message,
            class: '',
            visible: true
          })
          this.$EventBus.$emit('updateClient', { client: req.client })
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
