<template lang="pug">
  .rating
    .rating_search
      Search
    ul.rating__list
      li.rating__item(v-for="(client, index) in clients")
        .rating__position {{ index + 1 }}
        RatingClient(:client="client", :procent="100")
</template>

<script>
import Search from '@/components/pages/search'
import RatingClient from '@/components/pages/rating-client'
export default {
  middleware: ['admin-auth'],
  components: {
    Search,
    RatingClient
  },
  data () {
    return {
      isHint: true,
      textPage: 'На этой странице показан рейтинг всех клиентов, а так-же процент от общей прибыли, которую принес Вам каждый из клиентов.'
    }
  },
  async asyncData ({ store }) {
    const user = store.getters['auth/user']
    const clients = await store.dispatch('client/getAll', user.userId)
    return { clients }
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
  .rating{
    width: 100%;
    align-self: flex-start;
  }
  .rating_search{
    padding-bottom: 20px;
  }
  .rating__list{
    border-left: 2px solid $mainColor;
    border-bottom: 2px solid $mainColor;
    min-height: 90vh;
    padding: 0;
    margin: 0;
  }
  .rating__item{
    margin-bottom: 50px;
    display: flex;
    width:100%;
    align-items: center;
    padding-left: 20px;
  }
  .rating__position{
    color: $mainColor;
    font-family: $mainFont;
    font-size: $h3fontSize;
    font-weight: 700;
  }
  .rating__menu-item--active{
    .button--text{
      color: $mainColor;
      background: transparent;
    }
  }
</style>
