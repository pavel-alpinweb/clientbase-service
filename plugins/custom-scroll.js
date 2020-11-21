import Vue from 'vue'
import vuescroll from 'vuescroll'

Vue.use(vuescroll, {
  ops: {
    mode: 'native',
    sizeStrategy: 'number',
    detectResize: true,
    bar: {
      background: '#feb63f',
      keepShow: true,
      size: '10px',
      minSize: 0.1
    },
    scrollButton: {
      enable: false
    },
    rail: {
      opacity: '1',
      background: 'transparent',
      size: '12px',
      border: '1px solid #feb63f'
    },
    vuescroll: {
      wheelScrollDuration: 300,
      wheelDirectionReverse: false
    }
  }
})
