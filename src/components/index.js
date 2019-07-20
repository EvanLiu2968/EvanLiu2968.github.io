import Icon from './icon'
import Table from './table'
// import VCharts from './vue-echarts'

const components = [
  Table,
  // VCharts,
  Icon
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}
