<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class="name-tag">Editing {{ this.semester.name }}</h3>

    <form @submit.prevent="updateSemester">

      <div class="text-input-group">
              <div class='input-label'>Semester Name</div>
              <input
                class="text-input"
                v-model="semester.semesterName"
                type="text"
                id="semesterName"
                placeholder="Semester Name"
              />
              <br>
              <div class='input-label'>Semester Type</div>
              <input
                class="text-input"
                v-model="semester.semesterType"
                type="text"
                id="semesterType"
                placeholder="Semester Type"
              />
              <br>
              <div class='input-label'>Start Date</div>
              <input
                class="text-input"
                v-model="semester.startDate"
                type="text"
                id="startDate"
                placeholder="Start Date"
              />
              <br>
              <div class='input-label'>End Date</div>
              <input
                class="text-input"
                v-model="semester.endDate"
                type="text"
                id="endDate"
                placeholder="End Date"
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
import SemesterServices from "@/services/semesterServices.js";

export default {
  props: ["id"],

  data() {
    return {
      semester: {},
      message: "Make updates to the Semester",
    };
  },
  created() {
    SemesterServices.getSemester(this.id)
      .then((response) => {
        this.semester = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },

  methods: {
    updateSemester() {
      SemesterServices.updateSemester(this.id, this.semester)
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