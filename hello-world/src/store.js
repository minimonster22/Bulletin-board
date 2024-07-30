import { createStore } from 'vuex';

export default createStore({
    state: {
        username: '',
        password: '',
        focusedField: null,
        loading: false
    },
    mutations: {
        setUsername(state, username) {
            console.log('setUsername mutation called with:', username);
            state.username = username;
        },
        setPassword(state, password) {
            console.log('setPassword mutation called with:', password);
            state.password = password;
        },
        setFocusedField(state, field) {
            console.log('setFocusedField mutation called with:', field);
            state.focusedField = field;
        },
        setLoading(state, loading) {
            console.log('setLoading mutation called with:', loading);
            state.loading = loading;
        }
    },
    actions: {
        updateUsername({ commit }, username) {
            console.log('updateUsername action called with:', username);
            commit('setUsername', username);
        },
        updatePassword({ commit }, password) {
            console.log('updatePassword action called with:', password);
            commit('setPassword', password);
        },
        updateFocusedField({ commit }, field) {
            console.log('updateFocusedField action called with:', field);
            commit('setFocusedField', field);
        },
        login({ commit }) {
            console.log('login action called');
            commit('setLoading', true);
            setTimeout(() => {
                commit('setLoading', false);
            }, 2000);
        }
    }
});
