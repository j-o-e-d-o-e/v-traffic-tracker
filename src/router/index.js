import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home'
import Day from '../views/Day'
import Week from '../views/Week'
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
        component: Day
    },
    {
        path: '/week/:date?',
        name: 'week',
        component: Week
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

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
