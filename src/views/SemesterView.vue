<template>
  <div style="">
    <div style="margin-left: 32%; text-align: left">
      <div style='padding-left: 2%;'>
      <h3>Viewing Semester {{ this.semester.semesterName }}</h3>
      </div>
      <div style='padding-left: 1%;'>
        <button name="back" v-on:click.prevent="cancel()">Back</button>
        <span> &nbsp; </span>
        <button name="edit" v-on:click.prevent="toEdit()">Edit</button>
        <span> &nbsp; </span>
        <button
          name="delete"
          v-on:click.prevent="deleteSemester(semester.semesterID, semester.semesterName)">
          Delete
        </button>
      </div>
      <br/>
      <div class="text-input">Semester Type: {{ this.semester.semesterType }}</div>
      <div class="text-input">Start Date: {{ this.semester.startDate }}</div>
      <div class="text-input">Semester Level: {{ this.semester.endDate }}</div>
    </div>
  </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import SemesterServices from "@/services/semesterServices.js";
//import UserDisplay from '@/components/UserDisplay.vue'
export default {
  props: ["id"],

  data() {
    return {
      semester: {},
    };
  },
  created() {
    SemesterServices.getSemester(this.id)
      .then((response) => {
        this.semester = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    deleteSemester(id, semesterName) {
      let confirmed = confirm(`Are you sure you want to delete ${semesterName}`);
      if (confirmed) {
        SemesterServices.deleteSemester(id)
          .then(() => {
            this.$router.push({ name: "semesterList" });
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
      this.$router.push({ name: "semesterEdit", params: { id: this.semester.semesterID } });
    },
  },
};
</script>