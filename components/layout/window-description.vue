<template lang="pug">
    .window-description(v-if="visible")
       .window-description__overlay(@click="closeThisWindow")
       .window-description__content
        svg-icon(@click="closeThisWindow", class="close-icon", name="checkmark", width="18", height="18")
        div(v-html="text")
</template>

<script>
export default {
  name: 'WindowDesc',
  data () {
    return {
      text: 'Какой-то текст по умолчанию',
      visible: true
    }
  },
  mounted () {
    this.$EventBus.$on('callDescWindow', (data) => {
      this.visible = data.visible
      this.text = data.text
    })
  },
  methods: {
    closeThisWindow () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '@/assets/styles/layout/vars.scss';
    .window-description{
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 9000;
        top:0;
        left:0;
        right:0;
        bottom:0;
        display:flex;
        padding: 50px 0;
        overflow-wrap: break-word;
        blockquote{
            border-left: 4px solid #ccc;
            margin: 5px 0;
            padding-left: 16px;
        }
        pre.ql-syntax {
            background-color: #23241f;
            color: #f8f8f2;
            overflow: visible;
            white-space: pre-wrap;
            margin-bottom: 5px;
            margin-top: 5px;
            padding: 5px 10px;
        }
        ol{
            padding-left: 1.5em;
            li{
                padding-left: 1.5em;
                list-style: none;
                counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
                counter-increment: list-0;
                &:before{
                    margin-left: -1.5em;
                    margin-right: 0.3em;
                    text-align: right;
                    content: counter(list-0, decimal) '. ';
                    display: inline-block;
                    white-space: nowrap;
                    width: 1.2em;
                }
            }
        }
        ul{
            padding-left: 1.5em;
            li{
                padding-left: 1.5em;
                list-style-type: none;
                &:before{
                    content: '\2022';
                    margin-left: -1.5em;
                    margin-right: 0.3em;
                    text-align: right;
                    display: inline-block;
                    white-space: nowrap;
                    width: 1.2em;
                }
            }
        }
        .ql-indent-1{
            padding-left: 3em;
        }
        .ql-indent-2{
            padding-left: 6em;
        }
        .ql-indent-3{
            padding-left: 9em;
        }
        .ql-indent-4{
            padding-left: 12em;
        }
        .ql-indent-5{
            padding-left: 15em;
        }
        .ql-indent-6{
            padding-left: 18em;
        }
        .ql-indent-7{
            padding-left: 21em;
        }
        .ql-indent-8{
            padding-left: 24em;
        }
        .ql-align-center {
            text-align: center;
        }
        .ql-align-right {
            text-align: right;
        }
        .ql-align-justify {
            text-align: justify;
        }
    }
    .window-description__overlay{
        width:100%;
        height: 100%;
        background-color: rgba($mainColor, 0.8);
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }
    .window-description__content{
        width:100%;
        max-width: 768px;
        min-height:500px;
        max-height: 100%;
        overflow:auto;
        border-radius: 4px;
        background-color: #ebebeb;
        padding: 35px 40px;
        margin: auto;
        position:relative;
        border: 2px solid $accentColor;
    }

    .close-icon{
        position:absolute;
        top: 20px;
        right: 20px;
        width:20px;
        height:20px;
        fill: $mainColor;
        cursor: pointer;
        &:hover{
            fill: $accentColor;
        }
    }
</style>
