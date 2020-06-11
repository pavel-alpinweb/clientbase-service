<template lang="pug">
  .client-card(id="client01", :class="{'client-card--dark' :  !client.isActive || client.status === 'archive'}")
    .client-card__id id: {{ client.id }}
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
    button.button.button--archive(@click="openArchiveAlert(client.status)", v-if="client.isActive  && client.status !== 'archive'")
      svg-icon(class="btn-icon", name="archive", width="20", height="20")
      |В архив
    button.button.button--wait(@click="openSleepAlert", v-if="!client.isActive && client.status !== 'archive'")
      svg-icon(class="btn-icon", name="wait", width="20", height="20")
      |Ожидает действий...
    button.button.button--wait(@click="openArchiveAlert(client.status)", v-if="client.status === 'archive'")
      svg-icon(class="btn-icon", name="user-check", width="20", height="20")
      |Возобновить
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
  mounted () {
    const now = new Date()
    const clientDate = new Date(this.client.date)
    const daysLag = Math.ceil(Math.abs(now.getTime() - clientDate.getTime()) / (1000 * 3600 * 24))
    if (daysLag > 30 && this.client.status !== 'sleep') {
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
          id: this.client.id,
          _id: this.client._id,
          image: this.client.image,
          status: this.client.status
        },
        index: this.index
      })
    },
    openSleepAlert () {
      this.$EventBus.$emit('callSleepAlert', {
        isVisible: true,
        client: {
          name: this.client.name,
          id: this.client.id,
          image: this.client.image,
          _id: this.client._id
        }
      })
    },
    openWindowTrades () {
      this.$EventBus.$emit('callTradesWindow', {
        visible: true,
        trades: this.client.trades,
        client: {
          name: this.client.name,
          id: this.client.id,
          _id: this.client._id,
          clientImage: this.client.image,
          status: this.client.status
        }
      })
    }
  }
}
</script>
