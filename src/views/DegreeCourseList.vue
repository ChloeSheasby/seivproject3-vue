<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Degree Courses</v-toolbar-title>
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
          @click="addDegreeCourse"
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
          :items="degree_courses"
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
  import DegreeCourseServices from '@/services/degreeCourseServices.js'
  //import UserDisplay from '@/components/UserDisplay.vue'
  export default {
    name: 'App',
    components: {
    },
    data() {
      return {
        search: '',
        degree_courses: [],
        headers: [{text: 'ID', value: 'degreeCourseID'}, 
                  {text: 'Degree', value: 'degreeName'},
                  {text: 'Course', value: 'courseName'}]
      }
    },
    created() {
      this.getDegreeCourses();
    },
    methods: {
      getDegreeCourses() {
        DegreeCourseServices.getAllDegreeCourses()
        .then(response => {
          this.degree_courses = response.data;
        })
        .catch(error => {
          console.log("There was an error:", error.response)
        });
      },
      deleteDegreeCourse(id, degreeCourseID) {
        let confirmed = confirm(`Are you sure you want to delete ${degreeCourseID}`);
        if(confirmed) {
          DegreeCourseServices.deleteDegreeCourse(id)
          .then(() => {
            this.getDegreeCourses(this.start, this.length);
          })
          .catch(error => {
            console.log("There was an error:", error.response)
          });
        }
      },
      getPrevious() {
        if(this.start >= this.length) {
          this.start -= this.length;
          this.getDegreeCourses(this.start, this.length);
        }
      },
      getNext() {
        if(this.courses.length === this.length) {
          this.start += this.length;
          this.getDegreeCourses(this.start, this.length);
        }
      },
      rowClick: function (item, row) {      
        row.select(true);
        this.$router.push({ name: 'degreeCourseView', params: { id: item.degreeCourseID } });
      },
      addDegreeCourse() {
        this.$router.push({ name: 'degreeCourseAdd'});
      },
      cancel() {
        this.$router.go(-1);
      }
    }
  }
</script>