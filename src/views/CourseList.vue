<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Courses</v-toolbar-title>
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
          v-if="this.$store.state.loginUser.role === 'admin'"
          color="accent"
          elevation="2"
          @click="addCourse"
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
          :items="courses"
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
  import CourseServices from "@/services/courseServices.js"
  export default {
    name: 'App',
    components: {
    },
    data() {
      return {
        search: '',
        courses: [],
        headers: [{text: 'ID', value: 'courseID'}, 
                  {text: 'Course Number', value: 'courseNum'},
                  {text: 'Name', value: 'courseName'},
                  {text: "Department", value: 'dept'}]
      }
    },
    created() {
      this.getCourses();
    },
    methods: {
      getCourses() {
        CourseServices.getAllCourses()
        .then(response => {
          this.courses = response.data;
        })
        .catch(error => {
          console.log("There was an error:", error.response)
        });
      },
      deleteCourse(id, courseName) {
        let confirmed = confirm(`Are you sure you want to delete ${courseName}`);
        if(confirmed) {
          CourseServices.deleteCourse(id)
          .then(() => {
            this.getCourses(this.start, this.length);
          })
          .catch(error => {
            console.log("There was an error:", error.response)
          });
        }
      },
      getPrevious() {
        if(this.start >= this.length) {
          this.start -= this.length;
          this.getCourses(this.start, this.length);
        }
      },
      getNext() {
        if(this.courses.length === this.length) {
          this.start += this.length;
          this.getCourses(this.start, this.length);
        }
      },
      rowClick: function (item, row) {      
        row.select(true);
        this.$router.push({ name: 'courseView', params: { id: item.courseID } });
      },
      addCourse() {
        this.$router.push({ name: 'courseAdd'});
      },
      cancel() {
        this.$router.go(-1);
      }
    }
  }
</script>