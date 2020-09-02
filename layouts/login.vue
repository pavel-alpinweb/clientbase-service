<template lang="pug">
    .login-layout
        h1.app-title Clientbase
        .login-container
            nuxt
</template>

<style lang="scss" scoped>
 @import '@/assets/styles/layout/vars.scss';
 .login-layout{
     display: flex;
 }
 .app-title{
   text-align:center;
   margin-bottom:20px;
   font-family: 'Dancing Script', cursive;
   font-size:80px;
   line-height:1em;
   color:$accentColor;
   position: absolute;
   width: 100%;
   top:0;
   right: 0;
   left: 0;
   z-index: 2;
 }
 .login-layout{
     width: 100vw;
     min-height: 100vh;
     background: url('/images/login-bg.jpg') no-repeat center;
     background-size: cover;
     position: absolute;
     &:after{
         content: '';
         display: block;
         position: absolute;
         top:0;
         left: 0;
         right: 0;
         bottom: 0;
         background-color: rgba(0,0,0,.1);
         z-index: 1;
     }
 }
 .login-container{
     margin: auto;
     position: relative;
     width: 500px;
     min-height: 410px;
     z-index: 2;
 }
</style>
