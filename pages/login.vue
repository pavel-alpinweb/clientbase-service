<template lang="pug">
  .login-page(:class="{'open' : isRotate}")
    .login-page__toggle
      .login-page__button(:class="{'login-page__button--active' : !isRotate}" @click="isRotate = false") Вход
      .login-page__button(:class="{'login-page__button--active' : isRotate}" @click="isRotate = true") Регистрация
    .login-page__card
      .login-page__enter.face
        LoginForm
      .login-page__registration.face
        RegistartionForm
</template>

<script>
import LoginForm from '@/components/pages/login-form'
import RegistartionForm from '@/components/pages/registration-form'
export default {
  layout: 'login',
  components: {
    LoginForm,
    RegistartionForm
  },
  data () {
    return {
      isRotate: false
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/layout/vars.scss';
  .login-page{
    -webkit-perspective: 10000;
    perspective: 10000;
    height: 100%;
  }
  .login-page__card{
    width: 100%;
    transform-style: preserve-3d;
    transition: all 0.4s linear;
  }
  @-moz-document url-prefix() {
    .login-page__card{
      backface-visibility: hidden;
    }
  }
  .login-page.open{
    .login-page__card {
      transform: rotateY(180deg);
      box-shadow: -5px 5px 5px #aaa;
    }
  }
  .face {
    position: absolute;
    width: 100%;
    backface-visibility: hidden;
    z-index: 1;
  }
  .face.login-page__registration {
    display: block;
    transform: rotateY(180deg);
  }

  .login-page__toggle{
    display: flex;
  }
  .login-page__button{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    line-height: 60px;
    text-decoration: none;
    color: $white;
    font-size: $h6fontSize;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    background-color: $mainColor;
    transition: all .3s;
    cursor: pointer;
    flex-grow: 1;
    &:hover{
        background-color: $accentColor;
    }
  }
  .login-page__button--active{
    background-color: $accentColor;
  }
</style>
