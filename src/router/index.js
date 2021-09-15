import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home'
import Day from '../views/Day'
import Forecast from '../views/Forecast'
import Stats from '../views/Stats'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/day',
        name: 'Day',
        component: Day
    },
    {
        path: '/forecast',
        name: 'Forecast',
        component: Forecast
    },
    {
        path: '/stats',
        name: 'Stats',
        component: Stats
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
