<template lang="pug">
  .app-container
    h1.app-title Clientbase
      .app-user-menu
        button.button.button--add(@click="logout") Выйти
    .scroll-up(@click="scrollTop")
      svg-icon(class="scroll-up__icon" name="arrow-up" width="28" height="32")
    .app-grid
      .app-grid__sidebar
        appMenu
        .app-grid__bottom-sidebar
          hintSwitcher(:hint="isHint")
      .app-grid__content
        nuxt
      transition(name="component-fade",  mode="out-in")
        windowDesc
</template>

<script>
import appMenu from '@/components/layout/app-menu'
import windowDesc from '@/components/layout/window-description'
import hintSwitcher from '@/components/layout/hint-switcher'
export default {
  components: {
    appMenu,
    windowDesc,
    hintSwitcher
  },
  data () {
    return {
      time: 0
    }
  },
  methods: {
    scrollTop () {
      const top = Math.max(document.body.scrollTop, document.documentElement.scrollTop)
      if (top > 0) {
        window.scrollTo(0, Math.floor(top / 1.1))
        this.time = setTimeout(this.scrollTop, 15)
      } else {
        clearTimeout(this.time)
      }
      return false
    },
    logout () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login/?message=logout')
    }
  }
}
</script>

<style lang="scss" src="@/assets/styles/components/buttons.scss"></style>
<style lang="scss" scoped>
  @import '@/assets/styles/layout/vars.scss';
  .app-container{
    position: relative;
    padding: 20px;
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
.app-user-menu{
  width: 150px;
  position: absolute;
  top:20px;
  right:20px;
}
.scroll-up{
   position: fixed;
   bottom:50px;
   left: 50px;
   font-size: 32px;
   cursor: pointer;
   transition: all .3s;
   z-index: 9999;
}
.scroll-up__icon{
  fill:$mainColor;
  transition: all .3s;
  cursor: pointer;
  &:hover{
    fill:$accentColor;
  }
}
</style>
