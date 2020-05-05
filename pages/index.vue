<template lang="pug">
  .table
    .hint(v-if="isHint")
      |На этой страницы находятся клиенты с которыми вы на данный момент работаете.
      |Каждый клиент относится к той или иной категории.
      |Чтобы узнать подробнее об этих категориях нажмите на подсказки рядом с названием этой категории.
      |Клиентов, сотрудничество с которыми было разорванно, стоит добавить в архив.
      |Важный совет. Прежде чем перемещать клиента из одной категории в другую, оставляйте запись почему вы это сделали и не забывайте сохранить.
      |Это поможет, Вам увидеть точную ретроспективу Вашего сотрудничества на странице "История".
    .table__search
      Search
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="user-plus", width="20", height="20")
          span Новые (0)
          .hint-opener(@click="toggleDescWindow(aspirantText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        ClientCard
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="user-clock", width="20", height="20")
          span Спящие (0)
          .hint-opener(@click="toggleDescWindow(sleepText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="user-check", width="20", height="20")
          span Открытые (0)
          .hint-opener(@click="toggleDescWindow(currentText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="handshake", width="20", height="20")
          span Постоянные (0)
          .hint-opener(@click="toggleDescWindow(favoriteText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="gem", width="20", height="20")
          span V.I.P. (0)
          .hint-opener(@click="toggleDescWindow(winnerText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
</template>

<script>
import Search from '@/components/pages/search'
import ClientCard from '@/components/pages/client-card'
export default {
  middleware: ['admin-auth'],
  components: {
    Search,
    ClientCard
  },
  data () {
    return {
      isHint: true,
      aspirantText: 'В этой категории находятся все клиенты, с которыми, Вы, только установили, контакт, но пока еще не начали сотрудничество. Ваша, задача на данном этапе, убедить Вашего потенциального клиента, в том, что именно Вы сможете решить его проблему, и что сотрудничество именно с Вами, будет самым комфортным и продуктивным.',
      sleepText: 'В этой категории находятся клиенты, которые уже воспользовались Вашими услугами, но дальнейшее сотрудничество пока не актуально. Большая ошибка многих предпринимателей в том, что они забывают про этих клиентов. После того как сотрудничество временно прекратилось, нужно периодически напоминать о себе, спрашивать о том, доволен ли клиент оказанной ранее услугой. Даже если клиент больше и не будет обращаться к Вам, он оценит заботу и внимание, и возможно приведет, Вам новых клиентов.',
      currentText: 'В этой категории находятся клиенты, с которыми вы договорились о начале сотрудничества, но пока еще не закрыли сделку. Этим клиентам надо уделить особое внимание, так как от этого этапа зависит Ваши дальнейшие деловые отношения и то, какой доход вы получите от клиента. Постарайтесь действовать про активно. Ваша задача, чтобы клиент почувствовал, что получил гораздо лучший результат, чем ожидал, и за который платил.</br> Если после закрытия сделки, клиент временно не нуждается в Ваших услугах, его стоит добавить в категорию "Спящие", если он намеревается, постоянно к Вам обращаться или продолжает сотрудничество, то его стоит переместить в категорию "Постоянные". Если выплаты, которые вы получили от клиента, составляют значительную долю от Вашей общей прибыли(можно посмотреть на странице "Рейтинг"), то Вам повезло. У вас появился V.I.P. клиент.',
      favoriteText: 'В этой категории находятся Ваши постоянные клиенты. Как уже понятно из названия, это те клиенты, которые обращаются к Вам за услугой, на постоянной основе. С этими клиентами, вы не обязательно закрываете крупные сделки, но они обращаются к Вам постоянно. Важно стимулировать этих клиентов на то, чтобы они не прекращали обращаться именно к Вам. В тяжелые для Вашего бизнеса времена, эти клиенты помогут Вам держаться на плаву. Важно их не потерять.',
      winnerText: 'В этой категории находятся самые важные клиенты. Это клиенты, прибыль от сделок с которыми может составлять, значительную часть Вашего дохода. Сюда следует помещать клиентов, которые находятся на вершине рейтинга(можно посмотреть на странице "рейтинг") или тех клиентов, которые имеют для Вас особое значение. Терять таких клиентов нельзя ни в коем случае, так как они приносят основной доход Вашему бизнесу.'
    }
  },
  async asyncData ({ store }) {
    const user = store.getters['auth/user']
    const clients = await store.dispatch('client/getAll', user.userId)
    return { clients }
  },
  mounted () {
    this.$EventBus.$on('switchHint', (data) => {
      this.isHint = data.active
    })
  },
  methods: {
    toggleDescWindow (text) {
      this.$EventBus.$emit('callDescWindow', { visible: true, text })
    }
  }
}
</script>

<style lang="scss" src="@/assets/styles/components/table.scss"></style>
<style lang="scss" src="@/assets/styles/components/hint.scss"></style>
