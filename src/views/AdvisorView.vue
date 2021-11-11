<template>
  <div style="">
    <v-container>
      <v-toolbar>
        <v-toolbar-title>{{ this.advisor.fName }} {{ this.advisor.lName }}</v-toolbar-title>
      </v-toolbar>
      <br>
      <v-btn
        v-if="this.$store.state.loginUser.role === 'admin'"
        color="accent"
        elevation="2"
        @click="toEdit"
      >
        Edit
    </v-btn>

    <v-btn
        v-if="this.$store.state.loginUser.role === 'admin'"
        color="error"
        class="mr-4"
        @click="deleteAdvisor(advisor.advisorID, advisor.fName)"
      >
        Delete
    </v-btn>

    <v-btn
        class="mr-4"
        @click="cancel"
      >
        Back
    </v-btn>

    <br><br>

    <v-text-field
        v-model="advisor.fName"
        id="fName"
        :counter="25"
        label="First Name"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="advisor.lName"
        id="lName"
        :counter="25"
        label="Last Name"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="advisor.email"
        label="Email"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="advisor.dept"
        :counter="4"
        label="Department"
        readonly
      ></v-text-field>

       <v-text-field
        v-model="advisor.role"
        label="Role"
        readonly
      ></v-text-field>
    </v-container>
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
            this.$router.push({ name: "advisorList" });
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
      this.$router.push({ name: "advisorEdit", params: { id: this.advisor.advisorID } });
    },
  },
};
</script>