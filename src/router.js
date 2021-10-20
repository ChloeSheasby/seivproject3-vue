import Vue from 'vue'
import Router from 'vue-router'
import AdvisorList from './views/AdvisorList.vue'
import AdvisorEdit from './views/AdvisorEdit.vue'
import AdvisorAdd from './views/AdvisorAdd.vue'
import AdvisorView from './views/AdvisorView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:
    process.env.NODE_ENV === 'development'? "/" : "/project3-api/",
  routes: [
    {
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
    }
    /*
    {
      path: '*',
      component: NotFondComponent
    }
    */
  ]
})
