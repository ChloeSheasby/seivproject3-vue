<template>
  <div>
    <h3 class="name-tag">Viewing Courses for Student {{ this.student.fName }} {{ this.student.lName }} </h3>
    <div class='name-tag'>Student Course List</div>    
  <div>
  </div>
    <StudentSemesterDisplay v-for="semester in semesters" :key="semester.semesterID" :semester="semester" />
  </div>
</template>

<style>
  @import '../assets/styles/basic.css';
</style>

<script>
  import StudentServices from "@/services/studentServices.js";
  import StudentSemesterDisplay from '@/components/StudentSemesterDisplay.vue';
  import CourseServices from "@/services/studentCourseServices.js";
  import SemesterServices from "@/services/semesterServices.js";
  export default {
    props: ["id"],
    name: 'App',
    components: {
      StudentSemesterDisplay,
    },
    data() {
      return {
        semesters: [],
        student: {},
        start: 1,
        length: 100
      }
    },
    created() {
      StudentServices.getStudent(this.id)
      .then((response) => {
        this.student = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
      this.getSemesters(this.start, this.length);
      this.getCourses(this.start, this.length);
    },
    methods: {
      getSemesters(start, length) {
        SemesterServices.getSemesters(start, length)
        .then(response => {
          this.semesters = response.data;
          console.log(this.semesters);
        })
        .catch(error => {
          console.log("There was an error:", error.response)
        });
      },
      getCourses(start, length) {
        CourseServices.getCourses(start, length)
        .then(response => {
          this.courses = response.data;
        })
        .catch(error => {
          console.log("There was an error:", error.response)
        });
      },
      cancel() {
        this.$router.go(-1);
      },
    }
  }
</script>