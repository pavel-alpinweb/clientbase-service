<template lang="pug">
    .search
        input.search__input(@input="searchClients", type="text", placeholder="Введите имя или id клиента...", v-model="searchString")
        .search__clean(@click="cleanSearch")
            svg-icon(class="svg-icon", name="checkmark", width="18", height="18")
</template>

<script>
export default {
  name: 'SearchInput',
  data () {
    return {
      searchString: ''
    }
  },
  methods: {
    searchClients () {
      this.$EventBus.$emit('search', { searchString: this.searchString })
    },
    cleanSearch () {
      this.searchString = ''
      this.$EventBus.$emit('search', { searchString: this.searchString })
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/components/search.scss"></style>
