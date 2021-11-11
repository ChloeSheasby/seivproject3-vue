<template>
  <div style="">
    <v-container>
      <v-toolbar>
        <v-toolbar-title>{{ this.student.fName }} {{ this.student.lName }}</v-toolbar-title>
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
        @click="deleteStudent(student.studentID, student.fName)"
        v-if="this.$store.state.loginUser.role === 'admin'"
      >
        Delete
    </v-btn>

    <v-btn
        class="mr-4"
        @click="cancel"
        v-if="this.$store.state.loginUser.role !== student"
      >
        Back
    </v-btn>

    <br><br>

    <v-text-field
        v-model="student.fName"
        id="fName"
        :counter="25"
        label="First Name"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="student.lName"
        id="lName"
        :counter="25"
        label="Last Name"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="student.email"
        id="email"
        label="Email"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="this.degree.degreeName"
        id="degreeID"
        label="Degree"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="advisorName"
        id="advisorID"
        label="Advisor"
        readonly
      ></v-text-field>

      <br><br>

      <v-card>
        <v-card-title>
          Courses
          <v-spacer></v-spacer>
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

      <br><br>
    </v-container>
  </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import StudentServices from "@/services/studentServices.js";
import StudentCourseServices from "@/services/studentCourseServices.js";
import AdvisorServices from "@/services/advisorServices.js";
import DegreeServices from "@/services/degreeServices.js";
export default {
  props: ["id"],

  data() {
    return {
      search: '',
      student: {},
      advisor: {},
      degree: {},
      student_courses: [],
      courses: [],
      scTemp: {},
      headers: [{text: 'ID', value: 'studentCourseID'}, 
                {text: 'Course', value: 'courseName'},
                {text: 'Semester', value: 'semesterName'},
                {text: 'Grade', value: 'grade'},
                {text: 'Status', value: 'status'}]
    };
  },
  computed: {
    advisorName: {
      get() {
        return `${this.advisor.fName} ${this.advisor.lName}`;
      }
    }
  },
  components: {
  },
  created() {
    StudentServices.getStudent(this.id)
      .then((response) => {
        this.student = response.data; 
        this.getDegree(this.student.degreeID)
        this.getAdvisor(this.student.advisorID)
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
    getDegree(id) {
      DegreeServices.getDegree(id)
        .then((response) => {
          this.degree = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    getAdvisor(id) {
      AdvisorServices.getAdvisor(id)
        .then((response) => {
          this.advisor = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    deleteStudent(id, fName) {
      let confirmed = confirm(`Are you sure you want to delete ${fName}`);
      if (confirmed) {
        StudentServices.deleteStudent(id)
          .then(() => {
            this.$router.push({ name: "studentList" });
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