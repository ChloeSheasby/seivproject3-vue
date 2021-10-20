import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'
import PageNotFound from '@/components/PageNotFound'
//import List from "@/views/CourseList.vue";
//import Search from "@/views/CourseSearch.vue";
//import Add from "@/views/CourseAdd.vue";
//import Edit from "@/views/CourseEdit.vue";
//import Course from "@/views/CourseView.vue";

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound
  }/*,
  {
    path: "/",
    name: "List",
    component: List
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/add",
    name: "Add",
    component: Add
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: Edit,
    props: true
  },
  {
    path: '/course/:id',
    name: 'Course',
    component: Course,
    props: true
  }*/
];

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/signup']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  if (authRequired && !loggedIn) {
    return next('/login')
  }
  next()
})

export default router;