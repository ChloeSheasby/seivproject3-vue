<template>
  <div>
    <h3 class='name-tag'>Semester List</h3>    
  <div>
    <table class='center transparent-background' width='100%'>
      <tr>
        <td style='padding-left: 25%; text-align: left;'><button class='arrows' name="previous" v-on:click.prevent="getPrevious()">&#60;</button></td>
        <td style='padding-right: 25%; text-align: right;'><button class='arrows' name="next" v-on:click.prevent="getNext()">&#62;</button></td>
      </tr>
    </table>
  </div>
    <br>
        <table width='100%'>
          <thead>
            <tr>
              <th width='20%'>
                  Semester Number
              </th>
              <th width='40%'>
                  Semester Name
              </th>
              <th width='10%'></th>
              <th width='10%'></th>
            </tr>
          </thead>
        </table>
        <SemesterDisplay v-for="semester in semesters" :key="semester.semesterID" :semester="semester" @delete-semester=deleteSemester />
  </div>
</template>

<style>
  @import '../assets/styles/basic.css';
</style>

<script>
  import SemesterDisplay from '@/components/SemesterDisplay.vue'
  import SemesterServices from "@/services/semesterServices.js"
  //import UserDisplay from '@/components/UserDisplay.vue'
  export default {
    name: 'App',
    components: {
      SemesterDisplay
    },
    data() {
      return {
        semesters: [],
        start: 1,
        length: 100
      }
    },
    created() {
      this.getSemesters(this.start, this.length);
    },
    methods: {
      getSemesters(start, length) {
        SemesterServices.getSemesters(start, length)
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
      }
    }
  }
</script>