<template lang="pug">
    .common-form__content
        form.common-form__sending-form(@submit.prevent="onSubmit")
            .common-form__item
                legend.common-form__title Введите данные для входа:
            .common-form__item
                label.common-form__label Логин
                input.common-form__input(v-model.trim="login", type="text", placeholder="Введите имя пользователя")
            .common-form__item
                label.common-form__label Пароль
                input.common-form__input(v-model.trim="password", type="password", placeholder="Введите пароль")
            button.common-form__submit Войти
</template>

<script>
export default {
  data () {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    async onSubmit () {
      try {
        const formData = {
          login: this.login,
          password: this.password
        }
        await this.$store.dispatch('auth/login', formData)
        this.$router.push('/')
      } catch (error) {
        this.$EventBus.$emit('loginError', { message: error.response.data.message })
      }
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/components/form.scss"></style>
