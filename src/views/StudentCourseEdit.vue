<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <h3 class="name-tag">Editing {{ this.student_courses.studentCourseID }}</h3>

    <form @submit.prevent="updateStudentCourse">

      <div class="text-input-group">
        <div class='input-label'>Student</div>
        <input list="students" id="studentGetter" name="studentGetter" v-model="student_courses.studentID"/>
          <datalist id="students">
            <StudentDisplaySC
              v-for="student in students"
              :key="student.studentID"
              :student="student"
            />
          </datalist>
        <br>
        <div class='input-label'>Semester</div>
        <input list="semesters" id="semesterGetter" name="semesterGetter" v-model="student_courses.semesterID"/>
          <datalist id="semesters">
            <SemesterDisplaySC
              v-for="semester in semesters"
              :key="semester.semesterID"
              :semester="semester"
            />
          </datalist>
          
        <div class='input-label'>Course</div>
        <input list="courses" id="courseGetter" name="courseGetter" v-model="student_courses.courseID"/>
          <datalist id="courses">
            <CourseDisplaySC
              v-for="course in courses"
              :key="course.courseID"
              :course="course"
            />
          </datalist>
          
        <div class='input-label'>Grade</div>
        <select v-model="student_courses.grade">
            <option> A </option>
            <option> B </option>
            <option> C </option>
            <option> D </option>
            <option> F </option>
        </select>
          
        <div class='input-label'>Status</div>
        <select v-model="student_courses.status">
            <option> Completed </option>
            <option> In-Progress </option>
            <option> Upcoming </option>
        </select>
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
import CourseDisplaySC from "@/components/CourseDisplaySC.vue";
import StudentDisplaySC from "@/components/StudentDisplaySC.vue";
import SemesterDisplaySC from "@/components/SemesterDisplaySC.vue";
import StudentCourseServices from "@/services/studentCourseServices.js";
import CourseServices from "@/services/courseServices.js";
import StudentServices from "@/services/studentServices.js";
import SemesterServices from "@/services/semesterServices.js";

export default {
  components: {
    CourseDisplaySC,
    StudentDisplaySC,
    SemesterDisplaySC,
  },
  props: ["id"],
  data() {
    return {
      student_courses: {},
      courses: {},
      semesters: {},
      students: {},
      message: "Make updates to the Student Courses",
    };
  },
  created() {
    this.getAllCourses();
    this.getAllStudents();
    this.getAllSemesters();
    StudentCourseServices.getStudentCourse(this.id)
      .then((response) => {
        this.student_courses = response.data;
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
    getAllSemesters() {
      SemesterServices.getAllSemesters()
        .then((response) => {
          this.semesters = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    getAllStudents() {
      StudentServices.getAllStudents()
        .then((response) => {
          this.students = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    updateStudentCourse() {
      StudentCourseServices.updateStudentCourse(this.id, this.student_courses)
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