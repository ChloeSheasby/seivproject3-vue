<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Add Degree Course</v-toolbar-title>
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
        @click="addDegreeCourse"
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
  data() {
    return {
      degree_courses: {},
      courses: {},
      degrees: {},
    };
  },
  created() {
    this.getAllCourses();
    this.getAllDegrees();
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
    addDegreeCourse() {
      DegreeCourseServices.addDegreeCourse(this.degree_courses)
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