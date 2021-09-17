<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Traffic tracker</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">

        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link active" aria-current="page">Home</router-link>
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
          <li class="nav-item">
            <a class="nav-link" href="https://traffic-tracker.herokuapp.com/swagger-ui/index.html" target="_blank">Swagger</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://traffic-tracker.herokuapp.com/graphiql" target="_blank">GraphiQL</a>
          </li>
        </ul>

      </div>
    </div>
  </nav>
  <br>
</template>
