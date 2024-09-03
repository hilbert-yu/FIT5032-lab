<template>
  <div class="container">
    <h1>Access Denied</h1>
    <p>You do not have permission to view this page.</p>
    <router-link to="/">Return to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "AccessDeniedView",
};
</script>

<style scoped>
.container {
  margin-top: 50px;
  text-align: center;
}
</style>
