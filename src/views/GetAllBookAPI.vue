<template>
    <div>
      <h1>All Books</h1>
      <pre v-if="books">{{ books }}</pre>
      <p v-else>Loading books...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        books: null,
      };
    },
    async created() {
      try {
        const response = await axios.get('https://getallbooks-nouxoiitma-uc.a.run.app/getAllBooks');
        this.books = response.data;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
  };
  </script>
  
  <style scoped>

  </style>
  