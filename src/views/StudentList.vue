<template>
  <div>
    <h3 class='name-tag'>Student List</h3>    
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
              <th width='40%'>
                  Student Name
              </th>
              <th width='10%'></th>
              <th width='10%'></th>
            </tr>
          </thead>
        </table>
        <StudentDisplay v-for="student in students" :key="student.studentID" :student="student" @delete-student=deleteStudent />
  </div>
</template>

<style>
  @import '../assets/styles/basic.css';
</style>

<script>
  import StudentDisplay from '@/components/StudentDisplay.vue'
  import StudentServices from '@/services/studentServices.js'
  //import UserDisplay from '@/components/UserDisplay.vue'
  export default {
    name: 'App',
    components: {
      StudentDisplay
    },
    data() {
      return {
        students: [],
        start: 1,
        length: 100
      }
    },
    created() {
      this.getStudents(this.start, this.length);
    },
    methods: {
      getStudents(start, length) {
        StudentServices.getStudents(start, length)
        .then(response => {
          this.students = response.data;
        })
        .catch(error => {
          console.log("There was an error:", error.response)
        });
      },
      deleteStudent(id, fName) {
        let confirmed = confirm(`Are you sure you want to delete ${fName}`);
        if(confirmed) {
          StudentServices.deleteStudent(id)
          .then(() => {
            this.getStudents(this.start, this.length);
          })
          .catch(error => {
            console.log("There was an error:", error.response)
          });
        }
      },
      getPrevious() {
        if(this.start >= this.length) {
          this.start -= this.length;
          this.getStudents(this.start, this.length);
        }
      },
      getNext() {
        if(this.courses.length === this.length) {
          this.start += this.length;
          this.getStudents(this.start, this.length);
        }
      }
    }
  }
</script>