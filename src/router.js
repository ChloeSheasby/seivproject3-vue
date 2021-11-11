import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import AdvisorList from './views/AdvisorList.vue';
import AdvisorEdit from './views/AdvisorEdit.vue';
import AdvisorAdd from './views/AdvisorAdd.vue';
import AdvisorView from './views/AdvisorView.vue';
import AdvisorHome from './views/AdvisorHome.vue';
import AdvisorStudents from './views/AdvisorStudents.vue';
import CourseList from "./views/CourseList.vue";
import CourseAdd from "./views/CourseAdd.vue";
import CourseEdit from "./views/CourseEdit.vue";
import CourseView from "./views/CourseView.vue";
import DegreeList from "./views/DegreeList.vue";
import DegreeEdit from "./views/DegreeEdit.vue";
import DegreeView from "./views/DegreeView.vue";
import DegreeAdd from "./views/DegreeAdd.vue";
import StudentList from "./views/StudentList.vue";
import StudentEdit from "./views/StudentEdit.vue";
import StudentView from "./views/StudentView.vue";
import StudentAdd from "./views/StudentAdd.vue";
import SemesterList from "./views/SemesterList.vue";
import SemesterEdit from "./views/SemesterEdit.vue";
import SemesterView from "./views/SemesterView.vue";
import SemesterAdd from "./views/SemesterAdd.vue";
import DegreeCourseList from "./views/DegreeCourseList.vue";
import DegreeCourseAdd from "./views/DegreeCourseAdd.vue";
import DegreeCourseEdit from "./views/DegreeCourseEdit.vue";
import DegreeCourseView from "./views/DegreeCourseView.vue";
import StudentCourseList from "./views/StudentCourseList.vue";
import StudentCourseAdd from "./views/StudentCourseAdd.vue";
import StudentCourseEdit from "./views/StudentCourseEdit.vue";
import StudentCourseView from "./views/StudentCourseView.vue";
import StudentHome from "./views/StudentHome.vue";
import StudentPlan from "./views/StudentPlan.vue";

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  base:
    process.env.NODE_ENV === 'development'? "/" : "/studentCoursePlan/",
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
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
      path: '/advisorStudents/:id',
      name: 'advisorStudents',
      component: AdvisorStudents,
      props: true
    },
    {
      path: '/advisorView/:id',
      name: 'advisorView',
      component: AdvisorView,
      props: true
    },
    {
      path: '/advisorHome/:id',
      name: 'advisorHome',
      component: AdvisorHome,
      props: true
    },
    {
      path: "/courseList/",
      name: "courseList",
      component: CourseList
    },
    {
      path: "/courseAdd",
      name: "courseAdd",
      component: CourseAdd
    },
    {
      path: "/courseEdit/:id",
      name: "courseEdit",
      component: CourseEdit,
      props: true
    },
    {
      path: '/courseView/:id',
      name: 'courseView',
      component: CourseView,
      props: true
    },
    {
      path: '/degreeList',
      name: 'degreeList',
      component: DegreeList
    },
    {
      path: '/degreeEdit/:id',
      name: 'degreeEdit',
      component: DegreeEdit,
      props: true
    },
    {
      path: '/degreeAdd',
      name: 'degreeAdd',
      component: DegreeAdd
    },
    {
      path: '/degreeView/:id',
      name: 'degreeView',
      component: DegreeView,
      props: true
    },
    {
      path: '/studentList',
      name: 'studentList',
      component: StudentList
    },
    {
      path: '/studentEdit/:id',
      name: 'studentEdit',
      component: StudentEdit,
      props: true
    },
    {
      path: '/studentAdd',
      name: 'studentAdd',
      component: StudentAdd
    },
    {
      path: '/studentView/:id',
      name: 'studentView',
      component: StudentView,
      props: true
    },
    {
      path: '/semesterList',
      name: 'semesterList',
      component: SemesterList
    },
    {
      path: '/semesterEdit/:id',
      name: 'semesterEdit',
      component: SemesterEdit,
      props: true
    },
    {
      path: '/semesterAdd',
      name: 'semesterAdd',
      component: SemesterAdd
    },
    {
      path: '/semesterView/:id',
      name: 'semesterView',
      component: SemesterView,
      props: true
    },
    {
      path: '/degreeCourseAdd',
      name: 'degreeCourseAdd',
      component: DegreeCourseAdd,
      props: true
    },
    {
      path: '/degreeCourseList',
      name: 'degreeCourseList',
      component: DegreeCourseList,
    },
    {
      path: '/degreeCourseEdit/:id',
      name: 'degreeCourseEdit',
      component: DegreeCourseEdit,
      props: true
    },
    {
      path: '/degreeCourseView/:id',
      name: 'degreeCourseView',
      component: DegreeCourseView,
      props: true
    },

    {
      path: '/studentCourseAdd',
      name: 'studentCourseAdd',
      component: StudentCourseAdd,
      props: true
    },
    {
      path: '/studentCourseList',
      name: 'studentCourseList',
      component: StudentCourseList,
    },
    {
      path: '/studentCourseEdit/:id',
      name: 'studentCourseEdit',
      component: StudentCourseEdit,
      props: true
    },
    {
      path: '/studentCourseView/:id',
      name: 'studentCourseView',
      component: StudentCourseView,
      props: true
    },
    {
      path: '/studentHome/:id',
      name: 'studentHome',
      component: StudentHome,
      props: true
    },
    {
      path: '/studentPlan/:id',
      name: 'studentPlan',
      component: StudentPlan,
      props: true
    }
    /*
    {
      path: '*',
      component: NotFoundComponent
    }
    */
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  if (authRequired && !loggedIn) {
    return next('/login')
  }
  next()
})

export default router;
