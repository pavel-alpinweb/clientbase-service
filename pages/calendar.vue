<template lang="pug">
  .table
    .table__search.table__search--grid-two
      .table__searh-container
        Search
      .table__searh-container
        DateChecker(:target="'page-calendar'")
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="archive", width="20", height="20")
          span Архив ({{ statusArray('archive').length }})
          .hint-opener(@click="toggleDescWindow(archiveText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        HistoryClientCard(v-for="(client, index) in statusArray('archive')", :client="client", @key="client._id", :index="index")
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="user-clock", width="20", height="20")
          span Спящие ({{ statusArray('sleep').length }})
          .hint-opener(@click="toggleDescWindow(sleepText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        HistoryClientCard(v-for="(client, index) in statusArray('sleep')", :client="client", @key="client._id", :index="index")
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="user-check", width="20", height="20")
          span Открытые ({{ statusArray('open').length }})
          .hint-opener(@click="toggleDescWindow(currentText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        HistoryClientCard(v-for="(client, index) in statusArray('open')", :client="client", @key="client._id", :index="index")
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="handshake", width="20", height="20")
          span Постоянные ({{ statusArray('repeat').length }})
          .hint-opener(@click="toggleDescWindow(favoriteText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        HistoryClientCard(v-for="(client, index) in statusArray('repeat')", :client="client", @key="client._id", :index="index")
    .table__item
      .table__heading
          svg-icon(class="table__icon", name="gem", width="20", height="20")
          span V.I.P. ({{ statusArray('vip').length }})
          .hint-opener(@click="toggleDescWindow(winnerText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        HistoryClientCard(v-for="(client, index) in statusArray('vip')", :client="client", @key="client._id", :index="index")
</template>

<script>
import Search from '@/components/pages/search'
import HistoryClientCard from '@/components/pages/history-client-card'
import DateChecker from '@/components/pages/date-checker'
export default {
  middleware: ['admin-auth'],
  components: {
    Search,
    HistoryClientCard,
    DateChecker
  },
  data () {
    return {
      isHint: true,
      searchString: '',
      currentDate: new Date(),
      textPage:
      `На этой страницы находятся списки всех клиентов, с которыми вы когда-либо сотрудничали.
       Здесь вы можете узнать, какие клиенты попадали в каждую из категорий.
       Если вы хотите узнать, статистику по всем клиентам зайдите на страницу "Статистика".
       Если Вам нужно увидеть подробную ретроспективу Вашего сотрудничества с клиентами, зайдите на страницу "История".`,
      archiveText: 'В этой категории находятся все клиенты, сотрудничество с которыми так или иначе не сложилось. Заметьте в этом приложении вообще нет кнопки "Удалить". Любого потерянного клиента можно вернуть в главную таблицу. Помните, каждый потерянный клиент это потерянная прибыль. Почитайте свои записи, оставленные к потерянному клиенту, посмотрите как развивалось Ваше сотрудничество, на странице "История" .Может быть Вам удастся возобновить сотрудничество.',
      sleepText: 'В этой категории находятся клиенты, которые уже воспользовались Вашими услугами, но дальнейшее сотрудничество пока не актуально. Большая ошибка многих предпринимателей в том, что они забывают про этих клиентов. После того как сотрудничество временно прекратилось, нужно периодически напоминать о себе, спрашивать о том, доволен ли клиент оказанной ранее услугой. Даже если клиент больше и не будет обращаться к Вам, он оценит заботу и внимание, и возможно приведет, Вам новых клиентов.',
      currentText: 'В этой категории находятся клиенты, с которыми вы договорились о начале сотрудничества, но пока еще не закрыли сделку. Этим клиентам надо уделить особое внимание, так как от этого этапа зависит Ваши дальнейшие деловые отношения и то, какой доход вы получите от клиента. Постарайтесь действовать про активно. Ваша задача, чтобы клиент почувствовал, что получил гораздо лучший результат, чем ожидал, и за который платил.</br> Если после закрытия сделки, клиент временно не нуждается в Ваших услугах, его стоит добавить в категорию "Спящие", если он намеревается, постоянно к Вам обращаться или продолжает сотрудничество, то его стоит переместить в категорию "Постоянные". Если выплаты, которые вы получили от клиента, составляют значительную долю от Вашей общей прибыли(можно посмотреть на странице "Рейтинг"), то Вам повезло. У вас появился V.I.P. клиент.',
      favoriteText: 'В этой категории находятся Ваши постоянные клиенты. Как уже понятно из названия, это те клиенты, которые обращаются к Вам за услугой, на постоянной основе. С этими клиентами, вы не обязательно закрываете крупные сделки, но они обращаются к Вам постоянно. Важно стимулировать этих клиентов на то, чтобы они не прекращали обращаться именно к Вам. В тяжелые для Вашего бизнеса времена, эти клиенты помогут Вам держаться на плаву. Важно их не потерять.',
      winnerText: 'В этой категории находятся самые важные клиенты. Это клиенты, прибыль от сделок с которыми может составлять, значительную часть Вашего дохода. Сюда следует помещать клиентов, которые находятся на вершине рейтинга(можно посмотреть на странице "рейтинг") или тех клиентов, которые имеют для Вас особое значение. Терять таких клиентов нельзя ни в коем случае, так как они приносят основной доход Вашему бизнесу.'
    }
  },
  computed: {
    clientsArray () {
      if (this.searchString === '') {
        return this.filterByCurrentDate(this.clients)
      } else {
        const checkClients = this.clients.filter((client) => {
          return client.name.toLowerCase().includes(this.searchString.toLowerCase()) ||
          client.id.toLowerCase().includes(this.searchString.toLowerCase())
        })
        return this.filterByCurrentDate(checkClients)
      }
    }
  },
  async asyncData ({ store }) {
    const user = store.getters['auth/user']
    const clients = await store.dispatch('history/getAllHistory', user.userId)
    return { clients }
  },
  mounted () {
    this.$EventBus.$on('switchHint', (data) => {
      this.isHint = data.active
    })
    this.$EventBus.$on('search', (data) => {
      this.searchString = data.searchString
    })
    this.$EventBus.$on('currentDate', (data) => {
      if (data.target === 'page-calendar') {
        this.currentDate = new Date(data.currentDate)
      }
    })
    this.$EventBus.$emit('changePageText', { textPage: this.textPage })
  },
  methods: {
    toggleDescWindow (text) {
      this.$EventBus.$emit('callDescWindow', { visible: true, text })
    },
    statusArray (status) {
      return this.clientsArray.filter(client => client.status === status)
    },
    sortByDate (array) {
      return array.sort((a, b) => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        return bDate - aDate
      })
    },
    filterByCurrentDate (array) {
      const sortedByDateArray = this.sortByDate(array)
      sortedByDateArray.sort((a, b) => {
        if (a.id > b.id) {
          return 1
        }
        if (a.id < b.id) {
          return -1
        }
        return 0
      })
      const currentDate = new Date(this.currentDate)
      currentDate.setSeconds(currentDate.getSeconds() + 23 * 60 * 60 - 1)
      const result = []
      const isValidArray = sortedByDateArray.filter((item) => {
        const itemDate = new Date(item.date)
        if (itemDate <= currentDate) {
          return item
        }
      })
      if (isValidArray.length > 0) {
        result.push(sortedByDateArray[0])
      } else {
        return result
      }
      for (let index = 1; index < sortedByDateArray.length; index++) {
        const itemDate = new Date(sortedByDateArray[index].date)
        const lastItemDate = new Date(result[result.length - 1].date)
        if (itemDate <= currentDate) {
          if (sortedByDateArray[index].id !== result[result.length - 1].id) {
            result.push(sortedByDateArray[index])
          } else if (lastItemDate > currentDate) {
            result[result.length - 1] = sortedByDateArray[index]
          } else if ((currentDate - itemDate) <= (currentDate - lastItemDate)) {
            result[result.length - 1] = sortedByDateArray[index]
          }
        }
      }
      return result
    }
  }
}
</script>

<style lang="scss" src="@/assets/styles/components/table.scss"></style>
