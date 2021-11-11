<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Advisors</v-toolbar-title>
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
        v-if="this.$store.state.loginUser.role === 'admin'"
        color="accent"
        elevation="2"
        @click="addAdvisor"
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
        :items="advisors"
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
  import AdvisorServices from '@/services/advisorServices.js'
  export default {
    name: 'App',
    components: {
    },
    data() {
      return {
        search: '',
        advisors: [],
        headers: [{text: 'ID', value: 'advisorID'}, 
                  {text: 'Last Name', value: 'lName'},
                  {text: 'First Name', value: 'fName'}]
      }
    },
    created() {
      this.getAdvisors();
    },
    methods: {
      getAdvisors() {
        AdvisorServices.getAllAdvisors()
        .then(response => {
          this.advisors = response.data;
        })
        .catch(error => {
          console.log("There was an error:", error.response)
        });
      },
      deleteAdvisor(id, fName) {
        let confirmed = confirm(`Are you sure you want to delete ${fName}`);
        if(confirmed) {
          AdvisorServices.deleteAdvisor(id)
          .then(() => {
            this.getAdvisors(this.start, this.length);
          })
          .catch(error => {
            console.log("There was an error:", error.response)
          });
        }
      },
      getPrevious() {
        if(this.start >= this.length) {
          this.start -= this.length;
          this.getAdvisors(this.start, this.length);
        }
      },
      getNext() {
        if(this.courses.length === this.length) {
          this.start += this.length;
          this.getAdvisors(this.start, this.length);
        }
      },
      rowClick: function (item, row) {      
        row.select(true);
        this.$router.push({ name: 'advisorView', params: { id: item.advisorID } });
      },
      addAdvisor() {
        this.$router.push({ name: 'advisorAdd'});
      },
      cancel() {
        this.$router.go(-1);
      }
    }
  }
</script>