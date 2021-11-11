<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Semesters</v-toolbar-title>
      </v-toolbar>
      <br><br>
      <v-card>
        <v-card-title>
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
          @click="addSemester"
          v-if="this.$store.state.loginUser.role === 'admin'"
        >
          Add
      </v-btn>

      <v-btn
          class="mr-4"
          @click="cancel"
        >
          Back
      </v-btn>

        </v-card-title>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="semesters"
          :items-per-page="50"
          @click:row="rowClick"
        ></v-data-table>
      </v-card>  
    </v-container>
  </div>
</template>

<style>
  @import '../assets/styles/basic.css';
</style>

<script>
  import SemesterServices from "@/services/semesterServices.js"
  export default {
    name: 'App',
    components: {
    },
    data() {
      return {
        search: '',
        semesters: [],
        headers: [{text: 'ID', value: 'semesterID'}, 
                  {text: 'Semester Name', value: 'semesterName'}]
      }
    },
    created() {
      this.getSemesters();
    },
    methods: {
      getSemesters() {
        SemesterServices.getAllSemesters()
        .then(response => {
          this.semesters = response.data;
        })
        .catch(error => {
          console.log("There was an error:", error.response)
        });
      },
      deleteSemester(id, semesterName) {
        let confirmed = confirm(`Are you sure you want to delete ${semesterName}`);
        if(confirmed) {
          SemesterServices.deleteSemester(id)
          .then(() => {
            this.getSemesters(this.start, this.length);
          })
          .catch(error => {
            console.log("There was an error:", error.response)
          });
        }
      },
      getPrevious() {
        if(this.start >= this.length) {
          this.start -= this.length;
          this.getSemesters(this.start, this.length);
        }
      },
      getNext() {
        if(this.semesters.length === this.length) {
          this.start += this.length;
          this.getSemesters(this.start, this.length);
        }
      },
      rowClick: function (item, row) {      
        row.select(true);
        this.$router.push({ name: 'semesterView', params: { id: item.semesterID } });
      },
      addSemester() {
        this.$router.push({ name: 'semesterAdd'});
      },
      cancel() {
        this.$router.go(-1);
      }
    }
  }
</script>