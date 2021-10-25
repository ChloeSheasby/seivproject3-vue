<template>
  <div style="">
    <div style="margin-left: 32%; text-align: left">
      <div style='padding-left: 2%;'>
      <h3>Viewing Degree {{ this.degree.degreeName }} </h3>
      </div>
      <div style='padding-left: 1%;'>
        <button name="back" v-on:click.prevent="cancel()">Back</button>
        <span> &nbsp; </span>
        <button name="edit" v-on:click.prevent="toEdit()">Edit</button>
        <span> &nbsp; </span>
        <button
          name="delete"
          v-on:click.prevent="deleteDegree(degree.degreeID, degree.degreeName)">
          Delete
        </button>
      </div>
      <br />
      <div class="text-input">Department: {{ this.degree.dept }}</div>
      <div class="text-input">Total Hours: {{ this.degree.totalHours }}</div>
      </div>
    </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import DegreeServices from "@/services/degreeServices.js";
//import UserDisplay from '@/components/UserDisplay.vue'
export default {
  props: ["id"],

  data() {
    return {
      degree: {},
    };
  },
  created() {
    DegreeServices.getDegree(this.id)
      .then((response) => {
        this.degree = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    deleteDegree(id, degreeName) {
      let confirmed = confirm(`Are you sure you want to delete ${degreeName}`);
      if (confirmed) {
        DegreeServices.deleteDegree(id)
          .then(() => {
            this.$router.push({ name: "degreeList" });
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
      this.$router.push({ name: "degreeEdit", params: { id: this.degree.degreeID } });
    },
  },
};
</script>