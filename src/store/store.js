import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
    roles: null // Added to store roles
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    setUser(state, user) {
      state.user = user;
    },
    setRoles(state, roles) {
      state.roles = roles; // Store roles in state
    }
  },
  actions: {
    login({ commit }, { user, roles }) {
      commit('setAuthentication', true);
      commit('setUser', user);
      commit('setRoles', roles); // Commit roles to store
    },
    logout({ commit }) {
      commit('setAuthentication', false);
      commit('setUser', null);
      commit('setRoles', null);
    }
  },
});
