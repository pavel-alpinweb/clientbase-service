<template lang="pug">
    .common-form__content
        form.common-form__sending-form
            .common-form__item
                legend.common-form__title Создание для нового пользователя:
            .common-form__item
                label.common-form__label Логин
                input.common-form__input(type="text", placeholder="Придумайте имя пользователя")
            .common-form__item
                label.common-form__label Пароль
                input.common-form__input(type="text", placeholder="Придумайте пароль")
            button.common-form__submit Зарегистрироваться
</template>

<style lang="scss" scoped src="@/assets/styles/components/form.scss"></style>
