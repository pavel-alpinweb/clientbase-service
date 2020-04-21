<template lang="pug">
  .table
    .table__search
      Search
    .table__item
      .table__heading
          span Новые (0)
          .hint-opener
      .table__content
    .table__item
      .table__heading
          span Новые (0)
          .hint-opener
      .table__content
    .table__item
      .table__heading
          span Новые (0)
          .hint-opener
      .table__content
    .table__item
      .table__heading
          span Новые (0)
          .hint-opener
      .table__content
    .table__item
      .table__heading
          span Новые (0)
          .hint-opener
      .table__content
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
.table{
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  border-radius: 4px;
  transition: all .4s;
}
.table__search{
  grid-column: 1 / 6;
  height:auto;
  padding-bottom: 20px;
  background:#ebebeb;
}
.table__item{
    border:2px solid white;
    border-right: none;
    height: 90vh;
    position: relative;
    &:last-of-type{
        border-right:2px solid white;
    }
}
.table__content{
    height: calc(100% - 3.44rem);
    overflow-y: auto;
    margin-top: 55px;
}
.table__heading {
    background-color: $accentColor;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: $h5fontSize;
    margin-bottom: 20px;
    position: absolute;
    width: 100%;
    color: $mainColor;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
        margin: 0 10px;
    }
}
</style>
