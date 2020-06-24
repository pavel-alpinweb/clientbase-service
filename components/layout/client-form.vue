<template lang="pug">
    .client-form(v-if="isVisible")
       .client-form__overlay(@click="isVisible = false")
       .client-form__content
          svg-icon(@click="isVisible = false", class="close-icon", name="checkmark", width="18", height="18")
          form.client-form__sending-form(@submit.prevent="onSubmit")
            .client-form__item
                legend.client-form__title {{ title }}
            .client-form__item
                .client-form__image(:style="'background-image: url(' + client.image + ');'")
            .client-form__item
                input.client-form__input#inputFile.hide(type="file", @change="selectFile")
                label(for="inputFile").client-form__submit Задать фото
            .client-form__item
                label.client-form__label Имя
                input.client-form__input(type="text", placeholder="Имя", v-model="client.name")
            .client-form__item
                label.client-form__label Описание
                .quill-editor(v-quill:portfolioQuillEditor="editorOptions", v-model="client.text")
            button.client-form__submit Сохранить
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  data () {
    return {
      isVisible: false,
      title: 'Добавить нового клиента',
      isNew: true,
      client: {},
      editorOptions: {
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }]
          ]
        },
        placeholder: 'Любая полезная информация о клиенете...',
        theme: 'snow'
      }
    }
  },
  mounted () {
    this.$EventBus.$on('openClientForm', (data) => {
      this.isVisible = data.isVisible
      this.title = data.title
      this.client = data.client
      this.isNew = data.isNew
    })
  },
  methods: {
    async onSubmit (e) {
      if (this.client.name.length === 0) {
        this.$EventBus.$emit('adminMessage', {
          text: 'Необходимо заполнить поле "Имя" для нового клиента',
          class: 'm-fail',
          visible: true
        })
      } else {
        const client = {}
        for (const key in this.client) {
          if (this.client.hasOwnProperty(key) && key !== 'trades') {
            client[key] = this.client[key]
          }
        }
        try {
          let req = null
          if (this.isNew) {
            req = await this.$store.dispatch('client/createClient', client)
            this.$EventBus.$emit('createClient', { client: req.client })
          } else {
            req = await this.$store.dispatch('client/updateClient', client)
            this.$EventBus.$emit('updateClient', { client: req.client })
          }

          this.isVisible = false
          this.$EventBus.$emit('adminMessage', {
            text: this.isNew ? 'Новый клиент успешно создан' : `Ваш клиент ${this.client.name} успешно обновлен`,
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
    },
    selectFile (e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      const client = this.client
      const EventBus = this.$EventBus
      reader.onload = function () {
        const isValidType = (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')
        const isValidSize = file.size / 1024 / 1024 < 2
        if (isValidType && isValidSize) {
          client.image = reader.result
          client.file = file
        } else if (!isValidType) {
          document.getElementById('inputFile').value = ''
          EventBus.$emit('adminMessage', {
            text: 'Можно загружать только изображения форматов: png, jpeg, jpg',
            class: 'm-fail',
            visible: true
          })
        } else if (!isValidSize) {
          document.getElementById('inputFile').value = ''
          EventBus.$emit('adminMessage', {
            text: 'Файл не должен привышать размер 2mb',
            class: 'm-fail',
            visible: true
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="scss">
    @import '@/assets/styles/layout/vars.scss';
    @mixin placeholder {
        &::-webkit-input-placeholder { @content; }
        &:-moz-placeholder           { @content; }
        &::-moz-placeholder          { @content; }
        &:-ms-input-placeholder      { @content; }
    }
    .client-form{
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 9000;
        top:0;
        left:0;
        right:0;
        bottom:0;
        display:flex;
        padding: 10px 0;
    }
    .client-form__overlay{
        width:100%;
        height: 100%;
        background-color: rgba($mainColor, 0.8);
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }
    .client-form__content{
        width: 800px;
        min-height:500px;
        max-height: 100%;
        overflow:auto;
        border-radius: 4px;
        background-color: #ebebeb;
        padding: 30px 35px;
        margin: auto;
        position:relative;
        border: 2px solid $accentColor;
    }
    .client-form__title{
        color: $mainColor;
        font-size: $textFontSize;
        font-weight: 600;
        text-transform: uppercase;
    }
    .client-form__item{
        margin-bottom: 20px;
    }
    .client-form__image{
        width: 150px;
        height: 150px;
        margin: 0 auto;
        border-radius:50%;
        overflow: hidden;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .client-form__submit{
        width: 100%;
        height: 50px;
        border-radius: 3px;
        background-color: $accentColor;
        border: 2px solid $accentColor;
        color: $white;
        font-size: $h6fontSize;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
        transition: all .3s;
        max-width:332px;
        margin: 0 auto;
        display:flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover{
            color: $accentColor;
            background-color: transparent;
        }
    }
    .client-form__input{
        width: 100%;
        height: 52px;
        border-radius: 4px;
        border: 1px solid $mainColor;
        padding-left:20px;
        background: transparent;
        outline:none;
        color: $mainColor;
        font-size: $textFontSize;
        font-weight: 500;
        font-family: $mainFont;
        transition: all .3s;
        @include placeholder{
            color: $accentColor;
        }
        &:focus{
            box-shadow: 0 0 4px $accentColor;
            border: 1px solid $accentColor;
        }
    }
    .ql-editor{
        width: 100%;
        height: 300px;
        border-radius:0 0 5px 5px;
        border: 1px solid $mainColor;
        padding:20px;
        background: transparent;
        outline:none;
        color: $mainColor;
        font-size: $textFontSize;
        font-weight: 500;
        resize: vertical;
        font-family: $mainFont;
        transition: all .3s;
        &:focus{
            box-shadow: 0 0 4px $accentColor;
            border: 1px solid $accentColor;
        }
    }
    .ql-editor.ql-blank::before{
        color: $accentColor;
        font-style: normal;
        left: 20px;
    }
    .ql-toolbar.ql-snow{
        border: 1px solid $mainColor;
        border-bottom: none;
        border-radius:5px 5px 0 0;
    }
    .ql-container.ql-snow{
        border: none;
    }
    .client-form__label{
        color:$mainColor;
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
</style>
