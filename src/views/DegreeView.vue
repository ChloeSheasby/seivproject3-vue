<template>
  <div style="">
    <v-container>
      <v-toolbar>
        <v-toolbar-title>{{ this.degree.degreeName }}</v-toolbar-title>
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
        @click="deleteDegree(degree.degreeID, degree.degreeName)"
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
        v-model="degree.degreeName"
        id="degreeName"
        label="Degree Name"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="degree.dept"
        id="dept"
        :counter="4"
        label="Department"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="degree.totalHours"
        id="totalHours"
        label="Total Hours"
        readonly
      ></v-text-field>

      <br><br>
      <v-card>
        <v-card-title>
          Courses
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            color="accent"
            elevation="2"
            @click="toAdd"
            v-if="this.$store.state.loginUser.role === 'admin'"
          >
            Add
          </v-btn>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="degree_courses"
          :items-per-page="50"
          @click:row="rowClick"
        ></v-data-table>
      </v-card>  
    </v-container>
  </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import DegreeServices from "@/services/degreeServices.js";
import DegreeCourseServices from "@/services/degreeCourseServices.js";

export default {
  props: ["id"],
  name: 'App',
  components: {
  },
  data() {
    return {
      search: '',
      degree_courses: [],
      courses: [],
      degree: {},
      dcTemp: {},
      headers: [{text: 'ID', value: 'degreeCourseID'}, 
                {text: 'Degree', value: 'degreeName'},
                {text: 'Course', value: 'courseName'}]
    }
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
    DegreeCourseServices.getAllForDegree(this.id)
      .then(response => {
        this.degree_courses = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response)
      });
  },
  methods: {
    deleteDegree(id, degreeName) {
      let confirmed = confirm(`Are you sure you want to delete ${degreeName}`);
      if (confirmed) {
        DegreeServices.deleteDegree(id)
          .then(() => {
            this.$router.push({ name: "degreeList" });
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
      this.$router.push({ name: "degreeEdit", params: { id: this.degree.degreeID } });
    },
    toAdd() {
      this.$router.push({ name: "degreeCourseAddFromDegree", params: { id: this.degree.degreeID } });
    },
    rowClick: function (item, row) {      
        row.select(true);
        this.$router.push({ name: 'degreeCourseView', params: { id: item.degreeCourseID } });
    },
  },
};
</script>