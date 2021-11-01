<template>
  <div>
    <div class='name-tag'>Student Course List</div>    
  <div>
    <table class='center transparent-background' width='100%'>
      <tr>
        <td style='padding-left: 25%; text-align: left;'><button class='arrows' name="previous" v-on:click.prevent="getPrevious()">&#60;</button></td>
        <td style='padding-right: 25%; text-align: right;'><button class='arrows' name="next" v-on:click.prevent="getNext()">&#62;</button></td>
      </tr>
    </table>
  </div>
    <br>
        <table width='100%'>
          <thead>
            <tr>
              <th width='10%'>
                  Student Course ID
              </th>
              <th width='10%'>
                  Student
              </th>
              <th width='10%'>
                  Course
              </th>
              <th width='10%'></th>
            </tr>
          </thead>
        </table>
        <StudentCourseDisplay v-for="student_courses in student_courses" :key="student_courses.studentCourseID" :student_courses="student_courses" @delete-student_courses=deleteStudentCourse />
  </div>
</template>

<style>
  @import '../assets/styles/basic.css';
</style>

<script>
  import StudentCourseDisplay from '@/components/StudentCoursesDisplay.vue'
  import StudentCourseServices from '@/services/studentCourseServices.js'
  //import UserDisplay from '@/components/UserDisplay.vue'
  export default {
    name: 'App',
    components: {
      StudentCourseDisplay
    },
    data() {
      return {
        student_courses: [],
        start: 1,
        length: 100,
      }
    },
    created() {
      this.getStudentCourses(this.start, this.length);
    },
    methods: {
      getStudentCourses(start, length) {
        StudentCourseServices.getStudentCourses(start, length)
        .then(response => {
          this.student_courses = response.data;
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
      }
    }
  }
</script>