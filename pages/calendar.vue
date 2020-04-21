<template lang="pug">
  .table
    .table__search
      Search
</template>

<script>
import Search from '@/components/pages/search'
export default {
  components: {
    Search
  }
}
</script>

<style lang="scss"  scoped>
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
</style>
