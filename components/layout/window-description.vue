<template lang="pug">
    .window-description.ql-snow(v-if="visible")
       .window-description__overlay(@click="closeThisWindow")
       .window-description__content.window-description__content--big
          vuescroll
             .window-description__scroll-content
                svg-icon(@click="closeThisWindow", class="close-icon", name="checkmark", width="18", height="18")
                div.ql-editor(v-html="text")
</template>

<script>
import vuescroll from 'vuescroll'

export default {
  name: 'WindowDesc',
  components: {
    vuescroll
  },
  data () {
    return {
      text: 'Какой-то текст по умолчанию',
      visible: false
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

<style lang="scss" scoped src="@/assets/styles/components/window-info.scss"></style>
