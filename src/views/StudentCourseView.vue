<template>
  <div style="">
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Student Course {{ this.student_courses.studentCourseID }}</v-toolbar-title>
      </v-toolbar>
      <br>
        <v-btn
          color="accent"
          elevation="2"
          @click="toEdit"
        >
          Edit
      </v-btn>

      <v-btn
          color="error"
          class="mr-4"
          @click="deleteStudentCourse(student_courses.studentCourseID,student_courses.studentCourseID)"
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
          v-model="this.student.fName"
          id="fName"
          label="First Name"
          readonly
        ></v-text-field>

      <v-text-field
          v-model="this.student.lName"
          id="lName"
          label="Last Name"
          readonly
        ></v-text-field>

        <v-text-field
          v-model="this.course.courseName"
          id="courseName"
          label="Course"
          readonly
        ></v-text-field>

        <v-text-field
          v-model="this.semester.semesterName"
          id="semesterName"
          label="Semester"
          readonly
        ></v-text-field>

        <v-text-field
          v-model="this.student_courses.grade"
          id="grade"
          label="Grade"
          readonly
        ></v-text-field>

        <v-text-field
          v-model="this.student_courses.status"
          id="status"
          label="Status"
          readonly
        ></v-text-field>

    </v-container>
  </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import StudentCourseServices from "@/services/studentCourseServices.js";
import StudentServices from "@/services/studentServices.js";
import CourseServices from "@/services/courseServices.js";
import SemesterServices from "@/services/semesterServices.js";

//import UserDisplay from '@/components/UserDisplay.vue'
export default {
  props: ["id"],

  data() {
    return {
      student_courses: {},
      student: {},
      course: {},
      semester: {},
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
          SemesterServices.getSemester(this.student_courses.semesterID)
          .then((response) => {
            this.semester = response.data;
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
            this.$router.go(-1);
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