<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>{{ this.semester.semesterName }}</v-toolbar-title>
      </v-toolbar>

      <v-form
        ref="form" 
        v-model="valid"
        lazy validation
      >
        <v-text-field
          v-model="semester.semesterName"
          id="semesterName"
          label="Semester Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="semester.semesterType"
          id="semesterType"
          label="Semester Type"
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
          @click="updateSemester"
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
  props: ["id"],

  data() {
    return {
      semester: {},
      message: "Make updates to the Semester",
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
    updateSemester() {
      SemesterServices.updateSemester(this.id, this.semester)
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