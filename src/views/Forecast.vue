<template>
  <h1>Forecast</h1>
  <div v-show="true">
    <div id="top" v-for="forecast in forecasts" v-bind:key="forecast.id">
      <div class="row">
        <div class="col">
          <h3>{{ forecast.date }}</h3>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <p>Probability that planes fly: {{ forecast.probability }}%</p>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover">
              <thead class="thead-dark">
              <tr>
                <th></th>
                <th>Wind degree</th>
                <th>Probability</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="hour in forecast.hours" v-bind:key="hour.id">
                <td><strong>{{ hour.time[0] }}:00h</strong></td>
                <td>{{ hour.wind_degree }}</td>
                <td>{{ hour.probability }}</td>
              </tr>
              </tbody>

            </table>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import {toTitleDate, generateID} from "@/util/Utils";

export default {
  name: 'Forecast',
  data: function () {
    return {
      loading: Boolean,
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
      f.id = generateID();
      f.date = toTitleDate(f.date);
      f.hours = f.hours.map(h => {
        h.id = generateID().next().value;
        return h;
      });
      console.log(f.hours);
      return f;
    })
    this.loading = false;
  }
}
</script>
