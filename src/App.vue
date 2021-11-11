<template>
  <v-app>
    <v-card class="overflow-hidden">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-title class="title">
        <div>Student Course Plan</div>    
      </v-app-bar-title>

      <template v-slot:extension v-if="this.$store.state.loginUser === null">
        <v-tabs align-with-title>
          <v-tab @click="navLogin">Login</v-tab>
        </v-tabs>
      </template>

      <template v-slot:extension v-else-if="(this.$store.state.loginUser.role === 'admin') || (this.$store.state.loginUser.role === 'advisor')">
        <v-tabs align-with-title>
          <v-tab @click="navAdvHome">Home</v-tab>
          <v-tab @click="navAdvStu">My Students</v-tab>
          <v-tab @click="navCourses">Courses</v-tab>
          <v-tab @click="navAdvisors">Advisors</v-tab>
          <v-tab @click="navDegrees">Degrees</v-tab>
          <v-tab @click="navStudents">Students</v-tab>
          <v-tab @click="navSemesters">Semesters</v-tab>
          <v-tab @click="logout">Logout</v-tab>
        </v-tabs>
      </template>

      <template v-slot:extension v-else-if="this.$store.state.loginUser.role === 'student'">
        <v-tabs align-with-title>
          <v-tab @click="navStuHome">Home</v-tab>
          <v-tab @click="navStuPlan">My Courses</v-tab>
          <v-tab @click="logout">Logout</v-tab>
        </v-tabs>
      </template>

    </v-app-bar>
  </v-card>
  <v-main>
      <router-view />
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
  data() {
      return {
        role: {},
      }
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
            navAdvStu() {
              this.$router.push({ name: 'advisorStudents', params: { id: this.$store.state.loginUser.advisorID } });
            },
            navStuHome() {
              this.$router.push({ name: 'studentHome', params: { id: this.$store.state.loginUser.studentID } });
            },
            navStuPlan() {
              this.$router.push({ name: 'studentPlan', params: { id: this.$store.state.loginUser.studentID } });
            },
            logout () {
              Utils.removeItem('user')
              router.push('/login')
            }
  },
};
</script>
