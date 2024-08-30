<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/Login" class="nav-link" active-class="active" v-if="!isAuthenticated">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <button @click="logout" class="btn btn-outline-danger nav-link custom-button">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    // Compute whether the user is authenticated
    const isAuthenticated = computed(() => store.state.isAuthenticated);

    // Define the logout function
    const logout = () => {
      store.dispatch('logout');
      router.push({ name: 'Login' });
    };

    return {
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style scoped>
.custom-button {
  color: black;
  margin-left: 8px;
}
</style>
