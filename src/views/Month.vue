<template>
  <section v-if="!loading">
    <Toolbar :back="!month.prev"
             @back="onPrev"
             :next="!month.next"
             @next="onNext"
             :down="{text: 'Weeks', disabled: false}"
             @down="onWeek"
             :up="{text: 'Year', disabled: false, show: true}"
             @up="onYear"/>
    <h1>{{ title }}</h1>
    <Flights :chart-data="month.days" :chart-labels="labels"></Flights>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
        <tr>
          <th>Total</th>
          <th>23:00-0:00h</th>
          <th>0:00-5:45h</th>
          <th>days &lt; 30 <i class="fa fa-plane"></i></th>
          <th>Avg altitude</th>
          <th>Avg speed</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ month.total }}</td>
          <td>{{ month.flights_23 }}</td>
          <td>{{ month.flights_0 }}</td>
          <td>{{ month.days_with_less_than_thirty_flights }}</td>
          <td>{{ month.avg_altitude }} m</td>
          <td>{{ month.avg_speed }} km/h</td>
        </tr>
        </tbody>
      </table>
    </div>
    <section v-if="month.departures">
      <hr>
      <h3>Departures</h3>
      <Departures :chartData="month.departures"></Departures>
      <h5>Top airports <small>(flights)</small></h5>
      <ol>
        <li v-for="airport in month.airports" :key="airport">
          <strong>{{ airport.name }}</strong> ({{ airport.flights }})
        </li>
      </ol>
    </section>
  </section>
</template>

<script>
import Toolbar from '../components/Toolbar'
import {toMonthName} from "@/util/Utils";
import Flights from "../components/LineChart"
import Departures from '../components/PieChart'

export default {
  name: 'Month',
  components: {
    Toolbar,
    Flights,
    Departures
  },
  data: function () {
    return {
      month: Object,
      loading: true
    };
  },
  computed: {
    title() {
      const date = new Date(this.month.start_date);
      return toMonthName(date) + ' ' + date.getFullYear();
    },
    labels() {
      let labels = [];
      let tmp = new Date(this.month.start_date);
      for (let i = 0; i < this.month.days.length; i++) {
        labels.push(tmp.toDateString().slice(0, 3) + tmp.toDateString().slice(7, 10));
        tmp.setDate(tmp.getDate() + 1);
      }
      return labels;
    }
  },
  async created() {
    if (this.$route.params.year && this.$route.params.month) {
      await this.initData(`https://traffic-tracker.herokuapp.com/api/months/${this.$route.params.year}/${this.$route.params.month}`);
    } else {
      await this.initData('https://traffic-tracker.herokuapp.com/api/months/current');
    }
    this.loading = false;
  },
  methods: {
    initData: async function (url) {
      const res = await fetch(url);
      this.month = await res.json();
    },
    async onPrev() {
      await this.initData(this.month._links.prev_month.href);
      await this.$router.push({name: 'month', params: {year: this.month.year, month: this.month.month}});
    },
    async onNext() {
      await this.initData(this.month._links.next_month.href);
      await this.$router.push({name: 'month', params: {year: this.month.year, month: this.month.month}});
    },
    onWeek() {
      this.$router.push({name: 'week', params: {date: this.month.start_date}});
    },
    onYear() {
      this.$router.push({name: 'year', params: {year: this.month.year}});
    }
  }
}
</script>
