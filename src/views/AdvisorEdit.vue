<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>{{ this.advisor.fName }} {{ this.advisor.lName }}</v-toolbar-title>
      </v-toolbar>
      <br>
    <v-form
      ref="form" 
      v-model="valid"
      lazy validation
    >
      <v-text-field
        v-model="advisor.fName"
        id="fName"
        :counter="25"
        label="First Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="advisor.lName"
        id="lName"
        :counter="25"
        label="Last Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="advisor.email"
        label="Email"
        required
      ></v-text-field>

      <v-text-field
        v-model="advisor.dept"
        :counter="4"
        label="Department"
        required
      ></v-text-field>

      <v-select
        v-if="this.$store.state.loginUser.role === 'admin'"
        v-model="advisor.role"
        :items="roles"
        label="Role"
        required
      ></v-select>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="updateAdvisor"
      >
        Save
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="cancel"
      >
        Cancel
      </v-btn>
    </v-form>
    </v-container>
  </div>
</template>
<style>
@import "../assets/styles/basic.css";
</style>

<script>
import AdvisorServices from "@/services/advisorServices.js";

export default {
  props: ["id"],

  data() {
    return {
      advisor: {},
      message: "Make updates to the Advisor",
            roles: [
        'admin',
        'advisor'
      ],
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
    updateAdvisor() {
      AdvisorServices.updateAdvisor(this.id, this.advisor)
        .then(() => {
          this.$router.go(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>