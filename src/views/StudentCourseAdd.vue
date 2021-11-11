<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Student Course {{ this.student_courses.studentCourseID }}</v-toolbar-title>
      </v-toolbar>
      <br>
      <v-form
      ref="form" 
      v-model="valid"
      lazy validation
    >

      <v-select
        v-model="student_courses.studentID"
        :items="students"
        :item-text="item => item.fName +' '+ item.lName"
        item-value="studentID"
        label="Student"
        required
      >
      </v-select>

      <v-select
        v-model="student_courses.courseID"
        :items="courses"
        item-text="courseName"
        item-value="courseID"
        label="Course"
        required
      >
      </v-select>

      <v-select
        v-model="student_courses.semesterID"
        :items="semesters"
        item-text="semesterName"
        item-value="semesterID"
        label="Semester"
        required
      >
      </v-select>

      <v-select
        v-model="student_courses.grade"
        :items="grades"
        item-text="grade"
        label="Grade"
        required
      >
      </v-select>

      <v-select
        v-model="student_courses.status"
        :items="states"
        item-text="status"
        label="Status"
        required
      >
      </v-select>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="addStudentCourse"
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
import StudentCourseServices from "@/services/studentCourseServices.js";
import CourseServices from "@/services/courseServices.js";
import StudentServices from "@/services/studentServices.js";
import SemestersServices from "@/services/semesterServices.js";

export default {
  components: {
  },
  data() {
    return {
      student_courses: {},
      courses: {},
      students: {},
      semesters: {},
      grades: ['', 'A', 'B', 'C', 'D', 'F'],
      states: ['Completed', 'In-Progress', 'Upcoming'],
    };
  },
  created() {
    this.getAllCourses();
    this.getAllStudents();
    this.getAllSemesters();
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
    getAllStudents() {
      StudentServices.getAllStudents()
        .then((response) => {
          this.students = response.data;
          console.log(this.students)
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    getAllSemesters() {
      SemestersServices.getAllSemesters()
        .then((response) => {
          this.semesters = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    addStudentCourse() {
      StudentCourseServices.addStudentCourse(this.student_courses)
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