<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Student Course {{ this.student_courses.studentCourseID }}</v-toolbar-title>
      </v-toolbar>
      <br>
      <v-form
      ref="form" 
      v-model="valid"
      lazy validation
    >

      <v-select
        v-if="this.$store.state.loginUser.role !== 'student'"
        v-model="student_courses.studentID"
        :items="students"
        :item-text="item => item.fName +' '+ item.lName"
        item-value="studentID"
        label="Student"
        required
      >
      </v-select>

      <v-text-field
        v-else
        v-model="studentName"
        id="student_courses.studentID"
        label="First Name"
        readonly
      ></v-text-field>

      <v-select
        v-model="student_courses.courseID"
        :items="courses"
        item-text="courseName"
        item-value="courseID"
        label="Course"
        required
      >
      </v-select>

      <v-select
        v-model="student_courses.semesterID"
        :items="semesters"
        item-text="semesterName"
        item-value="semesterID"
        label="Semester"
        required
      >
      </v-select>

      <v-select
        v-model="student_courses.grade"
        :items="grades"
        item-text="grade"
        label="Grade"
        required
      >
      </v-select>

      <v-select
        v-model="student_courses.status"
        :items="states"
        item-text="status"
        label="Status"
        required
      >
      </v-select>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="updateStudentCourse"
      >
        Save
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="cancel"
      >
        Cancel
      </v-btn>
    </v-form>   
    </v-container>
  </div>
</template>
<style>
@import "../assets/styles/basic.css";
</style>

<script>
import StudentCourseServices from "@/services/studentCourseServices.js";
import CourseServices from "@/services/courseServices.js";
import StudentServices from "@/services/studentServices.js";
import SemesterServices from "@/services/semesterServices.js";

export default {
  components: {
  },
  props: ["id"],
  data() {
    return {
      student_courses: {},
      student: {},
      courses: {},
      semesters: {},
      students: {},
      grades: ['', 'A', 'B', 'C', 'D', 'F'],
      states: ['Completed', 'In-Progress', 'Upcoming'],
      message: "Make updates to the Student Courses",
    };
  },
  computed: {
    studentName: {
      get() {
        return `${this.student.fName} ${this.student.lName}`;
      }
    }
  },
  created() {
    this.getAllCourses();
    this.getAllStudents();
    this.getAllSemesters();
    StudentCourseServices.getStudentCourse(this.id)
      .then((response) => {
        this.student_courses = response.data;
        this.getStudent(this.student_courses.studentID);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },

  methods: {
    getStudent(id) {
      StudentServices.getStudent(id)
      .then((response) => {
        this.student = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });   
    },
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