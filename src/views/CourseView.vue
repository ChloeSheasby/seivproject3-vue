<template>
  <div style="">
    <v-container>
      <v-toolbar>
        <v-toolbar-title>{{ this.course.courseName }}</v-toolbar-title>
      </v-toolbar>
      <br>
      <v-btn
        v-if="this.$store.state.loginUser.role === 'admin'"
        color="accent"
        elevation="2"
        @click="toEdit"
      >
        Edit
    </v-btn>

    <v-btn
        v-if="this.$store.state.loginUser.role === 'admin'"
        color="error"
        class="mr-4"
        @click="deleteCourse(course.courseID, course.courseName)"
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
        v-model="course.courseNum"
        id="courseNum"
        label="Course Number"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="course.courseName"
        id="courseName"
        label="Course Name"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="course.dept"
        id="dept"
        :counter="4"
        label="Department"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="course.level"
        id="level"
        :counter="1"
        label="Level"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="course.hours"
        :counter="1"
        label="Hours"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="semesters"
        label="Semesters"
        readonly
      ></v-text-field>

      <v-textarea
        v-model="course.description"
        name="description"
        label="Description"
        readonly
      ></v-textarea>
    </v-container>
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
      semesters: ""
    };
  },
  created() {
    CourseServices.getCourse(this.id)
      .then((response) => {
        this.course = response.data;
        console.log(response.data);
        this.getSemesters();
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
    getSemesters() {
      if(this.course.semesterTypes != null)
      {
        var array = this.course.semesterTypes.split(",");
        var semester = "";
        array.forEach(element => {
        if(element == "Sp") {
          semester += "Spring"
        }
        if(element == "Su") {
          if(semester.length > 0) {
            semester += ", "
          }
          semester += "Summer"
        }
        if(element == "F") {
          if(semester.length > 0) {
            semester += ", "
          }
          semester += "Fall"
        }
        if(element == "W") {
          if(semester.length > 0) {
            semester += ", "
          }
          semester += "Winter"
        }
        this.semesters = semester;
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