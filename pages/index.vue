<template lang="pug">
  .table
    .table__search
      Search
    nav.table__mobile-menu.laptops-hide.all-desktops-hide
      ul.table__mobile-sort-list
        li.table__mobile-sort-item.table__mobile-sort-item--active
          button.button.button--wait.button--wait-not-hover(
            :class="{'button--wait-active' : currentStatusArray.includes('all') || currentStatusArray.length === 5}"
            @click="toggleSelectedStatus('all')"
          )
            svg-icon(class="btn-icon", name="table", width="20", height="20")
            |Все ({{ clients.length }})
        li.table__mobile-sort-item.table__mobile-sort-item--active
          button.button.button--wait.button--wait-not-hover(
            :class="{'button--wait-active' : currentStatusArray.includes('aspirant') || currentStatusArray.includes('all')}"
            @click="toggleSelectedStatus('aspirant')"
          )
            svg-icon(class="btn-icon", name="user-plus", width="20", height="20")
            |Новые ({{ statusArray('aspirant').length }})
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

    .table__item(:class="{'table__item--devices-view' : currentStatusArray.includes('aspirant')}")
      .table__heading
          svg-icon(class="table__icon", name="user-plus", width="20", height="20")
          span Новые ({{ statusArray('aspirant').length }})
          .hint-opener(@click="toggleDescWindow(aspirantText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        vuescroll
          transition-group(name="component-fade",  mode="out-in")
            ClientCard(v-for="client in statusArray('aspirant')", :client="client", :key="client.id")

    .table__item(:class="{'table__item--devices-view' : currentStatusArray.includes('sleep')}")
      .table__heading
          svg-icon(class="table__icon", name="user-clock", width="20", height="20")
          span Спящие ({{ statusArray('sleep').length }})
          .hint-opener(@click="toggleDescWindow(sleepText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        vuescroll
          transition-group(name="component-fade",  mode="out-in")
            ClientCard(v-for="client in statusArray('sleep')", :client="client", :key="client.id")

    .table__item(:class="{'table__item--devices-view' : currentStatusArray.includes('open')}")
      .table__heading
          svg-icon(class="table__icon", name="user-check", width="20", height="20")
          span Открытые ({{ statusArray('open').length }})
          .hint-opener(@click="toggleDescWindow(currentText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        vuescroll
          transition-group(name="component-fade",  mode="out-in")
            ClientCard(v-for="client in statusArray('open')", :client="client", :key="client.id")

    .table__item(:class="{'table__item--devices-view' : currentStatusArray.includes('repeat')}")
      .table__heading
          svg-icon(class="table__icon", name="handshake", width="20", height="20")
          span Постоянные ({{ statusArray('repeat').length }})
          .hint-opener(@click="toggleDescWindow(favoriteText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        vuescroll
          transition-group(name="component-fade",  mode="out-in")
            ClientCard(v-for="client in statusArray('repeat')", :client="client", :key="client.id")

    .table__item(:class="{'table__item--devices-view' : currentStatusArray.includes('vip')}")
      .table__heading
          svg-icon(class="table__icon", name="gem", width="20", height="20")
          span V.I.P. ({{ statusArray('vip').length }})
          .hint-opener(@click="toggleDescWindow(winnerText)")
            svg-icon(class="table__icon", name="question", width="20", height="20")
      .table__content
        vuescroll
          transition-group(name="component-fade",  mode="out-in")
            ClientCard(v-for="client in statusArray('vip')", :client="client", :key="client.id")
</template>

<script>
import Search from '@/components/pages/search'
import ClientCard from '@/components/pages/client-card'
import vuescroll from 'vuescroll'
export default {
  middleware: ['admin-auth'],
  components: {
    Search,
    ClientCard,
    vuescroll
  },
  data () {
    return {
      searchString: '',
      currentStatusArray: ['open'],
      textPage:
      `На этой страницы находятся клиенты с которыми вы на данный момент работаете.
      Каждый клиент относится к той или иной категории.
      Чтобы узнать подробнее об этих категориях нажмите на подсказки рядом с названием этой категории.`,
      aspirantText: 'В этой категории находятся все клиенты, с которыми не было состоялось ни одной сделки.',
      sleepText: 'В этой категории находятся клиенты, с которыми вы не заключили ни однйо сделки в течении 30-ти дней, но решили разрывать сотрудничество',
      currentText: 'В этой категории находятся все клиенты, с которыми состоялась хотябы одна сделка',
      favoriteText: 'В этой категории находятся все клиенты, с которыми состоялось три и более сделок',
      winnerText: 'В этой категории находятся все клиенты, с которыми состоялась хотябы одна сделка стоимостью 100 000 и более'
    }
  },
  computed: {
    clientsArray () {
      if (this.searchString === '') {
        return this.sortByDate(this.clients)
      } else {
        const checkClients = this.clients.filter((client) => {
          return client.name.toLowerCase().includes(this.searchString.toLowerCase()) ||
          client.id.toLowerCase().includes(this.searchString.toLowerCase())
        })
        return this.sortByDate(checkClients)
      }
    }
  },
  async asyncData ({ store }) {
    const user = store.getters['auth/user']
    const clients = await store.dispatch('client/getAll', user.userId)
    return { clients }
  },
  mounted () {
    this.$EventBus.$emit('changePageText', { textPage: this.textPage })
    this.$EventBus.$on('updateClient', (data) => {
      this.clients.forEach((client, i) => {
        if (data.client._id === client._id) {
          Object.assign(this.clients[i], data.client)
        }
      })
    })
    this.$EventBus.$on('createClient', (data) => {
      this.clients.push(data.client)
    })
    this.$EventBus.$on('search', (data) => {
      this.searchString = data.searchString
    })
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
    toggleSelectedStatus (status) {
      const allStatuses = ['aspirant', 'open', 'repeat', 'vip', 'sleep']
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
<style lang="scss" src="@/assets/styles/components/hint.scss"></style>
