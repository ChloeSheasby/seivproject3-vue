<template>
  <div style="">
    <div style="margin-left: 32%; text-align: left">
      <div style='padding-left: 2%;'>
      <h3>Viewing Student {{ this.student.fName }} {{ this.student.lName }} </h3>
      </div>
      <div style='padding-left: 1%;'>
        <button name="back" v-on:click.prevent="cancel()">Back</button>
        <span> &nbsp; </span>
        <button name="edit" v-on:click.prevent="toEdit()">Edit</button>
        <span> &nbsp; </span>
        <button
          name="delete"
          v-on:click.prevent="deleteStudent(student.studentID, student.fName)">
          Delete
        </button>
      </div>
      <br />
      <div class="text-input">Degree ID: {{ this.student.degreeID }}</div>
      <div class="text-input">Advisor ID: {{ this.student.advisorID }}</div>
      <div class="text-input">First Name: {{ this.student.fName }}</div>
      <div class="text-input">Last Name: {{ this.student.lName }}</div>
      <div class="text-input">Email: {{ this.student.email }}</div>
      </div>
    </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import StudentServices from "@/services/studentServices.js";
//import UserDisplay from '@/components/UserDisplay.vue'
export default {
  props: ["id"],

  data() {
    return {
      student: {},
    };
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
  },
  methods: {
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
  },
};
</script>