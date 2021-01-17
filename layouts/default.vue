<template lang="pug">
  .app-container
    vuescroll
      transition(name="component-fade",  mode="out-in")
        .preloader(v-if="preloaderVisible")
            .preloader__spinner
              .preloader__animation
      .message(v-if="message.visible", :class="message.class") {{ message.text }}
      h1.app-title Clientbase
        .app-user-menu
          span.app-user-menu__name Привет, {{ user.login }}
          button.button.button--add(@click="logout") Выйти
      .scroll-up.big-desktops-down-hide(@click="scrollTop")
        svg-icon(class="scroll-up__icon" name="arrow-up" width="28" height="32")
      .app-grid
        .app-grid__sidebar(
          :class="{'open': isOpenMenu}"
        )
          .app-grid__mobile-menu-switcher.big-desktops-hide(
            :class="{'active': isOpenMenu}"
            @click="isOpenMenu = !isOpenMenu"
          )
            .app-grid__mobile-menu-row
            .app-grid__mobile-menu-row
            .app-grid__mobile-menu-row
          appMenu
          .app-grid__bottom-sidebar
            button.button.button--add(@click="openClientForm")
              svg-icon(class="btn-icon", name="user-plus", width="20", height="20")
              |Добавить
          .app-grid__bottom-sidebar.app-grid__bottom-sidebar--hint-container
            hintSwitcher(:hint="isHint")
          .app-grid__bottom-sidebar.big-desktops-hide
            .scroll-up-mobile(@click="scrollTop")
              svg-icon(class="scroll-up__icon scroll-up__icon--light" name="arrow-up" width="28" height="32")
        .app-grid__content
          transition(name="list")
            .hint(v-if="isHint") {{ textPage }}
          nuxt
        transition(name="component-fade",  mode="out-in")
          windowDesc
        transition(name="component-fade",  mode="out-in")
          clientForm
        transition(name="component-fade",  mode="out-in")
          archiveAlrt
        transition(name="component-fade",  mode="out-in")
          windowTrades
        transition(name="component-fade",  mode="out-in")
          sleepAlrt
</template>

<script>
import appMenu from '@/components/layout/app-menu'
import windowDesc from '@/components/layout/window-description'
import hintSwitcher from '@/components/layout/hint-switcher'
import clientForm from '@/components/layout/client-form'
import archiveAlrt from '@/components/pages/archive-alert'
import windowTrades from '@/components/layout/window-trades'
import sleepAlrt from '@/components/pages/sleep-alert'
import vuescroll from 'vuescroll'
export default {
  components: {
    appMenu,
    windowDesc,
    hintSwitcher,
    clientForm,
    archiveAlrt,
    windowTrades,
    sleepAlrt,
    vuescroll
  },
  data () {
    return {
      time: 0,
      user: {},
      isHint: true,
      preloaderVisible: false,
      textPage: '',
      isOpenMenu: false,
      message: {
        text: '',
        class: '',
        visible: false
      }
    }
  },
  mounted () {
    this.$EventBus.$on('adminMessage', (data) => {
      this.message.visible = true
      this.message.class = data.class
      this.message.text = data.text
      setTimeout(() => {
        this.message.visible = false
      }, 5000)
    })
    this.$EventBus.$on('showPreloader', (data) => {
      this.preloaderVisible = data.preloaderVisible
    })
    this.setUser()
    this.$EventBus.$on('switchHint', (data) => {
      this.isHint = data.active
    })
  },
  beforeMount () {
    this.$EventBus.$on('changePageText', (data) => {
      this.textPage = data.textPage
    })
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
    setUser () {
      this.user = this.$store.getters['auth/user']
    },
    logout () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login/?message=logout')
    },
    openClientForm () {
      const userId = this.user.userId
      this.$EventBus.$emit('openClientForm', {
        isVisible: true,
        isNew: true,
        title: 'Добавить нового клиента',
        client: {
          status: 'aspirant',
          name: '',
          isActive: true,
          text: '',
          image: '/images/male.jpg',
          userId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/components/buttons.scss"></style>
<style lang="scss" scoped src="@/assets/styles/components/preloader.scss"></style>
<style lang="scss" scoped>
  @import '@/assets/styles/layout/vars.scss';
  @import '@/assets/styles/layout/breakpoints.scss';
  .app-container{
    position: relative;
    height: 100vh;
    overflow: hidden;
    padding-left: 20px;
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
     @include middle-desktops {
       padding-left: 0;
     }
  }
  .app-grid{
    display:grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 20px;
    padding-right: 40px;
    @include middle-desktops {
      position: relative;
    }
    @include all-tablets {
      padding-right: 20px;
    }
  }
  .app-grid__sidebar {
    @include middle-desktops {
      width: 50px;
      height: 100%;
      overflow-x: hidden;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 2;
      background-color: $mainColor;
      transition: width .3s;
      border-right: 1px solid $accentColor;
      .app-grid__bottom-sidebar--hint-container {
        display: none;
      }
      &.open {
        width: 240px;
        .app-grid__bottom-sidebar--hint-container {
          display: block;
        }
      }
    }
  }
  .app-grid__content{
    min-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column-start: 2;
    grid-column-end: 7;
    margin-bottom: 20px;
    @include middle-desktops {
      grid-column-start: 1;
      padding-left: 60px;
    }
 }
 .app-title{
   text-align:left;
   margin-bottom:20px;
   font-family: 'Dancing Script', cursive;
   font-size:70px;
   line-height:1em;
   color:$accentColor;
   margin-right: auto;
   padding-top: 20px;
   @include middle-desktops {
     padding-left: 60px;
   }
   @include all-big-mobiles {
     font-size: 40px;
   }
   @include all-small-mobiles {
     font-size: 50px;
     padding-top: 70px;
     text-align: center;
     padding-left: 0;
   }
 }
 .app-grid__bottom-sidebar{
   margin-top:20px;
   min-width: 240px;
 }
.app-user-menu{
  .button{
    width: 150px;
  }
  position: absolute;
  top:20px;
  right:20px;
  display: flex;
  align-items: center;
}
.app-user-menu__name{
  font-size: 20px;
  margin-right: 10px;
  font-weight: 500;
  font-family: $mainFont;
  @include all-big-mobiles {
    font-size: 10px;
  }
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
.scroll-up-mobile {
  display: flex;
  justify-content: flex-start;
  padding: 0 0 10px 11px;
}
.scroll-up__icon{
  fill:$mainColor;
  transition: all .3s;
  cursor: pointer;
  &:hover{
    fill:$accentColor;
  }
}
.scroll-up__icon--light {
  fill:$accentColor;
}
.message{
  position: fixed;
  top:20px;
  right: 20px;
  display: inline-block;
  padding: 20px;
  max-width: 500px;
  height: auto;
  background-color: #44C21A;
  border-radius:15px;
  box-shadow: 0 0 15px 5px #ffce13;
  font-size: 18px;
  color: #fff;
  font-family: $mainFont;
  z-index: 10000;
  &.m-fail{
      background-color: red;
      box-shadow: 0 0 15px 5px #000;
  }
}
.app-grid__mobile-menu-switcher {
  width: 50px;
  height: 50px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $accentColor;
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid $mainColor;
}
.app-grid__mobile-menu-row {
  height: 2px;
  width: 60%;
  margin: 2px 0;
  background-color: #fff;
  position: relative;
  -webkit-transition: all .5s;
  -o-transition: all .5s;
  transition: all .5s;
}
.app-grid__mobile-menu-switcher.active .app-grid__mobile-menu-row:first-child {
  transform: rotate(-135deg);
  top: 6px;
}
.app-grid__mobile-menu-switcher.active .app-grid__mobile-menu-row:last-child {
  transform: rotate(-225deg);
  top: -6px;
}
.app-grid__mobile-menu-switcher.active .app-grid__mobile-menu-row:nth-child(2) {
  opacity: 0;
}
</style>
