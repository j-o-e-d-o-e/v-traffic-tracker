import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home'
import Day from '../views/Day'
import Week from '../views/Week'
import Month from '../views/Month'
import Year from '../views/Year'
import Flights from '../views/Flights'
import Forecast from '../views/Forecast'
import Stats from '../views/Stats'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/day/:date?',
        name: 'day',
        component: Day,
        props: true
    },
    {
        path: '/week/:date?',
        name: 'week',
        component: Week
    },
    {
        path: '/month/:year?/:month?',
        name: 'month',
        component: Month
    },
    {
        path: '/year/:year?',
        name: 'year',
        component: Year
    },
    {
        path: '/flights/:date',
        name: 'flights',
        component: Flights
    },
    {
        path: '/forecast',
        name: 'forecast',
        component: Forecast
    },
    {
        path: '/stats',
        name: 'stats',
        component: Stats
    },
]

export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
