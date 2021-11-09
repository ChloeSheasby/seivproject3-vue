<template>  <div style="">
    <h3 class="name-tag">Welcome, {{ this.student.fName }} {{ this.student.lName }}</h3>
    <div style="margin-left: 32%; text-align: left">
      <br />
      <div class="text-input">Degree ID: {{ this.student.degreeID }}</div>
      <div class="text-input">Advisor ID: {{ this.student.advisorID }}</div>
      <div class="text-input">First Name: {{ this.student.fName }}</div>
      <div class="text-input">Last Name: {{ this.student.lName }}</div>
      <div class="text-input">Email: {{ this.student.email }}</div>
      </div>
      <br>
      <br>
    <h3 class='name-tag'>My Courses</h3>    
        <div>
          <table class='center transparent-background' width='100%'>
            <tr>
              <td style='padding-left: 25%; text-align: left;'><button class='arrows' name="previous" v-on:click.prevent="getPrevious()">&#60;</button></td>
              <td style='padding-right: 25%; text-align: right;'><button class='arrows' name="next" v-on:click.prevent="getNext()">&#62;</button></td>
            </tr>
          </table>
        </div>
      <br>
          <table width='100%'>
            <thead>
              <tr>
                <th width='20%'>
                    Course Number
                </th>
                <th width='40%'>
                    Course Name
                </th>
                <th width='10%'></th>
                <th width='10%'></th>
              </tr>
            </thead>
          </table>
          <CourseDisplayStudent
            v-for="student_courses in student_courses"
             :key="student_courses.studentCourseID"
            :student_courses="student_courses"
          />  
          </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import StudentServices from "@/services/studentServices.js";
//import UserDisplay from '@/components/UserDisplay.vue'
import StudentCourseServices from "@/services/studentCourseServices.js";
import CourseDisplayStudent from '@/components/CourseDisplayStudent.vue'
export default {
  props: ["id"],

  data() {
    return {
      student: {},
      student_courses: [],
      courses: [],
      degree: {},
      advisor: {},
      scTemp: [],
    };
  },
  components: {
    CourseDisplayStudent
  },
  created() {
    StudentServices.getStudent(this.id)
      .then((response) => {
        this.student = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
      StudentCourseServices.getAllStudentCourses()
      .then(response => {
        this.student_courses = response.data;
        for (let i = 0; i < this.student_courses.length; i++)
        {
          if (this.student_courses[i].studentID == this.id){
            StudentCourseServices.getStudentCourse(this.student_courses[i].studentCourseID)
              .then(response => {
                this.scTemp = response.data;
                this.courses.push(this.scTemp);
              })
              .catch(error => {
                console.log("There was an error:", error.response)
              });
          }
        }
        this.student_courses = this.courses;
      })
      .catch(error => {
        console.log("There was an error:", error.response)
      });
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    toEdit() {
      this.$router.push({ name: "studentEdit", params: { id: this.student.studentID } });
    },
  },
};
</script>