<template>
  <div style="">
    <div style="margin-left: 32%; text-align: left">
      <div style="padding-left: 2%">
        <h3>Viewing Student Course{{ this.student_courses.studentCourseID }}</h3>
      </div>
      <div style="padding-left: 1%">
        <button name="back" v-on:click.prevent="cancel()">Back</button>
        <span> &nbsp; </span>
        <button name="edit" v-on:click.prevent="toEdit()">Edit</button>
        <span> &nbsp; </span>
        <button
          name="delete"
          v-on:click.prevent="
            deleteStudentCourse(
              student_courses.studentCourseID,
              student_courses.studentCourseID
            )
          "
        >
          Delete
        </button>
      </div>
      <br />
      <div class="text-input">Student: {{ this.student.studentName }}</div>
      <div class="text-input">Course: {{ this.course.courseName }}</div>
    </div>
  </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import StudentCourseServices from "@/services/studentCourseServices.js";
import StudentServices from "@/services/studentServices.js";
import CourseServices from "@/services/courseServices.js";

//import UserDisplay from '@/components/UserDisplay.vue'
export default {
  props: ["id"],

  data() {
    return {
      student_courses: {},
      student: {},
      course: {},
    };
  },
  created() {
    StudentCourseServices.getStudentCourse(this.id)
      .then((response) => {
        this.student_courses = response.data;
        StudentServices.getStudent(this.student_courses.studentID)
          .then((response) => {
            this.student = response.data;
            console.log(response.data);
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
        CourseServices.getCourse(this.student_courses.courseID)
          .then((response) => {
            this.course = response.data;
            console.log(response.data);
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
          console.log(response.data);
          })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    deleteStudentCourse(id, studentCourseID) {
      let confirmed = confirm(
        `Are you sure you want to delete ${studentCourseID}`
      );
      if (confirmed) {
        StudentCourseServices.deleteStudentCourse(id)
          .then(() => {
            this.$router.push({ name: "studentCourseList" });
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    toEdit() {
      this.$router.push({
        name: "studentCourseEdit",
        params: { id: this.student_courses.studentCourseID },
      });
    },
  },
};
</script>