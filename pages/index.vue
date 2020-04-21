<template lang="pug">
  .table
    .table__search
      Search
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="user-plus", width="20", height="20")
          span Новые (0)
          .hint-opener
      .table__content
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="user-clock", width="20", height="20")
          span Спящие (0)
          .hint-opener
      .table__content
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="user-check", width="20", height="20")
          span Открытые (0)
          .hint-opener
      .table__content
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="handshake", width="20", height="20")
          span Постоянные (0)
          .hint-opener
      .table__content
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="gem", width="20", height="20")
          span V.I.P. (0)
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

<style lang="scss" src="@/assets/styles/components/table.scss"></style>
