<template lang="pug">
  .archive
    .hint(v-if="isHint")
      |На этой странице находятся все клиенты, сотрудничество с которыми так или иначе не сложилось. Заметьте в этом приложении вообще нет кнопки "Удалить". Любого потерянного клиента можно вернуть в главную таблицу. Помните, каждый потерянный клиент это потерянная прибыль. Почитайте свои записи, оставленные к потерянному клиенту, посмотрите как развивалось Ваше сотрудничество, на странице "История". Может быть Вам удастся возобновить сотрудничество.
    .archive__search
      Search
</template>

<script>
import Search from '@/components/pages/search'
export default {
  middleware: ['admin-auth'],
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
.archive{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  align-self: flex-start;
  width:100%;
  min-height: 100vh;
  grid-auto-rows: max-content;
}
.archive__search{
  grid-column: 1 / 5;
}
</style>
<style lang="scss" src="@/assets/styles/components/hint.scss"></style>
