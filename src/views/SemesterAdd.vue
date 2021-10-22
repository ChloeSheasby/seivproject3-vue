<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class='name-tag'>Add Semester</h3>

    <form @submit.prevent="addSemester">
      
      <div class="text-input-group">
              <input
                class="text-input"
                v-model="semester.semesterName"
                type="text"
                id="semesterName"
                placeholder="Semester Name"
              />
              <br>
              <input
                class="text-input"
                v-model="semester.semesterType"
                type="text"
                id="semesterType"
                placeholder="Semester Type"
              />
              <br>
              <input
                class="text-input"
                v-model="semester.startDate"
                type="text"
                id="startDate"
                placeholder="Start Date"
              />
              <br>
              <input
                class="text-input"
                v-model="semester.endDate"
                type="text"
                id="endDate"
                placeholder="End Date"
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
import SemesterServices from "@/services/semesterServices.js";
export default {
  data() {
    return {
      semester: {},
    };
  },
  methods: {
    addSemester() {
      SemesterServices.addSemester(this.semester)
        .then(() => {
          this.$router.push({ name: "semesterList" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "semesterList" });
    },
  },
};
</script>