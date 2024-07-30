import { createRouter, createWebHistory } from 'vue-router';
import HomeBoard from '../components/HomeBoard.vue';
import UserProfile from '../components/UserProfile.vue';

const routes = [
    { path: '/', name: 'HomeBoard', component: HomeBoard },
    { path: '/user-profile', name: 'UserProfile', component: UserProfile },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;