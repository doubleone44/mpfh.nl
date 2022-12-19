// router file
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue';
import Synth from './views/Synth.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/synth',
        name: 'Synth',
        component: Synth
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
