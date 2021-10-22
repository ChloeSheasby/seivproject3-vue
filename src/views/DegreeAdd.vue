<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class='name-tag'>Add Degree</h3>

    <form @submit.prevent="addDegree">
      
      <div class="text-input-group">
              <input
                class="text-input"
                v-model="degree.degreeName"
                type="text"
                id="degreeName"
                placeholder="Degree Name"
              />
              <br>
              <input
                class="text-input"
                v-model="degree.dept"
                type="text"
                id="dept"
                placeholder="Department"
              />
              <br>
              <input
                class="text-input"
                v-model="degree.totalHours"
                type="text"
                id="totalHours"
                placeholder="Total Hours"
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
import DegreeServices from "@/services/degreeServices.js";
export default {
  data() {
    return {
      degree: {},
    };
  },
  methods: {
    addDegree() {
      DegreeServices.addDegree(this.degree)
        .then(() => {
          this.$router.push({ name: "degreeList" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "degreeList" });
    },
  },
};
</script>