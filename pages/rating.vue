<template lang="pug">
  .rating
    .rating_search
      Search
    ul.rating__list

</template>

<script>
import Search from '@/components/pages/search'
export default {
  components: {
    Search
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
</style>
