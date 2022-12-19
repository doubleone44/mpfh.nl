// router file
import Vue from 'vue';
import VueRouter from 'vue-router';
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

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
});

export default router;
