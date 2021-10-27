<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class="name-tag">Editing {{ this.degree_courses.degreeCourseID }}</h3>

    <form @submit.prevent="updateDegreeCourse">

      <div class="text-input-group">
        <div class='input-label'>Degree</div>
        <input list="degrees" id="degreeGetter" name="degreeGetter" v-model="degree_courses.degreeID"/>
          <datalist id="degrees">
            <DegreeDisplayDC
              v-for="degree in degrees"
              :key="degree.degreeID"
              :degree="degree"
            />
          </datalist>
        <br>
        <div class='input-label'>Course</div>
        <input list="courses" id="courseGetter" name="courseGetter" v-model="degree_courses.courseID"/>
          <datalist id="courses">
            <CourseDisplayDC
              v-for="course in courses"
              :key="course.courseID"
              :course="course"
            />
          </datalist>
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
  props: ["id"],
  data() {
    return {
      degree_courses: {},
      courses: {},
      degrees: {},
      message: "Make updates to the Degree Courses",
    };
  },
  created() {
    this.getAllCourses();
    this.getAllDegrees();
    DegreeCourseServices.getDegreeCourse(this.id)
      .then((response) => {
        this.degree_courses = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
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
    updateDegreeCourse() {
      DegreeCourseServices.updateDegreeCourse(this.id, this.degree_courses)
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