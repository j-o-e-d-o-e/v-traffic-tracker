<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="navbar-brand">Traffic tracker</div>
    <div class="collapse navbar-collapse mr-auto">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/day" class="nav-link">Data</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/forecast" class="nav-link">Forecast</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/stats" class="nav-link">Stats</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="https://traffic-tracker.herokuapp.com/swagger-ui/index.html" target="_blank">Swagger</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://traffic-tracker.herokuapp.com/graphiql" target="_blank">GraphiQL</a>
        </li>
      </ul>
    </div>
  </nav>
  <br>
</template>
