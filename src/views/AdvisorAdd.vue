<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class='name-tag'>Add Advisor</h3>

    <form @submit.prevent="addAdvisor">
      
      <div class="text-input-group">
              <input
                class="text-input"
                v-model="advisor.fName"
                type="text"
                id="fName"
                placeholder="First Name"
              />
              <br>
              <input
                class="text-input"
                v-model="advisor.lName"
                type="text"
                id="lName"
                placeholder="Last Name"
              />
              <br>
              <input
                class="text-input"
                v-model="advisor.email"
                type="text"
                id="email"
                placeholder="Email"
              />
              <br>
              <input
                class="text-input"
                v-model="advisor.dept"
                type="text"
                id="dept"
                placeholder="Department Name"
              />
              <br>
              <input
                class="text-input"
                v-model="advisor.role"
                type="text"
                id="role"
                placeholder="Role"
              />
              <br>
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
import AdvisorServices from "@/services/advisorServices.js";
export default {
  data() {
    return {
      advisor: {},
    };
  },
  methods: {
    addAdvisor() {
      AdvisorServices.addAdvisor(this.advisor)
        .then(() => {
          this.$router.push({ name: "advisorList" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "advisorList" });
    },
  },
};
</script>