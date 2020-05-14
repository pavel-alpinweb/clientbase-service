<template lang="pug">
  .window-archive(v-if="isVisible")
   .window-archive__overlay(@click="closeThisWindow")
   .window-archive__content
    .window-archive__title Добавить этого клиента ({{ client.id }}) в архив?
    .window-archive__subtitle {{ client.name }}
    .window-archive__image(:style="`background-image: url(${client.image});`")
    .window-archive__button-set
        button.window-archive__btn(@click="sendArchiveRequest") да
        button.window-archive__btn.window-archive__btn--close(@click="closeThisWindow") нет
</template>

<script>
export default {
  data () {
    return {
      isVisible: false,
      client: {
        name: 'По умолчанию',
        id: 'По умолчанию 001',
        image: '/images/male.jpg'
      }
    }
  },
  mounted () {
    this.$EventBus.$on('callArchiveAlert', (data) => {
      this.isVisible = data.isVisible
      this.client = data.client
    })
  },
  methods: {
    closeThisWindow () {
      this.isVisible = false
    },
    async sendArchiveRequest () {
      const user = this.$store.getters['auth/user']
      try {
        const clients = await this.$store.dispatch('client/archiveClient', { clientId: this.client.id, userId: user.userId })
        this.$EventBus.$emit('reloadClients', { clients })
        this.isVisible = false
        this.$EventBus.$emit('adminMessage', {
          text: `Ваш клиент ${this.client.name} успешно архивирован`,
          class: '',
          visible: true
        })
      } catch (error) {
        this.$EventBus.$emit('adminMessage', {
          text: error.response.data.message,
          class: 'm-fail',
          visible: true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/layout/vars.scss';
  .window-archive{
      position: fixed;
      width: 100vw;
      height: 100vh;
      z-index: 9000;
      top:0;
      left:0;
      right:0;
      bottom:0;
      display:flex;
  }
  .window-archive__overlay{
      width:100%;
      height: 100%;
      background-color: rgba($mainColor, 0.8);
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
  }
  .window-archive__content{
      width:100%;
      max-width: 768px;
      max-height: 100%;
      overflow:auto;
      border-radius: 4px;
      background-color: $white;
      padding: 35px 40px;
      margin: auto;
      position:relative;
  }

  .close-icon{
      position:absolute;
      top: 20px;
      right: 20px;
      width:20px;
      height:20px;
      cursor:pointer;
      &:hover{
          fill: $accentColor;
      }
  }
  .window-archive__title{
      color: $mainColor;
      font-family: $mainFont;
      font-size: $h2fontSize;
      font-weight: 700;
      line-height: 1.2em;
      text-align:center;
      margin-bottom:20px;
  }
  .window-archive__subtitle{
      color: $mainColor;
      font-family: $mainFont;
      font-size: $h2fontSize;
      font-weight: 700;
      line-height: 1.2em;
      text-align:center;
      margin-bottom:20px;
  }
  .window-archive__image{
      width: 150px;
      height: 150px;
      margin: 0 auto 50px;
      border-radius:50%;
      overflow: hidden;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
  }
  .window-archive__button-set{
      width:60%;
      display:flex;
      margin:0 auto;
      justify-content: space-between;
  }
  .window-archive__btn{
      height: 50px;
      border-radius: 4px;
      background-color: red;
      border: 2px solid red;
      padding:0 50px;
      color: $white;
      font-size: $h6fontSize;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      transition: all .3s;
      &:hover{
          background-color:transparent;
          color: red;
      }
  }
  .window-archive__btn--close{
      background-color: $mainColor;
      border: 2px solid $mainColor;
      &:hover{
          background-color: $accentColor;
          border: 2px solid $accentColor;
          color:white;
      }
  }
</style>
