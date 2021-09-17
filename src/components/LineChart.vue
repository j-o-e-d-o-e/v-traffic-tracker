<script>
import {defineComponent} from 'vue'
import {Line} from 'vue3-chart-v2'

export default defineComponent({
  name: 'Flights',
  extends: Line,
  props: {
    chartData: Array,
    chartLabels: Array
  },
  methods: {
    render() {
      this.renderChart({
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Flights',
            backgroundColor: '#f87979',
            data: this.chartData
          }
        ]
      })
    }
  },
  mounted() {
    this.render();
  },
  updated() {
    this.render();
  }
})
</script>
