<template>
  <div>
    <div class='name-tag'>Degree List</div>    
  <div>
    <table class='center transparent-background' width='100%'>
      <tr>
        <td style='padding-left: 25%; text-align: left;'><button class='arrows' name="previous" v-on:click.prevent="getPrevious()">&#60;</button></td>
        <td style='text-align: center;'><router-link to="/degreeAdd">Add Degree</router-link></td>
        <td style='padding-right: 25%; text-align: right;'><button class='arrows' name="next" v-on:click.prevent="getNext()">&#62;</button></td>
      </tr>
    </table>
  </div>
    <br>
        <table width='100%'>
          <thead>
            <tr>
              <th width='40%'>
                  Degree Name
              </th>
              <th width='10%'></th>
              <th width='10%'></th>
            </tr>
          </thead>
        </table>
        <DegreeDisplay v-for="degree in degrees" :key="degree.degreeID" :degree="degree" @delete-degree=deleteDegree />
  </div>
</template>

<style>
  @import '../assets/styles/basic.css';
</style>

<script>
  import DegreeDisplay from '@/components/DegreeDisplay.vue'
  import DegreeServices from '@/services/degreeServices.js'
  //import UserDisplay from '@/components/UserDisplay.vue'
  export default {
    name: 'App',
    components: {
      DegreeDisplay
    },
    data() {
      return {
        degrees: [],
        start: 1,
        length: 100
      }
    },
    created() {
      this.getDegrees(this.start, this.length);
    },
    methods: {
      getDegrees(start, length) {
        DegreeServices.getDegrees(start, length)
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
      }
    }
  }
</script>