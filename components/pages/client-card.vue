<template lang="pug">
  .client-card(id="client01")
    .client-card__id id: client01
    .client-card__avatar(style="background-image: url('/images/male.jpg');")
    .client-card__name Имя Клиента
    .client-card__charact
        .client-card__title Кол-во заказов:
        .client-card__raitng 10
    .client-card__charact
        .client-card__title Выплаты:
        .client-card__raitng 10$
    .client-card__control-item
      ul.client-card__move
        li.client-card__move-item.move__opener
          svg-icon(class="move-icon", name="move", width="18", height="18")
          |Поместить...
          ul.client-card__move-menu
              li.client-card__move-item
                svg-icon(class="move-icon", name="user-plus", width="20", height="20")
                |В открытые
              li.client-card__move-item
                svg-icon(class="move-icon", name="user-clock", width="20", height="20")
                |В спящие
              li.client-card__move-item
                svg-icon(class="move-icon", name="user-check", width="20", height="20")
                |В постоянные
              li.client-card__move-item
                svg-icon(class="move-icon", name="gem", width="20", height="20")
                |В V.I.P
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
