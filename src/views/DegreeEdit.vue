<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>{{ this.degree.degreeName }}</v-toolbar-title>
      </v-toolbar>
      <br>

      <v-form
        ref="form" 
        v-model="valid"
        lazy validation
      >
        <v-text-field
          v-model="degree.degreeName"
          id="degreeName"
          label="Degree Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="degree.dept"
          id="dept"
          :counter="4"
          label="Department"
          required
        ></v-text-field>

        <v-text-field
          v-model="degree.totalHours"
          id="totalHours"
          label="Total Hours"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="updateDegree"
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
import DegreeServices from "@/services/degreeServices.js";

export default {
  props: ["id"],

  data() {
    return {
      degree: {},
      message: "Make updates to the Degree",
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
    updateDegree() {
      DegreeServices.updateDegree(this.id, this.degree)
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