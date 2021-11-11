<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Degree Course {{ this.degree_courses.degreeCourseID }}</v-toolbar-title>
      </v-toolbar>
      <br>
      <v-form
      ref="form" 
      v-model="valid"
      lazy validation
    >

      <v-select
        v-model="degree_courses.degreeID"
        :items="degrees"
        item-text="degreeName"
        item-value="degreeID"
        label="Degree"
        required
      >
      </v-select>

      <v-select
        v-model="degree_courses.courseID"
        :items="courses"
        item-text="courseName"
        item-value="courseID"
        label="Course"
        required
      >
      </v-select>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="updateDegreeCourse"
      >
        Save
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="cancel"
      >
        Cancel
      </v-btn>
    </v-form>   
    </v-container>
  </div>
</template>
<style>
@import "../assets/styles/basic.css";
</style>

<script>
import DegreeCourseServices from "@/services/degreeCourseServices.js";
import CourseServices from "@/services/courseServices.js";
import DegreeServices from "@/services/degreeServices.js";

export default {
  components: {
  },
  props: ["id"],
  data() {
    return {
      degree_courses: {},
      courses: {},
      degrees: {},
      message: "Make updates to the Degree Courses",
    };
  },
  created() {
    this.getAllCourses();
    this.getAllDegrees();
    DegreeCourseServices.getDegreeCourse(this.id)
      .then((response) => {
        this.degree_courses = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },

  methods: {
    getAllCourses() {
      CourseServices.getAllCourses()
        .then((response) => {
          this.courses = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    getAllDegrees() {
      DegreeServices.getAllDegrees()
        .then((response) => {
          this.degrees = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    updateDegreeCourse() {
      DegreeCourseServices.updateDegreeCourse(this.id, this.degree_courses)
        .then(() => {
          this.$router.go(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>