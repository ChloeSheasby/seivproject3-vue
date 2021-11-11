<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Students</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
        class="no-text-transform"
          color="success"
          elevation="2"
          @click="viewAllSC"
          v-if="this.$store.state.loginUser.role === 'admin'"
        >
          Courses
      </v-btn>
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
          @click="addStudent"
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
          :items="students"
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
  import StudentServices from '@/services/studentServices.js'
  export default {
    name: 'App',
    components: {
    },
    data() {
      return {
        search: '',
        students: [],
        headers: [{text: 'ID', value: 'studentID'}, 
                  {text: 'Last Name', value: 'lName'},
                  {text: 'First Name', value: 'fName'}]
      }
    },
    created() {
      this.getStudents();
    },
    methods: {
      getStudents() {
        StudentServices.getAllStudents()
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
      getPrevious() {
        if(this.start >= this.length) {
          this.start -= this.length;
          this.getStudents(this.start, this.length);
        }
      },
      getNext() {
        if(this.courses.length === this.length) {
          this.start += this.length;
          this.getStudents(this.start, this.length);
        }
      },
      rowClick: function (item, row) {      
        row.select(true);
        this.$router.push({ name: 'studentView', params: { id: item.studentID } });
      },
      addStudent() {
        this.$router.push({ name: 'studentAdd'});
      },
      viewAllSC() {
        this.$router.push({ name: 'studentCourseList'});
      },
      cancel() {
        this.$router.go(-1);
      }
    }
  }
</script>