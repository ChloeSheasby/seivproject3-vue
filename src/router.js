import Vue from 'vue'
import Router from 'vue-router'

import List from "@/views/CourseList.vue";
import Search from "@/views/CourseSearch.vue";
import Add from "@/views/CourseAdd.vue";
import Edit from "@/views/CourseEdit.vue";
import Course from "@/views/CourseView.vue";
/* import AdvisorList from './views/AdvisorList.vue'
import AdvisorEdit from './views/AdvisorEdit.vue'
import AdvisorAdd from './views/AdvisorAdd.vue'
import AdvisorView from './views/AdvisorView.vue' */

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:
    process.env.NODE_ENV === 'development'? "/" : "/project3-api/",
  routes: [
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
    },
    /* {
      path: '/advisorList',
      name: 'advisorList',
      component: AdvisorList
    },
    {
      path: '/advisorEdit/:id',
      name: 'advisorEdit',
      component: AdvisorEdit,
      props: true
    },
    {
      path: '/advisorAdd',
      name: 'advisorAdd',
      component: AdvisorAdd
    },
    { 
      path: '/advisorView',
      name: 'advisorView',
      component: AdvisorView
    }*/
    /*
    {
      path: '*',
      component: NotFondComponent
    }
    */
  ]
})
