<template lang="pug">
.progress__item
  .progress__procent(v-if="categoryProcent > 0") {{ categoryProcent }}%
  .progress__bar(:style="'height:' +  categoryProcent + '%;'")
    span.progress__value {{ categorySumm }}
  .progress__name {{ categoryName }}
</template>

<script>
import gsap from 'gsap'

export default {
  props: {
    categoryTrades: {
      type: Array,
      required: true
    },
    procent: {
      type: Number,
      required: true
    },
    typeProgress: {
      type: String,
      required: true
    },
    categoryName: {
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
    categorySumm () {
      let summ = 0
      if (this.typeProgress === 'payloads') {
        for (const trade of this.categoryTrades) {
          summ += trade.pay
        }
      } else if (this.typeProgress === 'trades') {
        summ = this.categoryTrades.length
      }
      return summ
    },
    categoryProcent () {
      let procent = 0
      procent = (this.categorySumm / this.tweenedNumber).toFixed(2)
      if (isNaN(procent)) {
        return 0
      } else {
        return procent
      }
    }
  },
  watch: {
    procent (newValue) {
      gsap.to(this.$data, { duration: 1, tweenedNumber: newValue, ease: 'power4.out', immediateRender: false })
    }
  },
  mounted () {
    gsap.to(this.$data, { duration: 1, tweenedNumber: this.procent, ease: 'power4.out', immediateRender: false })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/layout/vars.scss';
  .progress__item{
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-bottom: -24px;
  }
  .progress__bar{
      background-color: $accentColor;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      color: $mainColor;
      font-family: $mainFont;
      font-size: $h3fontSize;
      font-weight: 700;
      padding-bottom: 5px;
      width: 100%;
  }
  .progress__name{
      width: 100%;
      text-align: center;
      color: $mainColor;
      font-family: $mainFont;
      font-size: $h6fontSize;
      font-weight: 700;
      position: relative;
      top: 25px;
  }
  .progress__procent{
      width: 100%;
      text-align: center;
      font-size: $h5fontSize;
      font-weight: 700;
  }
  .progress__value{
    position: relative;
    top: 35px;
  }
</style>
