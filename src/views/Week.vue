<template>
  <section v-if="!loading">
    <Toolbar :back="!week.prev"
             @back="onPrev"
             :next="!week.next"
             @next="onNext"
             :down="{text: 'Days', disabled: false}"
             @down="onDay"
             :up="{text: 'Month', disabled: false}"
             @up="onMonth"/>
    <h1>{{ title }}</h1>
    <Flights :chart-data="week.weekdays" :chart-labels="labels"></Flights>
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
    <section v-if="week.departures">
      <hr>
      <h3>Departures</h3>
      <Departures :chartData="week.departures"></Departures>
      <h5>Top airports <small>(flights)</small></h5>
      <ol>
        <li v-for="airport in week.airports" :key="airport">
          <strong>{{ airport.name }}</strong> ({{ airport.flights }})
        </li>
      </ol>
    </section>
  </section>
</template>

<script>
import Toolbar from '../components/Toolbar'
import Flights from "../components/LineChart"
import Departures from '../components/PieChart'

export default {
  name: 'Week',
  components: {
    Toolbar,
    Flights,
    Departures
  },
  data: function () {
    return {
      week: Object,
      loading: true
    };
  },
  computed: {
    title() {
      const startDate = new Date(this.week.start_date);
      const endDate = new Date(this.week.end_date);
      return startDate.toLocaleDateString() + ' - ' + endDate.toLocaleDateString();
    },
    labels() {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
  },
  async created() {
    if (this.$route.params.date) {
      await this.initData(`https://traffic-tracker.herokuapp.com/api/weeks/${this.$route.params.date}`);
    } else {
      await this.initData('https://traffic-tracker.herokuapp.com/api/weeks/current');
    }
    this.loading = false;
  },
  methods: {
    initData: async function (url) {
      const res = await fetch(url);
      this.week = await res.json();
    },
    async onPrev() {
      await this.initData(this.week._links.prev_week.href);
      await this.$router.push({name: 'week', params: {date: this.week.start_date}});
    },
    async onNext() {
      await this.initData(this.week._links.prev_week.href);
      await this.$router.push({name: 'week', params: {date: this.week.start_date}});
    },
    onDay() {
      this.$router.push({name: 'day', params: {date: this.week.start_date}});
    },
    onMonth() {
      this.$router.push({name: 'month', params: {year: this.week.year, month: this.week.month}});
    }
  }
}
</script>
