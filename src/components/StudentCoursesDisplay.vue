<template>
  <div>
    <table width="100%">
      <tr width="100%">
        <td width="4%">
          <router-link :to="{ name: 'studentCourseView', params: { id: student_courses.studentCourseID } }" 
            class="edit-btn">
            {{ student_courses.studentCourseID }}
          </router-link>
        </td>
        <td width="10%">
          <div class="student-name">
            {{ this.student.fName }} {{ this.student.lName }}
          </div>
        </td>
        <td width="10%">
          <div class="semester-name">
            {{ this.semester.semesterName }}
          </div>
        </td>
        <td width="10%">
          <div class="course-name">
            {{ this.course.courseName }}
          </div>
        </td>
        <td width="5%" class="edit-and-delete">
          <router-link
            :to="{
              name: 'studentCourseView',
              params: { id: student_courses.studentCourseID },
            }"
            class="edit-btn"
          >
            <span>view</span>
          </router-link>
        </td>
        <td width="5%" class="edit-and-delete">
          <router-link
            :to="{
              name: 'studentCourseView',
              params: { id: student_courses.studentCourseID },
            }"
            class="edit-btn"
          >
            <span>edit</span>
          </router-link>
        </td>
        <td width="5%" class="edit-and-delete">
          <a
            class="delete-btn"
            href="#"
            @click="
              deleteStudentCourse(
                student_courses.studentCourseID,
                student_courses.semesterID
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
import StudentCourseServices from "@/services/studentCourseServices.js";
import SemesterServices from "@/services/semesterServices.js";
import CourseServices from "@/services/courseServices.js";
import StudentServices from "@/services/studentServices.js";

export default {
  props: {
    student_courses: Object,
  },
  data() {
    return {
      course: {},
      semester: {},
      student: {},
      start: 1,
      length: 100,
    };
  },
  created() {
    StudentCourseServices.getStudentCourse(this.student_courses.studentCourseID)
      .then((response) => {
        this.student_courses = response.data;
        SemesterServices.getSemester(this.student_courses.semesterID)
          .then((response) => {
            this.semester = response.data;
            console.log(response.data);
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
        StudentServices.getStudent(this.student_courses.studentID)
          .then((response) => {
            this.student = response.data;
            console.log(response.data);
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
        CourseServices.getCourse(this.student_courses.courseID)
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
    deleteStudentCourse(id, studentCourseID) {
      this.$emit("delete-student_courses", id, studentCourseID);
    } /*,
            onWindowLoad(courseDescription) {
                this.appendChild(courseDescription.slice(0, 50));
            },*/,
  },
};
</script>