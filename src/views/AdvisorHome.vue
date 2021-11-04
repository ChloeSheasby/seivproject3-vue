<template>
  <div style="">
    <h3 class="name-tag">Welcome, {{ this.advisor.fName }} {{ this.advisor.lName }}</h3>
    <div style="margin-left: 32%; text-align: left">
      <br>
      <div class="text-input">Email: {{ this.advisor.email }}</div>
      <div class="text-input">Department: {{ this.advisor.dept }}</div>
    </div>
    <div>
  <h3 class='name-tag'>Student List</h3>
    <br>
        <table width='100%'>
          <thead>
            <tr>
              <th width='20%'>
                  Student Number
              </th>
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
  </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import AdvisorServices from "@/services/advisorServices.js"
import StudentDisplay from '@/components/StudentDisplay.vue'
import StudentServices from '@/services/studentServices.js'
//import UserDisplay from '@/components/UserDisplay.vue'
export default {
  props: ["id"],

  components: {
    StudentDisplay
  },
  data() {
    return {
      advisor: {},
      students: []
    };
  },
  created() {
    AdvisorServices.getAdvisor(this.id)
      .then((response) => {
        this.advisor = response.data;
        console.log(response.data);
        this.getStudents();
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    getStudents() {
      StudentServices.getStudentsForAdvisor(this.id)
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
  }
};
</script>