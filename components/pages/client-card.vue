<template lang="pug">
  .client-card(id="client01")
    .client-card__id id: client01
    .client-card__avatar(style="background-image: url('/images/male.jpg');")
    .client-card__name Имя Клиента
    .client-card__charact
        .client-card__title Последнее изменение:
        .client-card__raitng 10.10.2020 18:20
    .client-card__control-item
      .client-card__menu
        .client-card__menu-item
          button.client-card__button.client-card__button--trades
            svg-icon(class="client-card__option-icon", name="trades", width="20", height="20")
          .client-card__menu-tooltipe Сделки
        .client-card__menu-item
          button.client-card__button.client-card__button--edit
            svg-icon(class="client-card__option-icon", name="edit", width="20", height="20")
          .client-card__menu-tooltipe Редактировать
        .client-card__menu-item
          button.client-card__button.client-card__button--text
            svg-icon(class="client-card__option-icon", name="text", width="20", height="20")
          .client-card__menu-tooltipe Описание
        .client-card__menu-item
          button.client-card__button.client-card__button--chart
            svg-icon(class="client-card__option-icon", name="chart", width="20", height="20")
          .client-card__menu-tooltipe Статистика
    .client-card__control-item
        button.button.button--archive
          svg-icon(class="btn-icon", name="archive", width="20", height="20")
          |В архив
</template>

<style lang="scss" scoped src="@/assets/styles/components/buttons.scss"></style>
<style lang="scss" scoped src="@/assets/styles/components/client-card.scss"></style>

<script>
export default {}
</script>
