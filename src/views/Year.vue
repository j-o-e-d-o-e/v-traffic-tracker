<template>
  <section v-if="!loading">
    <Toolbar :back="!year.prev"
             @back="onPrev"
             :next="!year.next"
             @next="onNext"
             :down="{text: 'Months', disabled: false}"
             @down="onMonth"
             :up="{show: false}"/>
    <h1>{{ title }}</h1>
    <Flights :chart-data="year.months" :chart-labels="labels"></Flights>
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
          <td>{{ year.total }}</td>
          <td>{{ year.flights_23 }}</td>
          <td>{{ year.flights_0 }}</td>
          <td>{{ year.days_with_less_than_thirty_flights }}</td>
          <td>{{ year.avg_altitude }} m</td>
          <td>{{ year.avg_speed }} km/h</td>
        </tr>
        </tbody>
      </table>
    </div>
    <section v-if="year.departures">
      <hr>
      <h3>Departures</h3>
      <Departures :chartData="year.departures"></Departures>
      <h5>Top airports <small>(flights)</small></h5>
      <ol>
        <li v-for="airport in year.airports" :key="airport">
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
  name: 'Year',
  components: {
    Toolbar,
    Flights,
    Departures
  },
  data: function () {
    return {
      year: Object,
      loading: true
    };
  },
  computed: {
    title() {
      return this.year.year;
    },
    labels() {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
  },
  async created() {
    if (this.$route.params.year) {
      await this.initData(`https://traffic-tracker.herokuapp.com/api/years/${this.$route.params.year}`);
    } else {
      await this.initData('https://traffic-tracker.herokuapp.com/api/years/current');
    }
    this.loading = false;
  },
  methods: {
    initData: async function (url) {
      const res = await fetch(url);
      this.year = await res.json();
    },
    async onPrev() {
      await this.initData(this.year._links.prev_year.href);
      await this.$router.push({name: 'year', params: {year: this.year.year}});
    },
    async onNext() {
      await this.initData(this.year._links.next_year.href);
      await this.$router.push({name: 'year', params: {year: this.year.year}});
    },
    onMonth() {
      this.$router.push({name: 'month', params: {year: this.year.year, month: 1}});
    }
  }
}
</script>
