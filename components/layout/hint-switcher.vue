<template lang="pug">
    .hint-switcher
        .hint-switcher__title Подсказки
        .hint-switcher__container(:class="{'hint-switcher__container--active' : isHint}", @click="switchHint")
           .hint-switcher__tumbler
</template>

<script>
export default {
  name: 'HintSwitcher',
  data () {
    return {
      isHint: true
    }
  },
  methods: {
    switchHint () {
      this.isHint = !this.isHint
      this.$EventBus.$emit('switchHint', { active: this.isHint })
    }
  }
}
</script>

<style lang="scss">
    @import '@/assets/styles/layout/vars.scss';
    .hint-switcher{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .hint-switcher__title{
        font-size: $h5fontSize;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-right: 20px;
    }
    .hint-switcher__container{
        width: 79px;
        height: 38px;
        border-radius: 19px;
        border: 2px solid $mainColor;
        position: relative;
        cursor: pointer;
        transition: all .3s;
    }
    .hint-switcher__tumbler{
        width: 26px;
        height: 26px;
        background-color: $mainColor;
        border-radius:50%;
        position: absolute;
        top:4px;
        left: 5px;
        transition: all .3s;
    }
    .hint-switcher__container--active{
        background-color: $accentColor;
        border-color: $accentColor;
        .hint-switcher__tumbler{
            background-color: #fff;
            left: 45px;
        }
    }
</style>
