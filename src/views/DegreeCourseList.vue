<template>
  <div>
    <div class='name-tag'>Degree Course List</div>    
  <div>
    <table class='center transparent-background' width='100%'>
      <tr>
        <td style='padding-left: 25%; text-align: left;'><button class='arrows' name="previous" v-on:click.prevent="getPrevious()">&#60;</button></td>
        <td style='text-align: center;'><router-link to="/degreeCourseAdd">Add Degree Course</router-link></td>
        <td style='padding-right: 25%; text-align: right;'><button class='arrows' name="next" v-on:click.prevent="getNext()">&#62;</button></td>
      </tr>
    </table>
  </div>
    <br>
        <table width='100%'>
          <thead>
            <tr>
              <th width='10%'>
                  Degree Course ID
              </th>
              <th width='10%'>
                  Degree
              </th>
              <th width='10%'>
                  Course
              </th>
              <th width='10%'></th>
            </tr>
          </thead>
        </table>
        <DegreeCourseDisplay v-for="degree_courses in degree_courses" :key="degree_courses.degreeCourseID" :degree_courses="degree_courses" @delete-degree_courses=deleteDegreeCourse />
  </div>
</template>

<style>
  @import '../assets/styles/basic.css';
</style>

<script>
  import DegreeCourseDisplay from '@/components/DegreeCoursesDisplay.vue'
  import DegreeCourseServices from '@/services/degreeCourseServices.js'
  //import UserDisplay from '@/components/UserDisplay.vue'
  export default {
    name: 'App',
    components: {
      DegreeCourseDisplay
    },
    data() {
      return {
        degree_courses: [],
        start: 1,
        length: 100,
      }
    },
    created() {
      this.getDegreeCourses(this.start, this.length);
    },
    methods: {
      getDegreeCourses(start, length) {
        DegreeCourseServices.getDegreeCourses(start, length)
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
      }
    }
  }
</script>