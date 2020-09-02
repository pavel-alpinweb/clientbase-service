import Vue from 'vue'

export const bus = new Vue()

export default (_context, inject) => {
  if (process.client) {
    // Event bus for plugins
    inject('EventBus', bus)
  }
}
