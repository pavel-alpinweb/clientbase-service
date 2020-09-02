<template lang="pug">
    .common-form__content
        form.common-form__sending-form(@submit.prevent="onSubmit")
            .common-form__item
                legend.common-form__title Создание нового пользователя:
            .common-form__item
                label.common-form__label Логин
                input.common-form__input(v-model.trim="login", type="text", placeholder="Придумайте имя пользователя")
            .common-form__item
                label.common-form__label Пароль
                input.common-form__input(v-model.trim="password", type="password", placeholder="Придумайте пароль")
            button.common-form__submit Зарегистрироваться
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
      if (this.password.length < 6) {
        this.$EventBus.$emit('loginError', { message: 'Пароль должен содержать не меньше 6-ти символов' })
      } else if (this.login !== '' && this.password !== '') {
        try {
          const formData = {
            login: this.login,
            password: this.password
          }
          await this.$store.dispatch('auth/createUser', formData)
          this.$router.push('/')
        } catch (error) {
          this.$EventBus.$emit('loginError', { message: error.response.data.message })
        }
      } else {
        this.$EventBus.$emit('loginError', { message: 'Все поля необходимо заполнить' })
      }
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/components/form.scss"></style>
