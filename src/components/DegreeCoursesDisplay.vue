<template>
  <div>
    <table width="100%">
      <tr width="100%">
        <td width="10">
          <router-link :to="{ name: 'degreeCourseView', params: { id: degree_courses.degreeCourseID } }" 
            class="edit-btn">
            {{ degree_courses.degreeCourseID }}
          </router-link>
        </td>
        <td width="25%">
          <div class="degree-name">
            {{ this.degree.degreeName }}
          </div>
        </td>
        <td width="30%">
          <div class="course-name">
            {{ this.course.courseName }}
          </div>
        </td>
        <td width="10%" class="edit-and-delete">
          <router-link
            :to="{
              name: 'degreeCourseEdit',
              params: { id: degree_courses.degreeCourseID },
            }"
            class="edit-btn"
          >
            <span>edit</span>
          </router-link>
        </td>
        <td width="10%" class="edit-and-delete">
          <a
            class="delete-btn"
            href="#"
            @click="
              deleteDegreeCourse(
                degree_courses.degreeCourseID,
                degree_courses.degreeID
              )
            "
          >
            <span>delete</span>
          </a>
        </td>
      </tr>
    </table>
  </div>
</template>
<style>
@import "../assets/styles/course-list.css";
</style>

<script>
import DegreeCourseServices from "@/services/degreeCourseServices.js";
import DegreeServices from "@/services/degreeServices.js";
import CourseServices from "@/services/courseServices.js";

export default {
  props: {
    degree_courses: Object,
  },
  data() {
    return {
      course: {},
      degree: {},
    };
  },
  created() {
    DegreeCourseServices.getDegreeCourse(this.degree_courses.degreeCourseID)
      .then((response) => {
        this.degree_courses = response.data;
        DegreeServices.getDegree(this.degree_courses.degreeID)
          .then((response) => {
            this.degree = response.data;
            console.log(response.data);
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
        CourseServices.getCourse(this.degree_courses.courseID)
          .then((response) => {
            this.course = response.data;
            console.log(response.data);
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
          console.log(response.data);
          })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    deleteDegreeCourse(id, degreeCourseID) {
      this.$emit("delete-degree_courses", id, degreeCourseID);
    } /*,
            onWindowLoad(courseDescription) {
                this.appendChild(courseDescription.slice(0, 50));
            },*/,
  },
};
</script>