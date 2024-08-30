<template>
    <div class="access-denied">
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page. Please <router-link to="/login">login</router-link>.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AccessDeniedView',
  };
  </script>
  
  <style>
  .access-denied {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  