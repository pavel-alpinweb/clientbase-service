<template lang="pug">
  .trades-row
    .trades-row__cell
      .trades-row__cell-title Название
      .trades-row__cell-value
        span {{ number }}
        input.trades-row__input(type="text", placeholder="Введите название сделки", value="Оплата за месяц занятий Оплата за месяц занятий")
    .trades-row__cell
      .trades-row__cell-title Дата
      .trades-row__cell-value
        input.trades-row__input(type="date", placeholder="Введите дату сделки")
    .trades-row__cell
      .trades-row__cell-title Сумма
      .trades-row__cell-value
        input.trades-row__input(type="number", placeholder="Введите дату сделки", min="0")
    .trades-row__cell
    .trades-row__cell-title Действия
      .trades-row__cell-value
        button.trades-row__button.trades-row__button--save
          svg-icon(class="trades-row__option-icon", name="save", width="20", height="20")
        button.trades-row__button.trades-row__button--delete
            svg-icon(class="trades-row__option-icon", name="trash", width="20", height="20")
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/components/trades-row.scss"></style>
