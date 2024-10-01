<script setup>
// import BHeader from './components/BHeader.vue'
</script>

<template>
  <!-- <JSON /> -->
  <!-- <Form /> -->
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader />
    </header>

    <main class="main-box">
      <router-view />
    </main>
  </div>

</template>

<script>
import BHeader from './components/BHeader.vue';
import CountBookAPI from './views/CountBookAPI.vue';

export default {
  name: 'App',
  components: {
    BHeader,
    CountBookAPI
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookAPI';
    }
  }
};
</script>

<!-- <style scoped>
  .section-title {
    text-align: center;
  }

  .section-description {
    text-align: center;
  }

  h1, p {
    text-align: center;
  }

  .card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .card-header {
    background-color: #275FDA;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
  }
  .list-group-item {
    padding: 10px;
  }
</style> -->


