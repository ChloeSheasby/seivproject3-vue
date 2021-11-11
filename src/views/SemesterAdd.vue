<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Add Semester</v-toolbar-title>
      </v-toolbar>
      <br>

      <v-form
        ref="form" 
        v-model="valid"
        lazy validation
      >
        <v-text-field
          v-model="semester.semesterName"
          id="semesterName"
          label="Semester Name"
          hint="Fall 2018"
          persistent-hint
          required
        ></v-text-field>

        <v-text-field
          v-model="semester.semesterType"
          id="semesterType"
          label="Semester Type"
          hint="Fa"
          persistent-hint
          :counter="2"
          required
        ></v-text-field>

        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="semester.startDate"
              id="startDate"
              label="Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="semester.startDate"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>

        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="semester.endDate"
              id="endDate"
              label="End Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="semester.endDate"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="addSemester"
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
import SemesterServices from "@/services/semesterServices.js";
export default {
  data() {
    return {
      semester: {},
    };
  },
  methods: {
    addSemester() {
      SemesterServices.addSemester(this.semester)
        .then(() => {
          this.$router.push({ name: "semesterList" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "semesterList" });
    },
  },
};
</script>