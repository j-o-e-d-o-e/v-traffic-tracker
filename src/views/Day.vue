<template>
  <section v-if="!loading">
    <Toolbar :back="!day.prev"
             @back="onPrev"
             :next="!day.next"
             @next="onNext"
             :down="{text: 'Flights', disabled: !day.flights}"
             @down="onFlights"
             :up="{text: 'Week', disabled: false, show: true}"
             @up="onWeek"/>
    <h3>{{ title }}</h3>
    <Flights :chart-data="day.hours_flight" :chart-labels="labels"></Flights>
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
    <section v-if="day.departures && day.date !=='2021-09-09'">
      <hr>
      <h3>Departures</h3>
      <Departures :chartData="day.departures"></Departures>
      <h5>Top airports <small>(flights)</small></h5>
      <ol>
        <li v-for="airport in day.airports" :key="airport">
          <strong>{{ airport.name }}</strong> ({{ airport.flights }})
        </li>
      </ol>
    </section>
  </section>
</template>

<script>
import Toolbar from '../components/Toolbar'
import {toTitleDate} from "@/util/Utils";
import Flights from "../components/LineChart"
import Departures from "../components/PieChart"

export default {
  name: 'Day',
  components: {
    Toolbar,
    Flights,
    Departures
  },
  data: function () {
    return {
      day: Object,
      loading: true
    };
  },
  computed: {
    title() {
      return toTitleDate(this.day.date);
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
    if (!this.$route.params.date) {
      await this.initData('https://traffic-tracker.herokuapp.com/api/days/current');
    } else {
      await this.initData(`https://traffic-tracker.herokuapp.com/api/days/${this.$route.params.date}`);
    }
    this.loading = false;
  },
  methods: {
    async initData(url) {
      const res = await fetch(url);
      this.day = await res.json();
    },
    async onPrev() {
      await this.initData(this.day._links.prev_day.href);
      await this.$router.push({name: 'day', params: {date: this.day.date}});
    },
    async onNext() {
      await this.initData(this.day._links.next_day.href);
      await this.$router.push({name: 'day', params: {date: this.day.date}});
    },
    onFlights() {
      this.$router.push({name: 'flights', params: {date: this.day.date}});
    },
    onWeek() {
      this.$router.push({name: 'week', params: {date: this.day.date}});
    }
  }
}
</script>
