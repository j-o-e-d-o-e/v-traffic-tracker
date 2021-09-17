<template>
  <div v-if="!loading">
    <h1>{{ day.date }}</h1>
    <Flights :chart-data="day.hours_flight" :chart-labels="labels()"></Flights>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
        <tr>
          <th>Total</th>
          <th>Avg altitude</th>
          <th>Avg speed</th>
          <th>Wind speed</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ day.total }}</td>
          <td>{{ day.avg_altitude }} m</td>
          <td>{{ day.avg_speed }} km/h</td>
          <td>{{ day.wind_speed }} km/h</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {toTitleDate} from "@/util/Utils";
import Flights from "../components/LineChart"

export default {
  name: 'Day',
  components: {
    Flights
  },
  data: function () {
    return {
      day: Object,
      loading: true
    };
  },
  methods: {
    fetch: async function () {
      const res = await fetch('https://traffic-tracker.herokuapp.com/api/days/current');
      return res.json();
    },
    labels() {
      let chartLabels = [];
      for (let i = 0; i < 24; i++) {
        chartLabels.push(i.toString() + ':00');
      }
      return chartLabels;
    }
  },
  async created() {
    this.day = await this.fetch();
    this.day.date = toTitleDate(this.day.date);
    this.loading = false;
  }
}
</script>
