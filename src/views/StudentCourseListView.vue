<template>
  <div>
    <h3>Viewing Courses for Student {{ this.student.fName }} {{ this.student.lName }} </h3>
    <div class='name-tag'>Student Course List</div>    
  <div>
    <table class='center transparent-background' width='100%'>
      <tr>
        <td style='padding-left: 25%; text-align: left;'><button class='arrows' name="previous" v-on:click.prevent="getPrevious()">&#60;</button></td>
        <td style='padding-right: 25%; text-align: right;'><button class='arrows' name="next" v-on:click.prevent="getNext()">&#62;</button></td>
      </tr>
    </table>
  </div>
  <div>Taken Courses</div>
    <br>
        <table width='100%'>
          <thead>
            <tr>
              <th width='20%'>
                  Course Number
              </th>
              <th width='40%'>
                  Course Name
              </th>
              <th width='10%'></th>
              <th width='10%'></th>
            </tr>
          </thead>
        </table>
      <CourseDisplay v-for="course in courses" :key="course.courseID" :course="course"  />
    <div>Remaining Courses</div>
    <br>
        <table width='100%'>
          <thead>
            <tr>
              <th width='20%'>
                  Course Number
              </th>
              <th width='40%'>
                  Course Name
              </th>
              <th width='10%'></th>
              <th width='10%'></th>
            </tr>
          </thead>
        </table>
      <CourseDisplay v-for="course in courses" :key="course.courseID" :course="course"  />
  </div>
</template>

<style>
  @import '../assets/styles/basic.css';
</style>

<script>
  import StudentServices from "@/services/studentServices.js";
  import CourseDisplay from '@/components/CourseDisplay.vue'
  import CourseServices from "@/services/studentCourseServices.js"
  //import UserDisplay from '@/components/UserDisplay.vue'
  export default {
    props: ["id"],
    name: 'App',
    components: {
      CourseDisplay
    },
    data() {
      return {
        student: {},
        courses: {}
      }
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
      this.getCourses(this.start, this.length);
    },
    methods: {
      getCourses(start, length) {
        CourseServices.getCourses(start, length)
        .then(response => {
          this.courses = response.data;
        })
        .catch(error => {
          console.log("There was an error:", error.response)
        });
      },
      cancel() {
        this.$router.go(-1);
      },
    }
  }
</script>