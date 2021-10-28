<template>
    <div>
        <table width='100%'>
        <tr width='100%'>
            <td width='20%' >
                <div class='course-num'>
                    {{ this.course.courseNum }}
                </div>
            </td>
            <td width='40%'>
            <router-link :to="{ name: 'courseView', params: { id: this.course.courseID } }"  class='edit-btn'>
                {{ this.course.courseName }}
                <div id="myId" ref="myId">{{  }}</div>
            </router-link>
            </td>
            <td width='10%' class='edit-and-delete'>
                <router-link :to="{ name: 'courseEdit', params: { id: this.course.courseID } }"  class='edit-btn'>
                    <span>edit</span>
                </router-link>
            </td>
            <td width='10%' class='edit-and-delete'>
                <a  class='delete-btn' href = "#" @click="deleteCourse(this.course.courseID, this.course.courseName)">
                    <span>delete</span>
                </a>
            </td>
        </tr>
        </table>
    </div>
</template>
<style>
  @import '../assets/styles/course-list.css';
</style>

<script>
import DegreeCourseServices from "@/services/degreeCourseServices.js";
import CourseServices from "@/services/courseServices.js";
export default {
    props: {
        degree_courses: Object
    },
    data() {
        return {
            course: {},
            //dcTemp: {},
        };
    },
    created() {
        DegreeCourseServices.getDegreeCourse(this.degree_courses.degreeCourseID)
          .then((response) => {
            this.degree_courses = response.data;
            CourseServices.getCourse(this.degree_courses.courseID)
                .then((response) => {
                  this.course = response.data;
                  console.log(response.data);
                })
                .catch((error) => {
                  console.log(this.courseID);
                  console.log("There was an error:", error.response);
                });
            
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
    },
    methods: {
        deleteCourse(id, courseName) {
            this.$emit('delete-course', id, courseName);
        },
        onWindowLoad(courseDescription) {
            this.appendChild(courseDescription.slice(0, 50));
        },
    }
}
</script>