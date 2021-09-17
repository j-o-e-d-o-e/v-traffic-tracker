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
    labels() {
      let chartLabels = [];
      for (let i = 0; i < 24; i++) {
        chartLabels.push(i.toString() + ':00');
      }
      return chartLabels;
    }
  },
  mounted() {
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
})
</script>