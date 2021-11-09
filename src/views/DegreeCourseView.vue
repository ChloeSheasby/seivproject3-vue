<template>
  <div style="">
    <h3 class="name-tag">Viewing Degree Course{{ this.degree_courses.degreeCourseID }}</h3>
    <div style="margin-left: 32%; text-align: left">
      <div style="padding-left: 8%">
        <button name="back" v-on:click.prevent="cancel()">Back</button>
        <span> &nbsp; </span>
        <button name="edit" v-on:click.prevent="toEdit()">Edit</button>
        <span> &nbsp; </span>
        <button
          name="delete"
          v-on:click.prevent="
            deleteDegreeCourse(
              degree_courses.degreeCourseID,
              degree_courses.degreeCourseID
            )
          "
        >
          Delete
        </button>
      </div>
      <br />
      <div class="text-input">Degree: {{ this.degree.degreeName }}</div>
      <div class="text-input">Course: {{ this.course.courseName }}</div>
    </div>
  </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import DegreeCourseServices from "@/services/degreeCourseServices.js";
import DegreeServices from "@/services/degreeServices.js";
import CourseServices from "@/services/courseServices.js";

//import UserDisplay from '@/components/UserDisplay.vue'
export default {
  props: ["id"],

  data() {
    return {
      degree_courses: {},
      degree: {},
      course: {},
    };
  },
  created() {
    DegreeCourseServices.getDegreeCourse(this.id)
      .then((response) => {
        this.degree_courses = response.data;
        DegreeServices.getDegree(this.degree_courses.degreeID)
          .then((response) => {
            this.degree = response.data;
            console.log(response.data);
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
        CourseServices.getCourse(this.degree_courses.courseID)
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
    deleteDegreeCourse(id, degreeCourseID) {
      let confirmed = confirm(
        `Are you sure you want to delete ${degreeCourseID}`
      );
      if (confirmed) {
        DegreeCourseServices.deleteDegreeCourse(id)
          .then(() => {
            this.$router.push({ name: "degreeCourseList" });
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
        name: "degreeCourseEdit",
        params: { id: this.degree_courses.degreeCourseID },
      });
    },
  },
};
</script>