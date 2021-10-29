<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      
      <!-- <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>

    <div v-if="this.$store.state.loginUser !== null" class="navbar">
        <router-link to="home">Home </router-link>|
        <router-link to="/login">Login </router-link>|
        <a href="#" v-if="this.$store.state.loginUser !== null" @click.prevent="logout" class="tablinks">Logout</a>
        <div v-if="this.$store.state.loginUser.role === 'admin'">
          <router-link to="/courseSearch">Course Search </router-link>|
          <router-link to="/courseList">Course List </router-link>|
          <router-link to="/courseAdd">Course Add </router-link>|
          <router-link to="/advisorList">Advisor List </router-link>|
          <router-link to="/advisorAdd">Advisor Add </router-link>|
          <router-link to="/degreeList">Degree List </router-link>|
          <router-link to="/degreeAdd">Degree Add </router-link>|
          <router-link to="/studentList">Student List </router-link>|
          <router-link to="/studentAdd">Student Add </router-link>|
          <router-link to="/semesterList">Semester List </router-link>|
          <router-link to="/semesterAdd">Semester Add </router-link>|
          <router-link to="/degreeCourseList">Degree Course List </router-link>|
          <router-link to="/degreeCourseAdd">Degree Course Add </router-link>
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
