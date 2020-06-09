<template lang="pug">
  .window-sleep(v-if="isVisible")
   .window-sleep__overlay(@click="closeThisWindow")
   .window-sleep__content
    svg-icon(@click="isVisible = false", class="close-icon", name="checkmark", width="18", height="18")
    .window-sleep__title Клиент {{ client.name }} не активен свыше 30-ти дней
    .window-sleep__subtitle Выбирите в какую категорию поместить клиента
    .window-sleep__image(:style="`background-image: url(${client.image});`")
    .window-sleep__button-set
      button.window-sleep__btn(@click="sendArchiveRequest")
        svg-icon(class="btn-icon", name="archive", width="20", height="20")
        |В архив
      button.window-sleep__btn.window-sleep__btn--sleep(@click="sendSleepRequest")
        svg-icon(class="btn-icon", name="user-clock", width="20", height="20")
        |В спящие
</template>

<script>
export default {
  data () {
    return {
      isVisible: false,
      client: {
        name: 'По умолчанию',
        id: 'По умолчанию 001',
        _id: '',
        image: '/images/male.jpg'
      }
    }
  },
  mounted () {
    this.$EventBus.$on('callSleepAlert', (data) => {
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
        const req = await this.$store.dispatch('client/archiveClient', { clientId: this.client._id, userId: user.userId })
        this.$EventBus.$emit('updateClient', { client: req.client })
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
    },
    async sendSleepRequest () {
      const user = this.$store.getters['auth/user']
      try {
        const req = await this.$store.dispatch('client/sleepClient', { clientId: this.client.id, userId: user.userId })
        this.$EventBus.$emit('updateClient', { client: req.client })
        this.isVisible = false
        this.$EventBus.$emit('adminMessage', {
          text: `Ваш клиент ${this.client.name} перенесен в список спящих клиентов`,
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
  .window-sleep{
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
  .window-sleep__overlay{
      width:100%;
      height: 100%;
      background-color: rgba($mainColor, 0.8);
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
  }
  .window-sleep__content{
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
  .window-sleep__title{
      color: $mainColor;
      font-family: $mainFont;
      font-size: $h2fontSize;
      font-weight: 700;
      line-height: 1.2em;
      text-align:center;
      margin-bottom:20px;
  }
  .window-sleep__subtitle{
      color: $mainColor;
      font-family: $mainFont;
      font-size: $h5fontSize;
      font-weight: 700;
      line-height: 1.2em;
      text-align:center;
      margin-bottom:20px;
  }
  .window-sleep__image{
      width: 150px;
      height: 150px;
      margin: 0 auto 50px;
      border-radius:50%;
      overflow: hidden;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
  }
  .window-sleep__button-set{
      width:75%;
      display:flex;
      margin:0 auto;
      justify-content: space-between;
  }
  .window-sleep__btn{
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
      display: flex;
      align-items: center;
      .btn-icon{
        margin-right: 10px;
        fill: white;
        transition: fill .3s;
      }
      &:hover{
          background-color:transparent;
          color: red;
          .btn-icon{
            fill: red;
          }
      }
  }
  .close-icon{
    position: absolute;
    top: 20px;
    right: 20px;
    fill: $mainColor;
    cursor: pointer;
    &:hover{
        fill: $accentColor;
    }
  }
  .window-sleep__btn--sleep{
      background-color: $accentColor;
      border: 2px solid $accentColor;
      color: $mainColor;
      .btn-icon{
        fill: $mainColor;
      }
      &:hover{
        background-color: transparent;
        border: 2px solid $accentColor;
        color:$accentColor;
        .btn-icon{
          fill: $accentColor;
        }
      }
  }
</style>
