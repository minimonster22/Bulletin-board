import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        username: '',
        password: '',
        focusedField: null,
        loading: false,
        isAuthenticated: false
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setPassword(state, password) {
            state.password = password;
        },
        setFocusedField(state, field) {
            state.focusedField = field;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        }
    },
    actions: {
        updateUsername({ commit }, username) {
            commit('setUsername', username);
        },
        updatePassword({ commit }, password) {
            commit('setPassword', password);
        },
        updateFocusedField({ commit }, field) {
            commit('setFocusedField', field);
        },
        async login({ commit, state }) {
            commit('setLoading', true);
            try {
                const response = await axios.post('http://localhost:3000/login', {
                    username: state.username,
                    password: state.password
                });

                if (response.status === 200) {
                    commit('setAuthenticated', true);
                    console.log('Login successful:', response.data);
                }
            } catch (error) {
                console.error('Login failed:', error);
                commit('setAuthenticated', false);
            } finally {
                commit('setLoading', false);
            }
        },
        async checkAuth({ commit }) {
            try {
                const response = await axios.get('http://localhost:3000/check-auth', { withCredentials: true });
                commit('setAuthenticated', response.data.isAuthenticated);
            } catch (error) {
                console.error('Error checking auth status:', error);
                commit('setAuthenticated', false);
            }
        },
        logout({ commit }) {
            axios.post('http://localhost:3000/logout');
            commit('setAuthenticated', false);
        }
    }
});
