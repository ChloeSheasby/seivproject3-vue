<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class='name-tag'>Add Course</h3>

    <form @submit.prevent="addCourse">
      
      <div class="text-input-group">
              <input
                class="text-input"
                v-model="course.courseName"
                type="text"
                id="courseName"
                placeholder="Course Name"
              />
              <br>
              <input
                class="text-input"
                v-model="course.dept"
                type="text"
                id="dept"
                placeholder="Department Name"
              />
              <br>
              <input
                class="text-input"
                v-model="course.courseNum"
                type="text"
                id="courseNum"
                placeholder="Course Number"
              />
              <br>
              <input
                class="text-input"
                v-model="course.level"
                type="text"
                id="level"
                placeholder="Level"
              />
              <br>
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
              <textarea
                class="textarea-input"
                v-model="course.description"
                type="textarea"
                rows='4'
                id="description"
                placeholder="Description...">
              </textarea>
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
import CourseServices from "@/services/courseServices.js";
export default {
  data() {
    return {
      course: {},
      semesterBools: {},
    };
  },
  methods: {
    addCourse() {
      this.updateSemesterType()
      CourseServices.addCourse(this.course)
        .then(() => {
          this.$router.push({ name: "courseList" });
        })
        .catch((error) => {
          console.log(error);
        });
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
      this.$router.push({ name: "courseList" });
    },
  },
};
</script>