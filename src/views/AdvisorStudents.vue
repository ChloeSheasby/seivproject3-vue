<template>
  <div style="">
    <v-container>
      <v-toolbar>
        <v-toolbar-title>My Students</v-toolbar-title>
      </v-toolbar>
      <br>

      <v-card>
      <v-card-title>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

      </v-card-title>
      <v-data-table
        :headers="headers"
        :search="search"
        :items="students"
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
import AdvisorServices from "@/services/advisorServices.js"
import StudentServices from '@/services/studentServices.js'
export default {
  props: ["id"],

  components: {
  },
  data() {
    return {
      search: '',
      advisor: {},
      students: [],
      headers: [{text: 'ID', value: 'studentID'}, 
                {text: 'Last Name', value: 'lName'},
                {text: 'First Name', value: 'fName'}]
    };
  },
  created() {
    AdvisorServices.getAdvisor(this.id)
      .then((response) => {
        this.advisor = response.data;
        console.log(response.data);
        this.getStudents();
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    getStudents() {
      StudentServices.getStudentsForAdvisor(this.id)
      .then(response => {
        this.students = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response)
      });
    },
    deleteStudent(id, fName) {
      let confirmed = confirm(`Are you sure you want to delete ${fName}`);
      if(confirmed) {
        StudentServices.deleteStudent(id)
        .then(() => {
          this.getStudents(this.start, this.length);
        })
        .catch(error => {
          console.log("There was an error:", error.response)
        });
      }
    },
    rowClick: function (item, row) {      
        row.select(true);
        this.$router.push({ name: 'studentView', params: { id: item.studentID } });
      },
      cancel() {
      this.$router.go(-1);
    },
    toEdit() {
      this.$router.push({ name: "advisorEdit", params: { id: this.advisor.advisorID } });
    },
  }
};
</script>