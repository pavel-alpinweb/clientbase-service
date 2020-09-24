<template lang="pug">
  .progress
    .progress__graffics
      pre {{ trades }}
</template>

<script>
export default {
  middleware: ['admin-auth'],
  data () {
    return {
      isHint: true,
      textPage:
      `На этой странице показана общая статистика за все время использования этого приложения. 
      Здесь вы можете узнать, сколько клиентов попадало в каждую из категорий. 
      Чтобы узнать подобно, о том кто эти клиенты, зайдите на страницу "Списки"`
    }
  },
  async asyncData ({ store }) {
    const user = store.getters['auth/user']
    const trades = await store.dispatch('trade/getAll', user.userId)
    return { trades }
  },
  mounted () {
    this.$EventBus.$on('switchHint', (data) => {
      this.isHint = data.active
    })
    this.$EventBus.$emit('changePageText', { textPage: this.textPage })
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
