<template lang="pug">
.rating-client(:class="{'active' : client.status !== 'archive', 'dark' : client.status === 'archive'}")
    .rating-client__info
        .rating-client__id {{ client.id }}
        .rating-client__name
          |{{ client.name }}
          .rating-client__id(v-if="client.status === 'aspirant'") Новый
          .rating-client__id(v-if="client.status === 'sleep'") Спящий
          .rating-client__id(v-if="client.status === 'open'") Открытый
          .rating-client__id(v-if="client.status === 'repeat'") Постоянный
          .rating-client__id(v-if="client.status === 'vip'") V.I.P.
          .rating-client__id(v-if="client.status === 'archive'") Архивный
        .rating-client__avatar(:style="'background-image: url(' + client.image + ');'")
        .rating-client__payouts(v-if="typeRating === 'payloads'") {{ allClientMoney }}
        .rating-client__payouts(v-else="typeRating === 'trades'") {{ client.trades.length }}
    .rating-client__procent-line
        .rating-client__progress(:style="'width:' + clientProcent + '%;'")
        .rating-client__procents {{ clientProcent }}%
</template>

<script>
import gsap from 'gsap'

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
  data () {
    return {
      tweenedNumber: 0
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
        result = (this.allClientMoney / this.tweenedNumber).toFixed(2)
      } else if (this.typeRating === 'trades') {
        result = (this.client.trades.length / this.tweenedNumber).toFixed(2)
      }
      if (isNaN(result)) {
        return 0
      } else {
        return result
      }
    }
  },
  watch: {
    procent (newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue, ease: 'power4.out' })
    }
  },
  mounted () {
    gsap.to(this.$data, { duration: 0.5, tweenedNumber: this.procent, ease: 'power4.out' })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/layout/vars.scss';
  @import '@/assets/styles/layout/breakpoints.scss';
  .rating-client{
      display:flex;
      align-items: center;
      width:100%;
      &.active{
          .rating-client__progress{
              background-color: $accentColor;
              height: 100px;
              @include all-tablets {
                height: 50px;
              }
          }
      }
      &.dark{
          .rating-client__progress{
              background-color: $mainColor;
              height: 100px;
              @include all-tablets {
                height: 50px;
              }
          }
      }
  }
  .rating-client__info{
      width: 150px;
      text-align: center;
      margin-right: 20px;
      margin-left: 20px;
      @include all-tablets {
        width: 120px;
        margin: 0 10px;
      }
      @include all-small-mobiles {
        margin: 0;
        width: 100px;
      }
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
      @include all-tablets {
        width: 120px;
        height: 120px;
      }
      @include all-small-mobiles {
        width: 60px;
        height: 60px;
      }
  }
  .rating-client__id{
      width: 100%;
      text-align: center;
      font-family: $mainFont;
      font-size: 12px;
      font-weight: 400;
      @include all-tablets {
        font-size: 10px;
        line-height: 0.75em;
      }
  }
  .rating-client__name{
      font-size: $h3fontSize;
      font-weight: 700;
      margin-bottom: 20px;
      text-align: center;
      @include all-tablets {
        font-size: $h6fontSize;
        margin-bottom: 10px;
      }
  }
  .rating-client__payouts{
      font-size: 26px;
      font-weight: bold;
      color: $accentColor;
      text-align: center;
      @include all-small-mobiles {
        font-size: $h6fontSize;
      }
  }
  .rating-client__procents{
      text-align: center;
      font-size: $h5fontSize;
      font-weight: 700;
      margin-left: 20px;
      @include all-small-mobiles {
        font-size: $h6fontSize;
      }
  }
</style>
