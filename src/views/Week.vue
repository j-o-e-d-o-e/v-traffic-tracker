<template>
  <div v-if="!loading">
    <Toolbar :back="!week.prev"
             @back="onPrev"
             :fwd="!week.next"
             @next="onNext"
    />
    <h1>{{ title }}</h1>
    <!--    <Flights :chart-data="day.hours_flight" :chart-labels="labels()"></Flights>-->
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
        <tr>
          <th>Total</th>
          <th>23:00-0:00h</th>
          <th>0:00-5:45h</th>
          <th>Avg altitude</th>
          <th>Avg speed</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ week.total }}</td>
          <td>{{ week.flights_23 }}</td>
          <td>{{ week.flights_0 }}</td>
          <td>{{ week.avg_altitude }} m</td>
          <td>{{ week.avg_speed }} km/h</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Toolbar from '../components/BtnToolbar'
import {toTitleDate} from "@/util/Utils";
// import Flights from "../components/LineChart"

export default {
  name: 'Week',
  components: {
    Toolbar,
    // Flights
  },
  data: function () {
    return {
      week: Object,
      title: String,
      loading: true
    };
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    }
  },
  methods: {
    fetch: async function (url) {
      const res = await fetch(url);
      return res.json();
    },
    labels() {
      let chartLabels = [];
      for (let i = 0; i < 24; i++) {
        chartLabels.push(i.toString() + ':00');
      }
      return chartLabels;
    },
    async onPrev() {
      this.week = await this.fetch(this.week._links.prev_week.href);
      this.setData();
    },
    async onNext() {
      this.week = await this.fetch(this.week._links.next_week.href);
      this.setData();
    },
    setData() {
      this.title = toTitleDate(this.week.start_date) + ' - ' + toTitleDate(this.week.end_date);
      this.loading = false;
    }
  },
  async created() {
    if (this.$route.params.date) {
      this.week = await this.fetch(`https://traffic-tracker.herokuapp.com/api/weeks/${this.$route.params.date}`);
    } else {
      this.week = await this.fetch('https://traffic-tracker.herokuapp.com/api/weeks/current');
    }
    this.setData();
  }
}
</script>
