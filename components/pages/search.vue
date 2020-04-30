<template lang="pug">
    .search
        input.search__input(type="text", placeholder="Введите имя или id клиента..." v-model="searchString")
        .search__clean
            svg-icon(class="svg-icon", name="checkmark", width="18", height="18")
</template>

<script>
export default {
  name: 'SearchInput',
  data () {
    return {
      searchString: ''
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '@/assets/styles/layout/vars.scss';
    @mixin placeholder {
        &::-webkit-input-placeholder { @content; }
        &:-moz-placeholder           { @content; }
        &::-moz-placeholder          { @content; }
        &:-ms-input-placeholder      { @content; }
    }
    .search__input{
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
    .search{
        position: relative;
    }
    .search__clean{
        position: absolute;
        top: 17px;
        right: 17px;
        cursor: pointer;
    }
    .svg-icon{
        fill: $mainColor;
        &:hover{
            fill: $accentColor;
        }
    }
</style>
