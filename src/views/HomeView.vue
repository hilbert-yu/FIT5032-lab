<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div>
            <h1>Welcome to the Week7 Home Page</h1>
          </div>

          <!-- <form @submit.prevent="submitForm">
            <div class="row mb-3">
  
              <div class="row mb-4 align-items-start">
                <div class="col-md-6 col-sm-6">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" class="form-control" id="username" 
                  @blur="() => validateName(true)"
                  @input="() => validateName(true)"
                  v-model="formData.username">
                  <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                </div>
  
                <div class="col-md-6 col-sm-6">
                  <label for="gender" class="form-label">Gender</label>
                  <select class="form-select" id="gender" 
                    @blur="() => validateGender(true)"
                    @change="() => validateGender(false)"
                    v-model="formData.gender">
                    <option value="" disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
                </div>
              </div>
  
              <div class="row mb-3 align-items-start">
                <div class="col-md-6 col-sm-6">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password"
                    @blur="() => validatePassword(true)"
                    @input="() => validatePassword(false)"
                    v-model="formData.password" />
                  <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                </div>
  
                <div class="col-md-6 col-sm-6">
                  <label for="confirm-password" class="form-label">Confirm password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="confirm-password"
                    v-model="formData.confirmPassword"
                    @blur="() => validateConfirmPassword(true)"
                  />
                  <div v-if="errors.confirmPassword" class="text-danger">
                    {{ errors.confirmPassword }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6 col-sm-6">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="isAustralian" v-model="formData.isAustralian">
                  <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                  <div>
                    <small class="text-muted">Please check this box if you are an Australian resident.</small>
                  </div>
                </div>
              </div>
              
              
            </div>
            <div class="mb-3">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea class="form-control" id="reason" rows="3" 
                @blur="() => validateReason(true)"
                @input="() => validateReason(false)"
                v-model="formData.reason">
              </textarea>
              <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
              <div v-if="friendMessage" class="text-success">{{ friendMessage }}</div>
            </div>
  
            <div class="mb-3">
              <label for="suburb" class="form-label">Suburb</label>
              <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
            </div>
  
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Submit</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
          
          <div class="row mt-5" v-if="submittedCards.length">
            <DataTable :value="submittedCards" responsiveLayout="scroll" class="p-datatable-gridlines">
              <Column field="username" header="Username"></Column>
              <Column field="password" header="Password"></Column>
              <Column field="isAustralian" header="Australian Resident"></Column>
              <Column field="gender" header="Gender"></Column>
              <Column field="reason" header="Reason"></Column>
            </DataTable>
          </div> -->
        </div>
      </div>
    </div>
  
    <!-- <div class="row mt-5" v-if="submittedCards.length" style="margin-left: 12rem; margin-right: 12rem;">
      <div class="d-flex flex-wrap justify-content-start">
        <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem;">
          <div class="card-header">
              User Information
          </div>
          <ul class="list-group list-group-flush">
              <li class="list-group-item">Username: {{ card.username }}</li>
              <li class="list-group-item">Password: {{ card.password }}</li>
              <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
              <li class="list-group-item">Gender: {{ card.gender }}</li>
              <li class="list-group-item">Reason: {{ card.reason }}</li>
          </ul>
        </div>
      </div>
    </div> -->
  
  </template>
  
  <!-- <script setup>
    import { ref } from 'vue';
    import DataTable from 'primevue/datatable'; 
    import Column from 'primevue/column';
      
    const formData = ref({
      username: '',
      password: '',
      confirmPassword: '',
      isAustralian: false,
      reason: '',
      gender: '',
      suburb: 'Clayton'
    });
  
    const submittedCards = ref([]);
  
    const submitForm = () => {
      validateName(true);
      validatePassword(true);
      validateGender(true);
      validateReason(true);
  
      if (!errors.value.username && !errors.value.password && !errors.value.gender && !errors.value.reason) {
        submittedCards.value.push({ ...formData.value });
        clearForm();
      }
    };
  
    const clearForm = () => {
      formData.value = {
        username: '',
        password: '',
        confirmPassword: '',
        isAustralian: false,
        reason: '',
        gender: '',
        suburb: ''
      };
    };
  
    const errors = ref({
      username: null,
      password: null,
      confirmPassword: null,
      resident: null,
      gender: null,
      reason: null
  })
  
    const validateName = (blur) => {
      if (formData.value.username.length < 3) {
        if (blur) errors.value.username = "Name must be at least 3 characters.";
      } else if (formData.value.username.length > 20) {
        if (blur) errors.value.username = "Name cannot be more than 20 characters.";
      } else {
        errors.value.username = null;
      }
    };
  
    const validatePassword = (blur) => {
      const password = formData.value.password;
      const minLength = 8;
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
      if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
      } else if (!hasUppercase) {
        if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
      } else if (!hasLowercase) {
        if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
      } else if (!hasNumber) {
        if (blur) errors.value.password = "Password must contain at least one number.";
      } else if (!hasSpecialChar) {
        if (blur) errors.value.password = "Password must contain at least one special character.";
      } else {
        errors.value.password = null;
      }
    };
  
    const validateConfirmPassword = (blur) => {
      if (formData.value.password !== formData.value.confirmPassword) {
        if (blur) errors.value.confirmPassword = 'Passwords do not match.'
      } else {
        errors.value.confirmPassword = null
      }
    }
  
    const validateGender = (blur) => {
      if (!formData.value.gender) {
        if (blur) errors.value.gender = "Please select a gender.";
      } else {
        errors.value.gender = null;
      }
    };
  
    const friendMessage = ref(null);
  
    const validateReason = (blur) => {
      const trimmedReason = formData.value.reason.trim();
  
      if (formData.value.reason.length < 10) {
        if (blur) errors.value.reason = "Reason must be at least 10 characters long.";
      } else if (formData.value.reason.length > 200) {
        if (blur) errors.value.reason = "Reason cannot exceed 200 characters.";
      } else if (trimmedReason === '') {
      if (blur) errors.value.reason = "Reason cannot be empty or just spaces.";
      } else {
        errors.value.reason = null;
  
        // Check if the word "friend" is included in the reason
        if (trimmedReason.toLowerCase().includes('friend')) {
          friendMessage.value = "Great to have a friend";
        } else {
          friendMessage.value = null;
        }
      }
    }; 
  
  </script> -->
  <script>
  import { getAuth } from 'firebase/auth';
  
  export default {
    // mounted() {
    //   const auth = getAuth();
    //   console.log("current user: ", auth.currentUser);
    // }, 
    computed: {
      userRole() {
        return this.$store.state.userRole;
      }
    }
  };
  </script>  
  
  <!-- <style scoped>
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
  