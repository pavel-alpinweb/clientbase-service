<template lang="pug">
  .app-container
    h1.app-title Clientbase
    .app-grid
      .app-grid__sidebar
      .app-grid__content
        nuxt
</template>

<style lang="scss" scoped>
  @import '@/assets/styles/layout/vars.scss';
  .app-container{
    position: relative;
  }
  .app-grid{
    display:grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 20px;
  }
  .app-grid__content{
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column-start: 2;
    grid-column-end: 7;
    margin-bottom: 20px;
 }
 .app-title{
   text-align:center;
   margin-bottom:20px;
   font-family: 'Dancing Script', cursive;
   font-size:80px;
   line-height:1em;
   color:$accentColor;
 }
 .app-grid__bottom-sidebar{
   margin-top:20px;
 }
</style>
