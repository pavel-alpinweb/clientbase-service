<template lang="pug">
    ul.app-menu
        li.app-menu__item
            nuxt-link(to="/").app-menu__link
                svg-icon(name="table" class="app-menu__icon")
                |Клиенты
        li.app-menu__item
            nuxt-link(to="/progress").app-menu__link
                svg-icon(name="chart" class="app-menu__icon")
                |Статистика
        li.app-menu__item
            nuxt-link(to="/calendar").app-menu__link
                svg-icon(name="calendar" class="app-menu__icon")
                |Календарь
        li.app-menu__item
            nuxt-link(to="/rating").app-menu__link
                svg-icon(name="sort" class="app-menu__icon")
                |Рейтинг
        li.app-menu__item
            nuxt-link(to="/history").app-menu__link
                svg-icon(name="history" class="app-menu__icon")
                |История
        li.app-menu__item
            nuxt-link(to="/archive").app-menu__link
                svg-icon(name="archive" class="app-menu__icon")
                |Архив
</template>

<style lang="scss">
    @import '@/assets/styles/layout/vars.scss';
    .app-menu{
        width: 100%;
        margin: 0;
        padding: 0;
        padding: 0;
        border-radius: 4px;
        background-color: $mainColor;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-self: flex-start;
    }

    .app-menu__item{
        display: block;
        width: 100%;
    }

    .app-menu__link{
        width: 100%;
        display: flex;
        align-items: center;
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
        padding-left: 60px;
        cursor: pointer;
        &.nuxt-link-exact-active{
            background-color: $accentColor;
        }
        &:hover{
            background-color: $accentColor;
        }
    }

    .app-menu__icon{
        width: $h6fontSize;
        height: $h6fontSize;
        fill: $white;
        margin-right: 10px;
    }
</style>
