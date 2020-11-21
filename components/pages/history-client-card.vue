<template lang="pug">
  .client-card.client-card--history(:class="{'client-card--dark' : client.status === 'archive' || client.status === 'sleep'}")
    .client-card__id id: {{ client.id }}
    .client-card__avatar(:style="`background-image: url('${client.image}');`")
    .client-card__name
      |{{ client.name }}
      .client-card__sub-title(v-if="client.status === 'aspirant'") Новый
      .client-card__sub-title(v-if="client.status === 'sleep'") Спящий
      .client-card__sub-title(v-if="client.status === 'open'") Открытый
      .client-card__sub-title(v-if="client.status === 'repeat'") Постоянный
      .client-card__sub-title(v-if="client.status === 'vip'") V.I.P.
      .client-card__sub-title(v-if="client.status === 'archive'") Архивный
    .client-card__charact
        .client-card__title Последняя активность:
        .client-card__sub-title {{ client.change }}
        .client-card__date {{ client.date | date() }}
    .client-card__control-item
      .client-card__menu
        .client-card__menu-item
          button.client-card__button.client-card__button--trades(@click="openWindowTrades")
            svg-icon(class="client-card__option-icon", name="trades", width="20", height="20")
          .client-card__menu-tooltipe.client-card__menu-tooltipe--center Сделки
        .client-card__menu-item(@click="toggleDescWindow(client.text)")
          button.client-card__button.client-card__button--text
            svg-icon(class="client-card__option-icon", name="text", width="20", height="20")
          .client-card__menu-tooltipe Описание
</template>

<style lang="scss" scoped src="@/assets/styles/components/buttons.scss"></style>
<style lang="scss" scoped src="@/assets/styles/components/client-card.scss"></style>

<script>
export default {
  props: {
    client: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    openWindowTrades () {
      const client = {
        name: this.client.name,
        id: this.client.id,
        _id: this.client._id,
        clientImage: this.client.image,
        status: this.client.status,
        change: this.client.change
      }
      if (this.client.lastChangedTrade) {
        client.lastChangedTrade = this.client.lastChangedTrade
      }
      this.$EventBus.$emit('callTradesWindow', {
        visible: true,
        trades: this.client.trades,
        client
      })
    },
    toggleDescWindow (text) {
      this.$EventBus.$emit('callDescWindow', { visible: true, text })
    }
  }
}
</script>
