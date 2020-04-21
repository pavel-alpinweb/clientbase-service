<template lang="pug">
  .history
    .history__search
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
