<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Degrees</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="text-center">
        <v-btn
          v-if="this.$store.state.loginUser.role === 'admin'"
        class="no-text-transform"
          color="success"
          elevation="2"
          @click="viewAllDC"
        >
          Courses
      </v-btn>
        </div>
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
          @click="addDegree"
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
          :items="degrees"
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
  import DegreeServices from '@/services/degreeServices.js'
  export default {
    name: 'App',
    components: {
    },
    data() {
      return {
        search: '',
        degrees: [],
        headers: [{text: 'ID', value: 'degreeID'}, 
                  {text: 'Degree Name', value: 'degreeName'}]
      }
    },
    created() {
      this.getDegrees();
    },
    methods: {
      getDegrees() {
        DegreeServices.getAllDegrees()
        .then(response => {
          this.degrees = response.data;
        })
        .catch(error => {
          console.log("There was an error:", error.response)
        });
      },
      deleteDegree(id, degreeName) {
        let confirmed = confirm(`Are you sure you want to delete ${degreeName}`);
        if(confirmed) {
          DegreeServices.deleteDegree(id)
          .then(() => {
            this.getDegrees(this.start, this.length);
          })
          .catch(error => {
            console.log("There was an error:", error.response)
          });
        }
      },
      getPrevious() {
        if(this.start >= this.length) {
          this.start -= this.length;
          this.getDegrees(this.start, this.length);
        }
      },
      getNext() {
        if(this.courses.length === this.length) {
          this.start += this.length;
          this.getDegrees(this.start, this.length);
        }
      },
      rowClick: function (item, row) {      
        row.select(true);
        this.$router.push({ name: 'degreeView', params: { id: item.degreeID } });
      },
      addDegree() {
        this.$router.push({ name: 'degreeAdd'});
      },
      viewAllDC() {
        this.$router.push({ name: 'degreeCourseList'});
      },
      cancel() {
        this.$router.go(-1);
      }
    }
  }
</script>