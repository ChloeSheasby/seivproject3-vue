<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class="name-tag">Add Student Course</h3>
    <br />
    <form @submit.prevent="addStudentCourse">
      Student:
      <input list="students" id="studentGetter" name="studentGetter" v-model="student_courses.studentID"/>
        <datalist id="students">
          <StudentDisplaySC
            v-for="student in students"
            :key="student.studentID"
            :student="student"
          />
        </datalist>
        <br />
        <br />
        Semester:   
      <input list="semesters" id="semesterGetter" name="semesterGetter" v-model="student_courses.semesterID"/>
        <datalist id="semesters">
          <SemesterDisplaySC
            v-for="semester in semesters"
            :key="semester.semesterID"
            :semester="semester"
          />
        </datalist>
        <br />
        <br />
        <div class="text-input-group">
      Course:   
      <input list="courses" id="courseGetter" name="courseGetter" v-model="student_courses.courseID"/>
        <datalist id="courses">
          <CourseDisplaySC
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
import CourseDisplaySC from "@/components/CourseDisplaySC.vue";
import StudentDisplaySC from "@/components/StudentDisplaySC.vue";
import SemesterDisplaySC from "@/components/SemesterDisplaySC.vue";
import StudentCourseServices from "@/services/studentCourseServices.js";
import CourseServices from "@/services/courseServices.js";
import StudentServices from "@/services/studentServices.js";
import SemestersServices from "@/services/semesterServices.js";

export default {
  components: {
    CourseDisplaySC,
    StudentDisplaySC,
    SemesterDisplaySC,
  },
  data() {
    return {
      student_courses: {},
      courses: {},
      students: {},
      semesters: {},
    };
  },
  created() {
    this.getAllCourses();
    this.getAllStudents();
    this.getAllSemesters();
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
    getAllStudents() {
      StudentServices.getAllStudents()
        .then((response) => {
          this.students = response.data;
          console.log(this.students)
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    getAllSemesters() {
      SemestersServices.getAllSemesters()
        .then((response) => {
          this.semesters = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    addStudentCourse() {
      StudentCourseServices.addStudentCourse(this.student_courses)
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