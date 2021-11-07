<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class="name-tag">Editing {{ this.course.courseName }}</h3>

    <form @submit.prevent="updateCourse">

      <div class="text-input-group">
              <div class='input-label'>Course Name</div>
              <input
                class="text-input"
                v-model="course.courseName"
                type="text"
                id="courseName"
                placeholder="Course Name"
              />
              <br>
              <div class='input-label'>Department Name</div>
              <input
                class="text-input"
                v-model="course.dept"
                type="text"
                id="dept"
                placeholder="Department Name"
              />
              <br>
              <div class='input-label'>Course Number</div>
              <input
                class="text-input"
                v-model="course.courseNum"
                type="text"
                id="courseNum"
                placeholder="Course Number"
              />
              <br>
              <div class='input-label'>Level</div>
              <input
                class="text-input"
                v-model="course.level"
                type="text"
                id="level"
                placeholder="level"
              />
              <br>
              <div class='input-label'>Hours</div>
              <input
                class="text-input"
                v-model="course.hours"
                type="text"
                id="hours"
                placeholder="Hours"
              />
              <br>
              <div class='input-label'>Semesters</div>
              <div class="input-label">Spring: &emsp;&emsp; Summer: &emsp;&emsp;&emsp; Fall: &emsp;&emsp;&emsp; Winter:</div>
              <input
                class="check-box"
                v-model="semesterBools.spring"
                type="checkbox"
                id="spring"
              />
              <input
                class="check-box"
                v-model="semesterBools.summer"
                type="checkbox"
                id="summer"
              />
              <input
                class="check-box"
                v-model="semesterBools.fall"
                type="checkbox"
                id="fall"
              />
              <input
                class="check-box"
                v-model="semesterBools.winter"
                type="checkbox"
                id="winter"
              />
              <br>
              <div class='input-label'>Description</div>
              <textarea
                class="textarea-input"
                v-model="course.description"
                type="textarea"
                rows='4'
                id="description"
                placeholder="Description...">
              </textarea>
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
import CourseServices from "@/services/courseServices.js";

export default {
  props: ["id"],

  data() {
    return {
      course: {},
      message: "Make updates to the Course",
      semesterBools: {},
    };
  },
  created() {
    CourseServices.getCourse(this.id)
      .then((response) => {
        this.course = response.data;
        console.log(response.data);
        this.getSemesterType();
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },

  methods: {
    updateCourse() {
      this.updateSemesterType()
      CourseServices.updateCourse(this.id, this.course)
        .then(() => {
          this.$router.go(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSemesterType() {
      if(this.course.semesterTypes != null) {
        var array = this.course.semesterTypes.split(",");
        array.forEach(element => {
        if(element == "Sp") {
          this.semesterBools.spring = true;
        }
        if(element == "Su") {
          this.semesterBools.summer = true;
        }
        if(element == "F") {
          this.semesterBools.fall = true;
        }
        if(element == "W") {
          this.semesterBools.winter = true;
        }
      });
      }
    },
    updateSemesterType() {
      var string = "";
      if(this.semesterBools.spring) {
        string += "Sp"
      }
      if(this.semesterBools.summer) {
        if (string.length > 0) {
          string += ","
        }
        string += "Su"
      }
      if(this.semesterBools.fall) {
        if (string.length > 0) {
          string += ","
        }
        string += "F"
      }
      if(this.semesterBools.winter) {
        if (string.length > 0) {
          string += ","
        }
        string += "W"
      }
      this.course.semesterTypes = string;
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>