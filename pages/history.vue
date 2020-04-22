<template lang="pug">
  .history
    .hint(v-if="isHint")
        |На этой странице показана вся история сотрудничества со всеми клиентами.
        |Введите в поиск имя или id клиента, чтобы увидеть историю сотрудничества только с данным клиентом.
        |Важный совет. Прежде чем перемещать клиента из одной категории в другую, оставляйте запись почему вы это сделали и не забывайте сохранить.
        |Это поможет, Вам увидеть точную ретроспективу Вашего сотрудничества.
    .history__search
      Search
</template>

<script>
import Search from '@/components/pages/search'
export default {
  components: {
    Search
  },
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

<style lang="scss">
.history{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  align-self: flex-start;
  width:100%;
  min-height: 100vh;
  grid-auto-rows: max-content;
}
.history__search{
  grid-column: 1 / 5;
}
</style>
