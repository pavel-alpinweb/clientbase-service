<template lang="pug">
.rating-client(:class="{'active' : client.status !== 'archive', 'dark' : client.status === 'archive'}")
    .rating-client__info
        .rating-client__id {{ client.id }}
        .rating-client__name {{ client.name }}
        .rating-client__avatar(:style="'background-image: url(' + client.image + ');'")
        .rating-client__payouts(v-if="typeRating === 'payloads'") {{ allClientMoney }}
        .rating-client__payouts(v-else="typeRating === 'trades'") {{ client.trades.length }}
    .rating-client__procent-line
        .rating-client__progress(:style="'width:' + clientProcent + '%;'")
        .rating-client__procents {{ clientProcent }}%
</template>

<script>
export default {
  props: {
    client: {
      type: Object,
      required: true
    },
    procent: {
      type: Number,
      required: true
    },
    typeRating: {
      type: String,
      required: true
    }
  },
  computed: {
    allClientMoney () {
      let allClientMoney = 0
      for (const trade of this.client.trades) {
        allClientMoney += trade.pay
      }
      return allClientMoney
    },
    clientProcent () {
      let result = 0
      if (this.typeRating === 'payloads') {
        result = (this.allClientMoney / this.procent).toFixed(2)
      } else if (this.typeRating === 'trades') {
        result = (this.client.trades.length / this.procent).toFixed(2)
      }
      if (isNaN(result)) {
        return 0
      } else {
        return result
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '@/assets/styles/layout/vars.scss';
    .rating-client{
        display:flex;
        align-items: center;
        width:100%;
        &.active{
            .rating-client__progress{
                background-color: $accentColor;
                height: 100px;
            }
        }
        &.dark{
            .rating-client__progress{
                background-color: $mainColor;
                height: 100px;
            }
        }
    }
    .rating-client__info{
        width: 150px;
        text-align: center;
        margin-right: 20px;
        margin-left: 20px;
    }
    .rating-client__procent-line{
        width: 85%;
        display: flex;
        align-items: center;
    }
    .rating-client__avatar{
        margin: 0 auto;
        width: 150px;
        height: 150px;
        border-radius:50%;
        overflow: hidden;
        margin-bottom: 20px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .rating-client__id{
        width: 100%;
        text-align: center;
        font-family: $mainFont;
        font-size: 12px;
        font-weight: 400;
    }
    .rating-client__name{
        font-size: $h3fontSize;
        font-weight: 700;
        margin-bottom: 20px;
        text-align: center;
    }
    .rating-client__payouts{
        font-size: 26px;
        font-weight: bold;
        color: $accentColor;
        text-align: center;
    }
    .rating-client__procents{
        text-align: center;
        font-size: $h5fontSize;
        font-weight: 700;
        margin-left: 20px;
    }
</style>
