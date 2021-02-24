<template lang="pug">
  .date-filter
    .date-filter__half-item
      .date-filter__form-title(v-if="target === 'window-trades' || target === 'page-progress'") Все сделки с
      .date-filter__form-title(v-else) Все клиенты с
      .date-filter__datepicker
        .date-filter__date-clean(@click="fromDate = ''")
          svg-icon(class="svg-icon", name="checkmark", width="18", height="18")
        date-picker.date-filter__input(placeholder="Выберите дату", v-model="fromDate", :format="'dd.MM.yyyy'", :language="lang")
    .date-filter__half-item
      .date-filter__form-title(v-if="target === 'page-progress'") Все сделки по
      .date-filter__form-title(v-else) Все клиенты по
      .date-filter__datepicker
        .date-filter__date-clean(@click="toDate = ''")
          svg-icon(class="svg-icon", name="checkmark", width="18", height="18")
        date-picker.date-filter__input(placeholder="Выберите дату", v-model="toDate", :format="'dd.MM.yyyy'", :language="lang")
</template>

<script>
import { ru } from 'vuejs-datepicker/dist/locale'

export default {
  props: {
    target: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      fromDate: '',
      toDate: '',
      lang: ru
    }
  },
  watch: {
    fromDate () {
      this.$EventBus.$emit('checkDate', {
        target: this.target,
        fromDate: this.fromDate,
        toDate: this.toDate
      })
    },
    toDate () {
      this.$EventBus.$emit('checkDate', {
        target: this.target,
        fromDate: this.fromDate,
        toDate: this.toDate
      })
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/components/date-filter.scss"></style>
