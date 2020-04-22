<template lang="pug">
  .progress
    .hint(v-if="isHint")
      |На этой странице показана общая статистика за все время использования этого приложения.
      |Здесь вы можете узнать, сколько клиентов попадало в каждую из категрий.
      |Чтобы узнать подобно, о том кто эти клиенты, зайдите на страницу "Списки"
    .progress__graffics
</template>

<script>
export default {
  data () {
    return {
      isHint: true
    }
  },
  mounted () {
    this.$EventBus.$on('switchHint', (data) => {
      this.isHint = data.active
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/layout/vars.scss';
  .progress{
      width: 100%;
      height: auto;
      position: relative;
       .preloader__spinner{
          display: none;
      }
  }

  .progress__graffics{
      border-left: 2px solid $mainColor;
      border-bottom: 2px solid $mainColor;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 150px;
      margin-bottom:20px;
      min-height: 85vh;
  }
</style>
