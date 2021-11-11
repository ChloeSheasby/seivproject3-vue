<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Student Course Plan</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab @click="navLogin">Login</v-tab>
          <div v-if="this.$store.state.loginUser !== null" class="navbar">
            <v-tab @click="navHome">Home</v-tab>
            <v-tab @click="navLogin">Logout</v-tab>
            <div v-if="this.$store.state.loginUser.role === 'admin'"> 
              <v-tab @click="navAdvHome">Advisor Home</v-tab>
              <v-tab @click="navCourses">Courses</v-tab>
              <v-tab @click="navAdvisors">Advisors</v-tab>
              <v-tab @click="navDegrees">Degrees</v-tab>
              <v-tab @click="navStudents">Students</v-tab>
              <v-tab @click="navSemesters">Semesters</v-tab>
            </div>
          <div v-if="this.$store.state.loginUser.role === 'advisor'">
            <v-tab @click="navAdvHome">Advisor Home</v-tab>          
          </div>
          <div v-if="this.$store.state.loginUser.role === 'student'">
              <v-tab @click="navStuHome">Student Home</v-tab>

            <router-link :to="{ name: 'studentHome', params: { id: this.$store.state.loginUser.studentID } }">Student Home </router-link>
          </div>
        </div>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-card>
</template>

<script>
    import router from '../router'
    import Utils from '../config/utils'

    export default {
        props: {
        },
        created() {
            },
        methods: {
            navHome() {
              this.$router.push({ name: "home"});
            },
            navLogin() {
              this.$router.push({ name: "login"});
            },
            navCourses() {
              this.$router.push({ name: "courseList"});
            },
            navAdvisors() {
              this.$router.push({ name: "advisorList"});
            },
            navStudents() {
              this.$router.push({ name: "studentList"});
            },
            navDegrees() {
              this.$router.push({ name: "degreeList"});
            },
            navSemesters() {
              this.$router.push({ name: "semesterList"});
            },
            navAdvHome() {
              this.$router.push({ name: 'advisorHome', params: { id: this.$store.state.loginUser.advisorID } });
            },
            navStuHome() {
              this.$router.push({ name: 'studentHome', params: { id: this.$store.state.loginUser.studentID } });
            },
            logout () {
              Utils.removeItem('user')
              router.push('/login')
            }
        }
    }
</script>