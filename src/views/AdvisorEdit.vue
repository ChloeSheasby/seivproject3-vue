<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class="name-tag">Editing {{ this.advisor.fName }} {{ this.advisor.lName }}</h3>

    <form @submit.prevent="updateAdvisor">

      <div class="text-input-group">
              <div class='input-label'>First Name</div>
              <input
                class="text-input"
                v-model="advisor.fName"
                type="text"
                id="fName"
                placeholder="First Name"
              />
              <br>
              <div class='input-label'>Last Name</div>
              <input
                class="text-input"
                v-model="advisor.lName"
                type="text"
                id="lName"
                placeholder="Last Name"
              />
              <br>
              <div class='input-label'>Email</div>
              <input
                class="text-input"
                v-model="advisor.email"
                type="text"
                id="email"
                placeholder="Email"
              />
              <br>
              <div class='input-label'>Department Name</div>
              <input
                class="text-input"
                v-model="advisor.dept"
                type="text"
                id="dept"
                placeholder="Department Name"
              />
              <br>
              <div class='input-label'>Role</div>
              <input
                class="text-input"
                v-model="advisor.role"
                type="text"
                id="role"
                placeholder="Role"
              />
              <br>
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
import AdvisorServices from "@/services/advisorServices.js";

export default {
  props: ["id"],

  data() {
    return {
      advisor: {},
      message: "Make updates to the Advisor",
    };
  },
  created() {
    AdvisorServices.getAdvisor(this.id)
      .then((response) => {
        this.advisor = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },

  methods: {
    updateAdvisor() {
      AdvisorServices.updateAdvisor(this.id, this.advisor)
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