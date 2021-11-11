<template>
  <div style="">
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Degree Course {{ this.degree_courses.degreeCourseID }}</v-toolbar-title>
      </v-toolbar>
      <br>
        <v-btn
          color="accent"
          elevation="2"
          @click="toEdit"
          v-if="this.$store.state.loginUser.role === 'admin'"
        >
          Edit
      </v-btn>

      <v-btn
          color="error"
          class="mr-4"
          @click="deleteDegreeCourse(degree_courses.degreeCourseID,degree_courses.degreeCourseID)"
          v-if="this.$store.state.loginUser.role === 'admin'"
        >
          Delete
      </v-btn>

      <v-btn
          class="mr-4"
          @click="cancel"
        >
          Back
      </v-btn>

      <br><br>

      <v-text-field
          v-model="this.degree.degreeName"
          id="degreeName"
          label="Degree"
          readonly
        ></v-text-field>

        <v-text-field
          v-model="this.course.courseName"
          id="courseName"
          label="Course"
          readonly
        ></v-text-field>
    </v-container>
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