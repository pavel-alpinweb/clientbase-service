<template lang="pug">
  .table.table--calendar
    .table__search.table__search--grid-two
      .table__searh-container
        Search
      .table__searh-container
        DateChecker(:target="'page-calendar'")
    nav.table__mobile-menu.laptops-hide.all-desktops-hide
      ul.table__mobile-sort-list
        li.table__mobile-sort-item.table__mobile-sort-item--active
          button.button.button--wait.button--wait-not-hover(
            :class="{'button--wait-active' : currentStatusArray.includes('all') || currentStatusArray.length === 5}"
            @click="toggleSelectedStatus('all')"
          )
            svg-icon(class="btn-icon", name="table", width="20", height="20")
            |Все ({{ clientsArray.length }})
        li.table__mobile-sort-item.table__mobile-sort-item--active
          button.button.button--wait.button--wait-not-hover(
            :class="{'button--wait-active' : currentStatusArray.includes('archive') || currentStatusArray.includes('all')}"
            @click="toggleSelectedStatus('archive')"
          )
            svg-icon(class="btn-icon", name="archive", width="20", height="20")
            |Архив ({{ statusArray('archive').length }})
        li.table__mobile-sort-item
          button.button.button--wait.button--wait-not-hover(
            :class="{'button--wait-active' : currentStatusArray.includes('sleep') || currentStatusArray.includes('all')}"
            @click="toggleSelectedStatus('sleep')"
          )
            svg-icon(class="btn-icon", name="user-clock", width="20", height="20")
            |Спящие ({{ statusArray('sleep').length }})
        li.table__mobile-sort-item
          button.button.button--wait.button--wait-not-hover(
            :class="{'button--wait-active' : currentStatusArray.includes('open') || currentStatusArray.includes('all')}"
            @click="toggleSelectedStatus('open')"
          )
            svg-icon(class="btn-icon", name="user-check", width="20", height="20")
            |Открытые ({{ statusArray('open').length }})
        li.table__mobile-sort-item
          button.button.button--wait.button--wait-not-hover(
            :class="{'button--wait-active' : currentStatusArray.includes('repeat') || currentStatusArray.includes('all')}"
            @click="toggleSelectedStatus('repeat')"
          )
            svg-icon(class="btn-icon", name="handshake", width="20", height="20")
            |Постоянные ({{ statusArray('repeat').length }})
        li.table__mobile-sort-item
          button.button.button--wait.button--wait-not-hover(
            :class="{'button--wait-active' : currentStatusArray.includes('vip') || currentStatusArray.includes('all')}"
            @click="toggleSelectedStatus('vip')"
          )
            svg-icon(class="btn-icon", name="gem", width="20", height="20")
            |V.I.P. ({{ statusArray('vip').length }})

    .table__item(:class="{'table__item--devices-view' : currentStatusArray.includes('archive')}")
      .table__heading
          svg-icon(class="table__icon", name="archive", width="20", height="20")
          span Архив ({{ statusArray('archive').length }})
          .hint-opener(@click="toggleDescWindow(archiveText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        vuescroll
          transition-group(name="component-fade",  mode="out-in")
            HistoryClientCard.client-calendar(v-for="(client, index) in statusArray('archive')", :client="client", :key="client._id", :index="index")

    .table__item(:class="{'table__item--devices-view' : currentStatusArray.includes('sleep')}")
      .table__heading
          svg-icon(class="table__icon", name="user-clock", width="20", height="20")
          span Спящие ({{ statusArray('sleep').length }})
          .hint-opener(@click="toggleDescWindow(sleepText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        vuescroll
          transition-group(name="component-fade",  mode="out-in")
            HistoryClientCard.client-calendar(v-for="(client, index) in statusArray('sleep')", :client="client", :key="client._id", :index="index")

    .table__item(:class="{'table__item--devices-view' : currentStatusArray.includes('open')}")
      .table__heading
          svg-icon(class="table__icon", name="user-check", width="20", height="20")
          span Открытые ({{ statusArray('open').length }})
          .hint-opener(@click="toggleDescWindow(currentText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        vuescroll
          transition-group(name="component-fade",  mode="out-in")
            HistoryClientCard.client-calendar(v-for="(client, index) in statusArray('open')", :client="client", :key="client._id", :index="index")

    .table__item(:class="{'table__item--devices-view' : currentStatusArray.includes('repeat')}")
      .table__heading
          svg-icon(class="table__icon", name="handshake", width="20", height="20")
          span Постоянные ({{ statusArray('repeat').length }})
          .hint-opener(@click="toggleDescWindow(favoriteText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        vuescroll
          transition-group(name="component-fade",  mode="out-in")
            HistoryClientCard.client-calendar(v-for="(client, index) in statusArray('repeat')", :client="client", :key="client._id", :index="index")

    .table__item(:class="{'table__item--devices-view' : currentStatusArray.includes('vip')}")
      .table__heading
          svg-icon(class="table__icon", name="gem", width="20", height="20")
          span V.I.P. ({{ statusArray('vip').length }})
          .hint-opener(@click="toggleDescWindow(winnerText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        vuescroll
          transition-group(name="component-fade",  mode="out-in")
            HistoryClientCard.client-calendar(v-for="(client, index) in statusArray('vip')", :client="client", :key="client._id", :index="index")
</template>

<script>
import Search from '@/components/pages/search'
import HistoryClientCard from '@/components/pages/history-client-card'
import DateChecker from '@/components/pages/date-checker'
import vuescroll from 'vuescroll'
export default {
  middleware: ['admin-auth'],
  components: {
    Search,
    HistoryClientCard,
    DateChecker,
    vuescroll
  },
  data () {
    return {
      isHint: true,
      searchString: '',
      currentDate: new Date(),
      currentStatusArray: ['open'],
      textPage:
      `На этой странице, вы можете посмотреть как выглядила Ваша база клиентов в любой из дней в прошлом. По умолчание выставленна текущая дата.`,
      archiveText: 'В этой категории находятся все клиенты, сотрудничество с которыми так или иначе не сложилось. Заметьте в этом приложении вообще нет кнопки "Удалить". Любого потерянного клиента можно вернуть в главную таблицу. Помните, каждый потерянный клиент это потерянная прибыль. Почитайте свои записи, оставленные к потерянному клиенту, посмотрите как развивалось Ваше сотрудничество, на странице "История" .Может быть Вам удастся возобновить сотрудничество.',
      sleepText: 'В этой категории находятся клиенты, с которыми вы не заключили ни однйо сделки в течении 30-ти дней, но решили разрывать сотрудничество',
      currentText: 'В этой категории находятся все клиенты, с которыми состоялась хотябы одна сделка',
      favoriteText: 'В этой категории находятся все клиенты, с которыми состоялось три и более сделок',
      winnerText: 'В этой категории находятся все клиенты, с которыми состоялась хотябы одна сделка стоимостью 100 000 и более'
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
    },
    toggleSelectedStatus (status) {
      const allStatuses = ['archive', 'open', 'repeat', 'vip', 'sleep']
      const index = this.currentStatusArray.indexOf(status)
      if (status === 'all' && this.currentStatusArray.length !== 5) {
        this.currentStatusArray = allStatuses
      } else if (status === 'all' && this.currentStatusArray.length === 5) {
        this.currentStatusArray = []
      } else if (index !== -1) {
        this.currentStatusArray.splice(index, 1)
      } else {
        this.currentStatusArray.push(status)
      }
    }
  }
}
</script>

<style lang="scss" src="@/assets/styles/components/table.scss"></style>
<style lang="scss" scoped>
  @import '@/assets/styles/layout/breakpoints.scss';
  /deep/.client-calendar {
    margin-bottom: 15px;
     @include all-tablets {
      margin: 0;
    }
  }
</style>
