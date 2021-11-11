<template>  
  <div style="">
    <v-container>
      <v-toolbar>
        <v-toolbar-title>My Courses</v-toolbar-title>
      </v-toolbar>
      <br>
        <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            color="accent"
            elevation="2"
            @click="addStudentCourse"
          >
            Add
          </v-btn>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="student_courses"
          :items-per-page="50"
          @click:row="rowClick"
        ></v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import StudentServices from "@/services/studentServices.js";
import StudentCourseServices from "@/services/studentCourseServices.js";
export default {
  props: ["id"],

  data() {
    return {
      search: '',
      student: {},
      student_courses: [],
      courses: [],
      degree: {},
      advisor: {},
      scTemp: [],
      headers: [{text: 'ID', value: 'studentCourseID'}, 
                {text: 'Course', value: 'courseName'},
                {text: 'Semester', value: 'semesterName'},
                {text: 'Grade', value: 'grade'},
                {text: 'Status', value: 'status'}]
    };
  },
  components: {
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
      StudentCourseServices.getAllForStudent(this.id)
      .then(response => {
        this.student_courses = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response)
      });
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    toEdit() {
      this.$router.push({ name: "studentEdit", params: { id: this.student.studentID } });
    },
    rowClick: function (item, row) {      
        row.select(true);
        this.$router.push({ name: 'studentCourseView', params: { id: item.studentCourseID } });
    },
    addStudentCourse() {
        this.$router.push({ name: 'studentCourseAdd'});
    }
  },
};
</script>