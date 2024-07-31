import { createRouter, createWebHistory } from 'vue-router';
import HomeBoard from '../components/HomeBoard.vue';
import UserProfile from '../components/UserProfile.vue';
import AdDetail from '@/components/AdDetail.vue';

const routes = [
    { path: '/', name: 'HomeBoard', component: HomeBoard },
    { path: '/user-profile', name: 'UserProfile', component: UserProfile },
    { path: '/ad/:id', component: AdDetail, props: true }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;