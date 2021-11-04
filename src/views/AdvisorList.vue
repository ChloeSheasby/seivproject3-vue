<template>
  <div>
    <h3 class='name-tag'>Advisor List</h3>    
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
              <th width='40%'>
                  Advisor Name
              </th>
              <th width='10%'></th>
              <th width='10%'></th>
            </tr>
          </thead>
        </table>
        <AdvisorDisplay v-for="advisor in advisors" :key="advisor.advisorID" :advisor="advisor" @delete-advisor=deleteAdvisor />
  </div>
</template>

<style>
  @import '../assets/styles/basic.css';
</style>

<script>
  import AdvisorDisplay from '@/components/AdvisorDisplay.vue'
  import AdvisorServices from '@/services/advisorServices.js'
  //import UserDisplay from '@/components/UserDisplay.vue'
  export default {
    name: 'App',
    components: {
      AdvisorDisplay
    },
    data() {
      return {
        advisors: [],
        start: 1,
        length: 100
      }
    },
    created() {
      this.getAdvisors(this.start, this.length);
    },
    methods: {
      getAdvisors(start, length) {
        AdvisorServices.getAdvisors(start, length)
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
      }
    }
  }
</script>