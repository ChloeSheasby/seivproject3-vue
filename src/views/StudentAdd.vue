<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Add Student</v-toolbar-title>
      </v-toolbar>
      <br>

      <v-form
        ref="form" 
        v-model="valid"
        lazy validation
      >
        <v-container>
          <v-text-field
            v-model="student.fName"
            id="fName"
            :counter="25"
            label="First Name"
            hint="Sue"
            persistent-hint
            required
          ></v-text-field>

          <v-text-field
            v-model="student.lName"
            id="lName"
            :counter="25"
            label="Last Name"
            hint="Roberts"
            persistent-hint
            required
          ></v-text-field>

          <v-text-field
            v-model="student.email"
            id="email"
            label="Email"
            hint="sue.roberts@eagles.oc.edu"
            persistent-hint
            required
          ></v-text-field>

          <v-select
            v-model="student.degreeID"
            :items="degrees"
            item-text="degreeName"
            item-value="degreeID"
            label="Degree"
            required
          >
          </v-select>

          <v-select
            v-model="student.advisorID"
            :items="advisors"
            :item-text="item => item.fName +' '+ item.lName"
            item-value="advisorID"
            label="Advisor"
            required
          >
          </v-select>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="addStudent"
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
        </v-container>
      </v-form> 
    </v-container>
  </div>
</template>
<style>
/* @import "../assets/styles/basic.css"; */
</style>

<script>
import StudentServices from "@/services/studentServices.js";
import DegreeServices from "@/services/degreeServices.js";
import AdvisorServices from "@/services/advisorServices.js";

export default {
  data() {
    return {
      student: {},
      degrees: [],
      advisors: []
    };
  },
  created() {
    this.getAllDegrees()
    this.getAllAdvisors()
  },
  methods: {
    getAllDegrees() {
      DegreeServices.getAllDegrees()
        .then((response) => {
          this.degrees = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    getAllAdvisors() {
      AdvisorServices.getAllAdvisors()
        .then((response) => {
          this.advisors = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    addStudent() {
      StudentServices.addStudent(this.student)
        .then(() => {
          this.$router.push({ name: "studentList" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "studentList" });
    },
  },
};
</script>