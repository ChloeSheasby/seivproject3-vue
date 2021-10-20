<template>
  <div style="">
    <div style="margin-left: 32%; text-align: left">
      <div style='padding-left: 2%;'>
      <h3>Viewing Advisor {{ this.advisor.fName }} {{ this.advisor.lName }}</h3>
      </div>
      <div style='padding-left: 1%;'>
        <button name="back" v-on:click.prevent="cancel()">Back</button>
        <span> &nbsp; </span>
        <button name="edit" v-on:click.prevent="toEdit()">Edit</button>
        <span> &nbsp; </span>
        <button
          name="delete"
          v-on:click.prevent="deleteAdvisor(this.advisor.advisorID, this.advisor.fName)">
          Delete
        </button>
      </div>
      <br />
      <div class="text-input">Email: {{ this.advisor.email }}</div>
      <div class="text-input">Department: {{ this.advisor.dept }}</div>
      </div>
    </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import AdvisorServices from "@/services/advisorServices.js";
//import UserDisplay from '@/components/UserDisplay.vue'
export default {
  props: ["id"],

  data() {
    return {
      advisor: {},
    };
  },
  created() {
    AdvisorServices.getAdvisor(this.id)
      .then((response) => {
        this.advisor = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    deleteAdvisor(id, fName) {
      let confirmed = confirm(`Are you sure you want to delete ${fName}`);
      if (confirmed) {
        AdvisorServices.deleteAdvisor(id)
          .then(() => {
            this.$router.push({ name: "List" });
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
      this.$router.push({ name: "edit", params: { id: this.advisor.advisorID } });
    },
  },
};
</script>