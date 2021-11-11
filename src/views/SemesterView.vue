<template>
  <div style="">
    <v-container>
      <v-toolbar>
        <v-toolbar-title>{{ this.semester.semesterName }}</v-toolbar-title>
      </v-toolbar>
      <br>
      <v-btn
        color="accent"
        elevation="2"
        @click="toEdit"
        v-if="this.$store.state.loginUser.role === 'admin'"
      >
        Edit
      </v-btn>

      <v-btn
          color="error"
          class="mr-4"
          @click="deleteSemester(semester.semesterID, semester.semesterName)"
          v-if="this.$store.state.loginUser.role === 'admin'"
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
          v-model="semester.semesterName"
          id="semesterName"
          label="Semester Name"
          readonly
        ></v-text-field>

        <v-text-field
          v-model="semester.semesterType"
          id="semesterType"
          label="Semester Type"
          :counter="2"
          readonly
        ></v-text-field>

        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
          disabled
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
          disabled
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
    </v-container>
  </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import SemesterServices from "@/services/semesterServices.js";
//import UserDisplay from '@/components/UserDisplay.vue'
export default {
  props: ["id"],

  data() {
    return {
      semester: {},
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
    deleteSemester(id, semesterName) {
      let confirmed = confirm(`Are you sure you want to delete ${semesterName}`);
      if (confirmed) {
        SemesterServices.deleteSemester(id)
          .then(() => {
            this.$router.push({ name: "semesterList" });
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
      this.$router.push({ name: "semesterEdit", params: { id: this.semester.semesterID } });
    },
  },
};
</script>