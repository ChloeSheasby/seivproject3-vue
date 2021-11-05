<template>
  <div style="">
    <h3 class='name-tag'>Viewing Course {{ this.course.courseName }}</h3>
    <div style="margin-left: 32%; text-align: left">
      <div style='padding-left: 8%;'>
        <button name="back" v-on:click.prevent="cancel()">Back</button>
        <span> &nbsp; </span>
        <button name="edit" v-on:click.prevent="toEdit()">Edit</button>
        <span> &nbsp; </span>
        <button
          name="delete"
          v-on:click.prevent="deleteCourse(course.courseID, course.courseName)">
          Delete
        </button>
      </div>
      <br />
      <div class="text-input">Department: {{ this.course.dept }}</div>
      <div class="text-input">Course Number: {{ this.course.courseNum }}</div>
      <div class="text-input">Course Level: {{ this.course.level }}</div>
      <div class="text-input">Number of Hours: {{ this.course.hours }}</div>
      <div class="text-input" width="150%">
        Description: {{ this.course.description }}
      </div>
    </div>
  </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import CourseServices from "@/services/courseServices.js";
//import UserDisplay from '@/components/UserDisplay.vue'
export default {
  props: ["id"],

  data() {
    return {
      course: {},
    };
  },
  created() {
    CourseServices.getCourse(this.id)
      .then((response) => {
        this.course = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    deleteCourse(id, courseName) {
      let confirmed = confirm(`Are you sure you want to delete ${courseName}`);
      if (confirmed) {
        CourseServices.deleteCourse(id)
          .then(() => {
            this.$router.push({ name: "courseList" });
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
      this.$router.push({ name: "courseEdit", params: { id: this.course.courseID } });
    },
  },
};
</script>