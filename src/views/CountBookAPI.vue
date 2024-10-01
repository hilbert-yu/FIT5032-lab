<template>
    <div id="app" class="center">
        <pre>{{ jsondata }}</pre>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      jsondata: null,
      error: null,
    };
  },
  mounted() {
    this.getBookCountAPI();
  },
  methods: {
    async getBookCountAPI() {
        try {
            const response = await axios.get('https://countbooks-nouxoiitma-uc.a.run.app/countBooks');
            this.jsondata = response.data;
            this.error = null;
        } catch (error) {
            console.error('Error fetching book count:', error);
            this.error = error;
            this.count = null;
        }
    },
  },
};
</script>

<style>
.center {
  text-align: center;
}

button {
  margin: 20px auto; 
  display: block;
}
</style>