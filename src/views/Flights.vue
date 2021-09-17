<template>
  <section v-if="!loading">
    <Toolbar :back="prevPage"
             @back="onPrev"
             :next="nextPage"
             @next="onNext"
             :down="{text: 'Day', disabled: false}"
             @down="onDay"
             :up="{ show: false}"/>
    <h3>{{ title }}</h3>

    <div class="table-responsive">
      <table class="table table-striped table-bordered table-hover">
        <thead class="table-dark">
        <tr>
          <th>Time</th>
          <th>Plane</th>
          <th>Airline</th>
          <th>Departure</th>
          <th>Altitude (m)</th>
          <th>Speed (km/h)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="flight of flights._embedded.flightDtoes" :key="flight.id">
          <td>{{ flight.date_time.slice(11,16) }}</td>
          <td>{{ flight.icao_24 }}</td>
          <td>{{ flight.airline_name }}</td>
          <td>{{ flight.departure_name ? flight.departure_name : flight.departure_icao }}</td>
          <td>{{ flight.altitude }}</td>
          <td>{{ flight.speed }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import Toolbar from '../components/Toolbar'
import {toTitleDate} from "@/util/Utils";

export default {
  name: 'Flights',
  components: {
    Toolbar
  },
  data: function () {
    return {
      flights: Object,
      loading: true
    };
  },
  computed: {
    title() {
      return toTitleDate(this.$route.params.date);
    },
    prevPage(){
      return this.flights.page.number === 0;
    },
    nextPage(){
      return this.flights.page.number === this.flights.page.totalPages - 1;
    }
  },
  async created() {
    await this.initData(`https://traffic-tracker.herokuapp.com/api/flights/${this.$route.params.date}`);
    this.loading = false;
  },
  methods: {
    async initData(url) {
      const res = await fetch(url);
      this.flights = await res.json();
      // this.$set(this.flights, 'flights.page', this.flights.page)
    },
    async onPrev() {
      await this.initData(this.flights._links.prev.href);
    },
    async onNext() {
      await this.initData(this.flights._links.next.href);
    },
    onDay() {
      this.$router.push({name: 'day', params: {date: this.$route.params.date}});
    }
  }
}
</script>
