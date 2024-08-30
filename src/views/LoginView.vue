<template>
    <div class="login-container d-flex align-items-center justify-content-center vh-75">
      <div class="card p-4 shadow-sm">
        <h1 class="card-title text-center mb-4">Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input v-model="username" id="username" type="text" class="form-control" placeholder="Enter your username" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input v-model="password" id="password" type="password" class="form-control" placeholder="Enter your password" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
setup() {
    const username = ref('');
    const password = ref('');
    const store = useStore();
    const router = useRouter();

    const handleLogin = () => {
    const hardcodedUsername = 'asd';
    const hardcodedPassword = '123123';

    if (username.value === hardcodedUsername && password.value === hardcodedPassword) {
        store.dispatch('login', username.value);
        router.push({ name: 'Home' });
    } else {
        alert('Invalid credentials!');
    }
    };

    return {
    username,
    password,
    handleLogin,
    };
},
};
</script>
  
<style scoped>
.login-container {
  /* background-color: #f8f9fa; */
  margin-top: 50px;
}

.card {
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
}

.form-control {
  border-radius: 5px;
}

.btn {
  border-radius: 5px;
}
</style>