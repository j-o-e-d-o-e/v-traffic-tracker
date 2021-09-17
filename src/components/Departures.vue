<script>
import { defineComponent } from 'vue'
import { Pie } from 'vue3-chart-v2'

export default defineComponent({
  name: 'Departures',
  extends: Pie,
  props:{
    departures: Object,
    as: Array
  },
  mounted () {
    console.log(this.departures);
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Intercontinental', 'Europe', 'National', 'Unknown'],
      datasets: [
        {
          label: 'Departures',
          backgroundColor: ['#f87979', '#cdf779', '#79d5f6', '#f5ad79'],
          data: this.as
        }
      ]
    })
  }
})
</script>