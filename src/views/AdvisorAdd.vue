<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Add Advisor</v-toolbar-title>
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
        hint="John"
        persistent-hint
        required
      ></v-text-field>

      <v-text-field
        v-model="advisor.lName"
        id="lName"
        :counter="25"
        label="Last Name"
        hint="Doe"
        persistent-hint
        required
      ></v-text-field>

      <v-text-field
        v-model="advisor.email"
        label="Email"
        hint="john.doe@oc.edu"
        persistent-hint
        required
      ></v-text-field>

      <v-text-field
        v-model="advisor.dept"
        :counter="4"
        label="Department"
        hint="CMSC"
        persistent-hint
        required
      ></v-text-field>

      <v-select
        v-model="advisor.role"
        :items="roles"
        label="Role"
        required
      ></v-select>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="addAdvisor"
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
  data() {
    return {
      advisor: {},
      roles: [
        'admin',
        'advisor'
      ],
    };
  },
  methods: {
    addAdvisor() {
      AdvisorServices.addAdvisor(this.advisor)
        .then(() => {
          this.$router.push({ name: "advisorList" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "advisorList" });
    }
  },
};
</script>