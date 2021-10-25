<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class="name-tag">Editing {{ this.degree.degreeName }}</h3>

    <form @submit.prevent="updateDegree">

      <div class="text-input-group">
              <div class='input-label'>Degree Name</div>
              <input
                class="text-input"
                v-model="degree.degreeName"
                type="text"
                id="degreeName"
                placeholder="Degree Name"
              />
              <br>
              <div class='input-label'>Department Name</div>
              <input
                class="text-input"
                v-model="degree.dept"
                type="text"
                id="dept"
                placeholder="Department Name"
              />
              <br>
              <div class='input-label'>Total Hours</div>
              <input
                class="text-input"
                v-model="degree.totalHours"
                type="text"
                id="totalHours"
                placeholder="Total Hours"
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
import DegreeServices from "@/services/degreeServices.js";

export default {
  props: ["id"],

  data() {
    return {
      degree: {},
      message: "Make updates to the Degree",
    };
  },
  created() {
    DegreeServices.getDegree(this.id)
      .then((response) => {
        this.degree = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },

  methods: {
    updateDegree() {
      DegreeServices.updateDegree(this.id, this.degree)
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