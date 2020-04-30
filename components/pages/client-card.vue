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
          .client-card__menu-item
            button.client-card__button.client-card__button--edit
              svg-icon(class="client-card__option-icon", name="edit", width="20", height="20")
          .client-card__menu-item
            button.client-card__button.client-card__button--text
              svg-icon(class="client-card__option-icon", name="text", width="20", height="20")
          .client-card__menu-item
            button.client-card__button.client-card__button--chart
              svg-icon(class="client-card__option-icon", name="chart", width="20", height="20")
      .client-card__control-item
        button.button.button--archive
          svg-icon(class="btn-icon", name="archive", width="20", height="20")
          |В архив
</template>

<style lang="scss" scoped src="@/assets/styles/components/buttons.scss"></style>
<style lang="scss" scoped>
    @import '@/assets/styles/layout/vars.scss';
    .client-card{
      border-radius: 8px;
      background-color: $white;
      border: 2px solid $accentColor;
      padding: 15px;
      margin-bottom: 15px;
    }

    .client-card--dark{
      background-color: $mainColor;
      color: $white;
      .move__item.move__opener{
          border:2px solid $white;
      }
      .move__menu{
          border:2px solid $white;
          border-top:none;
      }
      .client-card__text-more{
          color: $white;
      }
    }

    .client-card__id{
      width: 100%;
      text-align: center;
      margin-bottom: 15px;
      font-family: $mainFont;
      font-size: 12px;
      font-weight: 400;
    }

    .client-card__avatar{
      width: 150px;
      height: 150px;
      margin: 0 auto 15px;
      border-radius:50%;
      overflow: hidden;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .client-card__name{
      font-size: $h3fontSize;
      font-weight: 700;
      margin-bottom: 20px;
      text-align: center;
    }

    .client-card__title{
      font-size: $h5fontSize;
      font-weight: 700;
    }

    .client-card__text-more{
      font-size: $h6fontSize;
      font-weight: 700;
      color: $mainColor;
      &:hover{
          text-decoration: none;
      }
    }

    .client-card__star{
      font-size: $h3fontSize;
      color: $mainColor;
      transition: all .3s;
    }

    .client-card__control-item{
      margin: 20px 0;
    }

    .client-card__text{
      max-height: 170px;
      overflow: hidden;
      word-break: break-all;
    }

    .client-card__raitng{
      display: flex;
      justify-content: space-between;
      margin: 15px 0;
      font-size: 26px;
      font-weight: bold;
      color: $accentColor;
    }
    .client-card__move{
      height: 50px;
      line-height: 50px;
      border-radius: 4px;
      background-color: $mainColor;
      color: $white;
      font-size: $textFontSize;
      font-weight: 500;
      width: 100%;
      position: relative;
      cursor: pointer;
      &:hover{
          background-color: $accentColor;
          border-radius:4px 4px 0 0;
          .client-card__move-menu{
              display: block;
          }
      }
    }

    .move__opener:hover{
      transition: all .3s;
      &>.move-icon{
          fill: $white;
      }
    }

    .client-card__move-item {
      width: 100%;
      height: 50px;
      background-color: $mainColor;
      padding-left: 20px;
      display: flex;
      align-items: center;
      &:hover{
          background-color: $accentColor;
          color: $white;
          &>.move-icon{
              fill: $white;
          }
      }
    }

    .client-card__move-menu{
      display: none;
      margin: 0;
      padding: 0;
      position: absolute;
      width: 100%;
      left: 0;
      top: 50px;
      border-radius:0 0 4px 4px;
      overflow: hidden;
      z-index: 2;
      border:2px solid $accentColor;
    }

    .move-icon{
      margin-right: 15px;
      fill:$accentColor;
    }

    .client-card__menu{
      display:flex;
      justify-content: space-between;
    }

    .client-card__button{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border-radius: 50px;
      border: 2px solid;
      transition: all .3s;
    }

    .client-card__option-icon{
      fill:#fff;
      transition: fill .3s;
    }

    .client-card__button--trades{
      border-color: $accentColor;
      background-color: $accentColor;
      &:hover{
        background-color: transparent;
        .client-card__option-icon{
          fill: $accentColor;
        }
      }
    }

    .client-card__button--edit{
      border-color: #80C826;
      background-color: #80C826;
      &:hover{
        background-color: transparent;
        .client-card__option-icon{
          fill: #80C826;
        }
      }
    }

    .client-card__button--text{
      border-color: $mainColor;
      background-color: $mainColor;
      &:hover{
        background-color: transparent;
        .client-card__option-icon{
          fill: $mainColor;
        }
      }
    }

    .client-card__button--chart{
      border-color: #FF4800;
      background-color: #FF4800;
      &:hover{
        background-color: transparent;
        .client-card__option-icon{
          fill: #FF4800;
        }
      }
    }
    .client-card__menu-item{
      position: relative;
      &:hover{
        .client-card__menu-tooltipe{
          opacity: 1;
          z-index: 2;
        }
      }
    }

    // .client-card__menu-tooltipe{
    //   width: 175px;
    //   height: 50px;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   background-color: $accentColor;
    //   border-radius: 5px;
    //   color: $white;
    //   font-size: $h6fontSize;
    //   font-weight: 600;
    //   letter-spacing: 2px;
    //   text-transform: uppercase;
    //   position: absolute;
    //   top: -65px;
    //   left: -63px;
    //   opacity: 0;
    //   z-index: -2;
    //   transition: opacity .3s;
    //   &:after{
    //     content:'';
    //     display: block;
    //     width: 0;
    //     height: 0;
    //     border: 15px solid transparent;
    //     border-top-color: $accentColor;
    //     position: absolute;
    //     top:50px;
    //     left: 50%;
    //     margin-left: -15px;
    //   }
    // }
</style>

<script>
export default {}
</script>
