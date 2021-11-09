<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>

    <div v-if="this.$store.state.loginUser !== null" class="navbar">
        <router-link to="home">Home </router-link>|
        <router-link to="/login">Login </router-link>|
        <a href="#" v-if="this.$store.state.loginUser !== null" @click.prevent="logout" class="tablinks">Logout</a>
        <div v-if="this.$store.state.loginUser.role === 'admin'"> 
          <router-link :to="{ name: 'advisorHome', params: { id: this.$store.state.loginUser.advisorID } }">Advisor Home </router-link>|
          <router-link to="/courseSearch">Course Search </router-link>|
          <router-link to="/courseList">Courses </router-link>|
          <router-link to="/advisorList">Advisors </router-link>|
          <router-link to="/degreeList">Degrees </router-link>|
          <router-link to="/studentList">Students </router-link>|
          <router-link to="/semesterList">Semesters </router-link>|
          <router-link to="/degreeCourseList">Degree Courses </router-link>|
          <router-link to="/studentCourseList">Student Courses </router-link>
        </div>
        <div v-if="this.$store.state.loginUser.role === 'advisor'">
          <router-link :to="{ name: 'advisorHome', params: { id: this.$store.state.loginUser.advisorID } }">Advisor Home </router-link>
        </div>
        <div v-if="this.$store.state.loginUser.role === 'student'">
          <router-link :to="{ name: 'studentHome', params: { id: this.$store.state.loginUser.studentID } }">Student Home </router-link>
        </div>
     </div>

      <router-view />
    <v-main>
    </v-main>
  </v-app>
</template>

<script>
import router from '@/router'
import Utils from '@/config/utils'

export default {
  name: 'App',

  components: {
  },

  methods: {
    logout () {
      Utils.removeItem('user')
      router.push('/login')
    }
  },

  data: () => ({
    //
  }),
};
</script>
