<template lang="pug">
  .client-card(id="client01", :class="{'client-card--dark' :  !client.isActive}")
    .client-card__id id: client01
    .client-card__avatar(:style="`background-image: url('${client.image}');`")
    .client-card__name {{ client.name }}
    .client-card__charact
        .client-card__title Последняя активность:
        .client-card__date {{ client.date | date() }}
    .client-card__control-item
      .client-card__menu
        .client-card__menu-item
          button.client-card__button.client-card__button--trades(@click="openWindowTrades")
            svg-icon(class="client-card__option-icon", name="trades", width="20", height="20")
          .client-card__menu-tooltipe Сделки
        .client-card__menu-item
          button.client-card__button.client-card__button--edit(@click="openClientForm")
            svg-icon(class="client-card__option-icon", name="edit", width="20", height="20")
          .client-card__menu-tooltipe Редактировать
        .client-card__menu-item
          button.client-card__button.client-card__button--text
            svg-icon(class="client-card__option-icon", name="text", width="20", height="20")
          .client-card__menu-tooltipe Описание
        .client-card__menu-item
          button.client-card__button.client-card__button--chart
            svg-icon(class="client-card__option-icon", name="chart", width="20", height="20")
          .client-card__menu-tooltipe Статистика
    button.button.button--archive(@click="openArchiveAlert", v-if="client.isActive")
      svg-icon(class="btn-icon", name="archive", width="20", height="20")
      |В архив
    button.button.button--wait(@click="openSleepAlert", v-else="client.isActive")
      svg-icon(class="btn-icon", name="wait", width="20", height="20")
      |Ожидает действия
</template>

<style lang="scss" scoped src="@/assets/styles/components/buttons.scss"></style>
<style lang="scss" scoped src="@/assets/styles/components/client-card.scss"></style>

<script>
export default {
  props: {
    client: {
      type: Object,
      required: true
    }
  },
  mounted () {
    const now = new Date()
    const clientDate = new Date(this.client.date)
    const daysLag = Math.ceil(Math.abs(now.getTime() - clientDate.getTime()) / (1000 * 3600 * 24))
    if (daysLag > 0 && this.client.status !== 'sleep') {
      this.client.isActive = false
    }
  },
  methods: {
    openClientForm () {
      this.$EventBus.$emit('openClientForm', {
        isVisible: true,
        title: 'Редактировать клиента',
        client: this.client,
        isNew: false
      })
    },
    openArchiveAlert () {
      this.$EventBus.$emit('callArchiveAlert', {
        isVisible: true,
        client: {
          name: this.client.name,
          id: this.client._id,
          image: this.client.image
        }
      })
    },
    openSleepAlert () {
      this.$EventBus.$emit('callSleepAlert', {
        isVisible: true,
        client: {
          name: this.client.name,
          id: this.client._id,
          image: this.client.image
        }
      })
    },
    openWindowTrades () {
      this.$EventBus.$emit('callTradesWindow', {
        visible: true,
        trades: this.client.trades,
        client: {
          name: this.client.name,
          id: this.client._id,
          clientImage: this.client.image
        }
      })
    }
  }
}
</script>
