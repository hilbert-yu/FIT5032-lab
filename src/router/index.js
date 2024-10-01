import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSignin from '../views/FirebaseSigninView.vue'
import FirebaseRegiter from '../views/FirebaseRegisterView.vue'
import Admin from '../views/AdminView.vue'
import AddBookView from '../views/AddBookView.vue';
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSignin
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegiter
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/get-all-books',
    name: 'GetAllBooks',
    component: GetAllBookAPI
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const db = getFirestore();
  let user = auth.currentUser;

  if (!user) {
    // Use onAuthStateChanged to ensure up-to-date user status
    await new Promise((resolve) => {
      onAuthStateChanged(auth, (u) => {
        user = u;
        resolve();
      });
    });
  }

  if (user && (to.path === '/FireLogin' || to.path === '/FireRegister')) {
    console.log("User is already logged in, redirecting to home page.");
    alert("Already logged in!");
    return next('/');
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user) {
      console.log("User status: not logged in -> redirecting to login page.");
      alert("Please login first!");
      return next('/FireLogin');
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userRole = docSnap.data().role;
            console.log(`User role is ${userRole}`);
            if (userRole === 'admin') {
              return next(); 
            } else {
              alert('Not admin, redirecting to home page.');
              return next('/'); 
            }
          } else {
            console.log("No user role found, redirecting to home page.");
            return next('/'); 
          }
        } catch (error) {
          console.error("Error fetching user role: ", error);
          return next('/'); 
        }
      } else {
        return next(); 
      }
    }
  } else {
    return next(); 
  }
});

export default router;