<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email"/></p>
  <p><input type="password" placeholder="Password" v-model="password"/></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();
const db = getFirestore();  // Initialize Firestore

const signin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log("Firebase Sign in Successful!");
    console.log(auth.currentUser);

    const user = userCredential.user;

    // Get the user's role information from Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const userRole = userData.role;

      console.log("User Role: ", userRole);

      alert('Login Successful!');
      router.push("/about");

    } else {
      console.log("No such document!");
    }

  } catch (error) {
    console.log(error.code);
  }
};
</script>
