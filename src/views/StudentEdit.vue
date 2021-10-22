<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class="name-tag">Editing {{ this.student.studentName }}</h3>

    <form @submit.prevent="updateStudent">

      <div class="text-input-group">
              <div class='input-label'>Degree ID</div>
              <input
                class="text-input"
                v-model="student.degreeID"
                type="text"
                id="degreeID"
                placeholder="Degree ID"
              />
              <br>
              <div class='input-label'>Advisor ID</div>
              <input
                class="text-input"
                v-model="student.advisorID"
                type="text"
                id="advisorID"
                placeholder="Advisor ID"
              />
              <br>
              <div class='input-label'>First Name</div>
              <input
                class="text-input"
                v-model="student.fName"
                type="text"
                id="fName"
                placeholder="First Name"
              />
              <br>
              <div class='input-label'>Last Name</div>
              <input
                class="text-input"
                v-model="student.lName"
                type="text"
                id="lName"
                placeholder="Last Name"
              />
              <br>
              <div class='input-label'>Email</div>
              <input
                class="text-input"
                v-model="student.email"
                type="text"
                id="email"
                placeholder="Email"
              />
      </div>
      <input type="submit" name="submit" value="Save" />
      <button name="cancel" v-on:click.prevent="cancel()">Cancel</button>
    </form>
  </div>
</template>
<style>
@import "../assets/styles/basic.css";
</style>

<script>
import StudentServices from "@/services/studentServices.js";

export default {
  props: ["id"],

  data() {
    return {
      student: {},
      message: "Make updates to the Student",
    };
  },
  created() {
    StudentServices.getStudent(this.id)
      .then((response) => {
        this.student = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },

  methods: {
    updateStudent() {
      StudentServices.updateStudent(this.id, this.student)
        .then(() => {
          this.$router.go(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>