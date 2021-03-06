<template>
  <div v-if="!loading">
    <h3>
      Days
    </h3>
    <ul>
      <li>
        <strong>Total flights</strong> (09.09.2019-09.09.2021): {{ stats.total }}
      </li>
      <li>
        <strong>Most flights</strong>: {{ stats.day_with_most_flights.stats }} on
        <span>{{ stats.day_with_most_flights.day.date }}</span>
      </li>
      <li>
        <strong>Most flights within one hour</strong>: {{ stats.day_with_most_flights_within_one_hour.stats }} on
        <span>{{ stats.day_with_most_flights_within_one_hour.day.date }}</span>
      </li>
      <li>
        <strong>Less than thirty flights</strong>: {{ stats.days_with_less_than_thirty_flights }}%
      </li>
      <li>
        <strong>Hours with no flights</strong> (6:00-23:00h): {{ stats.hours_with_no_flights }}%
      </li>
    </ul>

    <hr>
    <h3>
      Departures <br> <small>(09.09.2019-09.09.2021)</small>
    </h3>
    <Departures :chartData="this.stats.departures"></Departures>

    <hr>
    <h3>
      Flights <small>(last 60 days)</small>
    </h3>
    <ul>
      <li>
        <strong>Most flights</strong>: {{ stats.plane_with_most_flights.stats }} by plane
        "<span>{{ stats.plane_with_most_flights.icao }}</span>"
      </li>
      <li>
        <strong>Most flights within one day</strong>: {{ stats.plane_with_most_flights_within_one_day.stats }} by plane
        "<span>{{ stats.plane_with_most_flights_within_one_day.icao }}</span>"
        on <span>{{ stats.plane_with_most_flights_within_one_day.day.date }}</span>
      </li>
      <li>
        <strong>Max altitude</strong>: {{ stats.max_altitude.altitude }} m by plane
        "<span>{{ stats.max_altitude.icao_24 }}</span>"
        on <span>{{ stats.max_altitude.date }}</span>
      </li>
      <li>
        <strong>Min altitude</strong>: {{ stats.min_altitude.altitude }} m by plane
        "<span>{{ stats.min_altitude.icao_24 }}</span>"
        on <span>{{ stats.min_altitude.date }}</span>
      </li>
      <li>
        <strong>Max speed</strong>: {{ stats.max_speed.speed }} km/h by plane
        "<span>{{ stats.max_speed.icao_24 }}</span>"
        on <span>{{ stats.max_speed.date }}</span>
      </li>
      <li>
        <strong>Min speed</strong>: {{ stats.min_speed.speed }} km/h by plane
        "<span>{{ stats.min_speed.icao_24 }}</span>"
        on <span>{{ stats.min_speed.date }}</span>
      </li>
    </ul>
    <h4>Top airlines <small>(flights)</small></h4>
    <ol>
      <li v-for="airline in stats.airlines" :key="airline">
        <strong>{{ airline.name }}</strong> ({{ airline.flights }})
      </li>
    </ol>

    <hr>
    <h3>
      Forecasts <small>(last 30 days)</small>
    </h3>
    <ul>
      <li>
        <strong>Precision</strong>: {{ stats.score.precision }}%
      </li>
      <li>
        <strong>Recall</strong>: {{ stats.score.recall }}%
      </li>
      <li>
        <strong>Mean absolute error</strong>: {{ stats.score.mean_abs_error }}%
      </li>
    </ul>

    <div class="table-responsive">
      <table class="table table-sm table-striped table-bordered table-hover">
        <thead class="table-dark">
        <tr>
          <th></th>
          <th>No flights predicted</th>
          <th>Flights predicted</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">Actual no flights</th>
          <td>{{ stats.score.confusion_matrix[0][0] ? stats.score.confusion_matrix[0][0] : 0 }}</td>
          <td>{{ stats.score.confusion_matrix[0][1] ? stats.score.confusion_matrix[0][1] : 0 }}</td>
        </tr>
        <tr>
          <th scope="row">Actual flights</th>
          <td>
            {{
              stats.score.confusion_matrix.length > 1 && stats.score.confusion_matrix[1][0] ? stats.score.confusion_matrix[1][0] : 0
            }}
          </td>
          <td>
            {{
              stats.score.confusion_matrix.length > 1 && stats.score.confusion_matrix[1][1] ? stats.score.confusion_matrix[1][1] : 0
            }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Departures from "../components/PieChart"
import {toTitleDate} from "@/util/Utils";

export default {
  name: 'Stats',
  data: function () {
    return {
      stats: Object,
      loading: true,
    };
  },
  components: {
    Departures
  },
  methods: {
    fetch: async function () {
      const res = await fetch('https://traffic-tracker.herokuapp.com/api/stats');
      return res.json();
    }
  },
  async created() {
    this.stats = await this.fetch();
    this.stats.day_with_most_flights.day.date = toTitleDate(this.stats.day_with_most_flights.day.date);
    this.stats.day_with_most_flights_within_one_hour.day.date = toTitleDate(this.stats.day_with_most_flights_within_one_hour.day.date);
    this.stats.plane_with_most_flights_within_one_day.day.date = toTitleDate(this.stats.plane_with_most_flights_within_one_day.day.date);
    this.stats.max_altitude.date = toTitleDate(this.stats.max_altitude.date);
    this.stats.min_altitude.date = toTitleDate(this.stats.min_altitude.date);
    this.stats.max_speed.date = toTitleDate(this.stats.max_speed.date);
    this.stats.min_speed.date = toTitleDate(this.stats.min_speed.date);
    this.loading = false;
  }
}
</script>
