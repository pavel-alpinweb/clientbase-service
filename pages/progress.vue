<template lang="pug">
  .progress
    .progress__graffics
</template>

<script>
export default {}
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
