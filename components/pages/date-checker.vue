<template lang="pug">
  .date-filter.date-filter--checker
    .date-filter__full-item
      .date-filter__form-title Выбранная дата
      .date-filter__datepicker
        .date-filter__date-clean(@click="currentDate = new Date()")
          svg-icon(class="svg-icon", name="checkmark", width="18", height="18")
        input.date-filter__input(type="date", placeholder="Выберите дату", v-model="currentDate")
</template>

<script>
export default {
  props: {
    target: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      currentDate: ''
    }
  },
  watch: {
    currentDate () {
      this.$EventBus.$emit('currentDate', {
        target: this.target,
        currentDate: new Date(this.currentDate)
      })
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/components/date-filter.scss"></style>
