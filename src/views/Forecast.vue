<template>
  <div id="top" v-for="forecast in forecasts" v-bind:key="forecast">
    <h3>{{ forecast.date }}</h3>
    <p>Probability that planes fly: {{ forecast.probability }}%</p>

    <div class="table-responsive">
      <table class="table table-striped table-bordered table-hover">
        <thead class="table-dark">
        <tr>
          <th></th>
          <th>Wind degree</th>
          <th>Probability</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="hour in forecast.hours" v-bind:key="hour">
          <td><strong>{{ hour.time[0] }}:00h</strong></td>
          <td>{{ hour.wind_degree }}</td>
          <td>{{ hour.probability }}</td>
        </tr>
        </tbody>

      </table>
    </div>
  </div>

</template>

<script>
import {toTitleDate} from "@/util/Utils";

export default {
  name: 'Forecast',
  data: function () {
    return {
      forecasts: []
    };
  },
  methods: {
    fetch: async function () {
      const res = await fetch('https://traffic-tracker.herokuapp.com/api/forecasts');
      return res.json();
    }
  },
  async created() {
    this.forecasts = await this.fetch();
    this.forecasts = this.forecasts.map(f => {
      f.date = toTitleDate(f.date);
      return f;
    })
  }
}
</script>
