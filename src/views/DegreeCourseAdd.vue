<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class="name-tag">Add Degree Course</h3>
    <br />
    <form @submit.prevent="addDegreeCourse">
      Major:
      <input list="degrees" id="degreeGetter" name="degreeGetter" v-model="degree_courses.degreeID"/>
        <datalist id="degrees">
          <DegreeDisplayDC
            v-for="degree in degrees"
            :key="degree.degreeID"
            :degree="degree"
          />
        </datalist>
        <br />
        <br />
        <div class="text-input-group">
      Course:   
      <input list="courses" id="courseGetter" name="courseGetter" v-model="degree_courses.courseID"/>
        <datalist id="courses">
          <CourseDisplayDC
            v-for="course in courses"
            :key="course.courseID"
            :course="course"
          />
        </datalist>
        <br />
      </div>

      <div class="text-input-group">
        <table class="center transparent-background" width="100%">
          <tr>
            <td style="text-align: right">
              <button name="cancel" v-on:click.prevent="cancel()">
                Cancel
              </button>
            </td>
            <td style="text-align: left">
              <input type="submit" name="submit" value="Save" />
            </td>
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
import CourseDisplayDC from "@/components/CourseDisplayDC.vue";
import DegreeDisplayDC from "@/components/DegreeDisplayDC.vue";
import DegreeCourseServices from "@/services/degreeCourseServices.js";
import CourseServices from "@/services/courseServices.js";
import DegreeServices from "@/services/degreeServices.js";

export default {
  components: {
    CourseDisplayDC,
    DegreeDisplayDC,
  },
  data() {
    return {
      degree_courses: {},
      courses: {},
      degrees: {},
    };
  },
  created() {
    this.getAllCourses();
    this.getAllDegrees();
  },
  methods: {
    getAllCourses() {
      CourseServices.getAllCourses()
        .then((response) => {
          this.courses = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    getAllDegrees() {
      DegreeServices.getAllDegrees()
        .then((response) => {
          this.degrees = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    addDegreeCourse() {
      DegreeCourseServices.addDegreeCourse(this.degree_courses)
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