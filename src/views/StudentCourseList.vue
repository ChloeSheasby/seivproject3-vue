<template>
  <div>
    <v-container>
    <v-toolbar>
        <v-toolbar-title>Student Courses</v-toolbar-title>
      </v-toolbar>
      <br><br>
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

    <v-btn
        class="mr-4"
        @click="cancel"
      >
        Back
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
  @import '../assets/styles/basic.css';
</style>

<script>
  import StudentCourseServices from '@/services/studentCourseServices.js'
  export default {
    name: 'App',
    components: {
    },
    data() {
      return {
        search: '',
        student_courses: [],
        headers: [{text: 'ID', value: 'studentCourseID'}, 
                  {text: 'Last Name', value: 'lName'},
                  {text: 'First Name', value: 'fName'},
                  {text: 'Course', value: 'courseName'},
                  {text: 'Semester', value: 'semesterName'},
                  {text: 'Grade', value: 'grade'},
                  {text: 'Status', value: 'status'}]
      }
    },
    created() {
      this.getStudentCourses();
    },
    methods: {
      getStudentCourses() {
        StudentCourseServices.getAllStudentCourses()
        .then(response => {
          this.student_courses = response.data;
          console.log(this.student_courses)
        })
        .catch(error => {
          console.log("There was an error:", error.response)
        });
      },
      deleteStudentCourse(id, studentCourseID) {
        let confirmed = confirm(`Are you sure you want to delete ${studentCourseID}`);
        if(confirmed) {
          StudentCourseServices.deleteStudentCourse(id)
          .then(() => {
            this.getStudentCourses(this.start, this.length);
          })
          .catch(error => {
            console.log("There was an error:", error.response)
          });
        }
      },
      getPrevious() {
        if(this.start >= this.length) {
          this.start -= this.length;
          this.getStudentCourses(this.start, this.length);
        }
      },
      getNext() {
        if(this.courses.length === this.length) {
          this.start += this.length;
          this.getStudentCourses(this.start, this.length);
        }
      },
      rowClick: function (item, row) {      
        row.select(true);
        this.$router.push({ name: 'studentCourseView', params: { id: item.studentCourseID } });
      },
      addStudentCourse() {
        this.$router.push({ name: 'studentCourseAdd'});
      },
      cancel() {
        this.$router.go(-1);
      }
    }
  }
</script>