<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class='name-tag'>Add Student</h3>

    <form @submit.prevent="addStudent">
      
      <div class="text-input-group">
              <input
                class="text-input"
                v-model="student.degreeID"
                type="text"
                id="degreeID"
                placeholder="Degree ID"
              />
              <br>
              <input
                class="text-input"
                v-model="student.advisorID"
                type="text"
                id="advisorID"
                placeholder="Advisor ID"
              />
              <br>
              <input
                class="text-input"
                v-model="student.fName"
                type="text"
                id="fName"
                placeholder="First Name"
              />
              <br>
              <input
                class="text-input"
                v-model="student.lName"
                type="text"
                id="lName"
                placeholder="Last Name"
              />
              <br>
              <input
                class="text-input"
                v-model="student.email"
                type="text"
                id="email"
                placeholder="Email"
              />
      </div>
      
            <div class="text-input-group">
              <table class='center transparent-background' width='100%'>
                <tr>
                  <td style='text-align: right;'><button name="cancel" v-on:click.prevent="cancel()">Cancel</button></td>
                  <td style='text-align: left;'><input type="submit" name="submit" value="Save"></td>
                </tr>
              </table>
            </div>
    </form>
  </div>
</template>
<style>
@import "../assets/styles/basic.css";
</style>

<script>
import StudentServices from "@/services/studentServices.js";
export default {
  data() {
    return {
      student: {},
    };
  },
  methods: {
    addStudent() {
      StudentServices.addStudent(this.student)
        .then(() => {
          this.$router.push({ name: "studentList" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "studentList" });
    },
  },
};
</script>