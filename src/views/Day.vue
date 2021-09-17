<template>
  <section v-if="!loading">
    <Toolbar :back="!day.prev"
             @back="onPrev"
             :next="!day.next"
             @next="onNext"
             :down="{disabled: true}"
             @down="onFlights"
             :up="{disabled: true}"
             @up="onWeek"
    />
    <h1>{{ title }}</h1>
    <Flights :chart-data="day.hours_flight" :chart-labels="labels()"></Flights>
    <br>
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
  </section>
</template>

<script>
import Toolbar from '../components/BtnToolbar'
import {toTitleDate} from "@/util/Utils";
import Flights from "../components/LineChart"

export default {
  name: 'Day',
  components: {
    Toolbar,
    Flights
  },
  data: function () {
    return {
      day: Object,
      title: String,
      loading: true
    };
  },
  methods: {
    labels() {
      let chartLabels = [];
      for (let i = 0; i < 24; i++) {
        chartLabels.push(i.toString() + ':00');
      }
      return chartLabels;
    },
    async onPrev() {
      this.day = await this.fetch(this.day._links.prev_day.href);
      await this.$router.push({name: 'day', params: {date: this.day.date}});
      this.setData();
    },
    async onNext() {
      this.day = await this.fetch(this.day._links.next_day.href);
      await this.$router.push({name: 'day', params: {date: this.day.date}});
      this.setData();
    },
    onFlights() {
      console.log('onFlights');
    },
    onWeek() {
      this.$router.push({name: 'week', params: {date: this.day.date}});
    },
    setData() {
      this.title = toTitleDate(this.day.date);
      this.loading = false;
    },
    fetch: async function (url) {
      const res = await fetch(url);
      return res.json();
    }
  },
  async created() {
    if (!this.$route.params.date) {
      this.day = await this.fetch('https://traffic-tracker.herokuapp.com/api/days/current');
    } else {
      this.day = await this.fetch(`https://traffic-tracker.herokuapp.com/api/days/'${this.$route.params.date}`);
    }
    this.setData();
  }
}
</script>
