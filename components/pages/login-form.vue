<template lang="pug">
    .common-form__content
        form.common-form__sending-form
            .common-form__item
                legend.common-form__title Введите данные для входа:
            .common-form__item
                label.common-form__label Логин
                input.common-form__input(type="text", placeholder="Введите имя пользователя")
            .common-form__item
                label.common-form__label Пароль
                input.common-form__input(type="text", placeholder="Введите пароль")
            button.common-form__submit Войти
</template>

<style lang="scss" scoped src="@/assets/styles/components/form.scss"></style>
