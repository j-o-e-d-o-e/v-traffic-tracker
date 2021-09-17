<script>
import {defineComponent} from 'vue'
import {Pie} from 'vue3-chart-v2'

export default defineComponent({
  name: 'Departures',
  extends: Pie,
  props: {
    chartData: Object,
  },
  mounted() {
    this.renderChart({
      labels: ['Intercontinental', 'Europe', 'National', 'Unknown'],
      datasets: [
        {
          label: 'Departures',
          backgroundColor: ['#f87979', '#cdf779', '#79d5f6', '#f5ad79'],
          data: [
            this.chartData.continental_abs,
            this.chartData.international_abs,
            this.chartData.national_abs,
            this.chartData.unknown_abs
          ]
        }
      ]
    })
  }
})
</script>