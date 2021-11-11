<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Add Degree</v-toolbar-title>
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
        hint="Computer Science"
        persistent-hint
        required
      ></v-text-field>

      <v-text-field
        v-model="degree.dept"
        id="dept"
        :counter="4"
        label="Department"
        hint="CMSC"
        persistent-hint
        required
      ></v-text-field>

      <v-text-field
        v-model="degree.totalHours"
        id="totalHours"
        label="Total Hours"
        hint="120"
        persistent-hint
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="addDegree"
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
  data() {
    return {
      degree: {},
    };
  },
  methods: {
    addDegree() {
      DegreeServices.addDegree(this.degree)
        .then(() => {
          this.$router.push({ name: "degreeList" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "degreeList" });
    },
  },
};
</script>