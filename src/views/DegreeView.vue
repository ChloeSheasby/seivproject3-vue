<template>
  <div style="">
    <h3 class="name-tag">Viewing Degree {{ this.degree.degreeName }} </h3>
    <div style="margin-left: 32%; text-align: left">
      <div style='padding-left: 1%;'>
        <button name="back" v-on:click.prevent="cancel()">Back</button>
        <span>&nbsp; </span>
        <button name="edit" v-on:click.prevent="toEdit()">Edit</button>
        <span>&nbsp; </span>
        <button
          name="delete"
          v-on:click.prevent="deleteDegree(degree.degreeID, degree.degreeName)">
          Delete
        </button>
        <span>&nbsp; </span>
        <button
          name="add" 
          v-on:click.prevent="toAdd()">Add Class</button>
      </div>
      <br />
      <div class="text-input">Department: {{ this.degree.dept }}</div>
      <div class="text-input">Total Hours: {{ this.degree.totalHours }}</div>
      </div>
    
      <br>
      <h3 class='name-tag'>Courses</h3>    
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
          <CourseDisplayDegree
            v-for="degree_courses in degree_courses"
            :key="degree_courses.degreeCourseID"
            :degree_courses="degree_courses"
          />  
          </div>
</template>

<style>
@import "../assets/styles/basic.css";
</style>

<script>
import DegreeServices from "@/services/degreeServices.js";
import DegreeCourseServices from "@/services/degreeCourseServices.js";
import CourseDisplayDegree from '@/components/CourseDisplayDegree.vue'

export default {
  props: ["id"],
  name: 'App',
  components: {
    CourseDisplayDegree
  },
  data() {
    return {
      degree_courses: [],
      courses: [],
      degree: {},
      dcTemp: {},
    };
  },
  created() {
    DegreeServices.getDegree(this.id)
      .then((response) => {
        this.degree = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
    DegreeCourseServices.getAllDegreeCourses()
      .then(response => {
        this.degree_courses = response.data;
        for (let i = 0; i < this.degree_courses.length; i++)
        {
          if (this.degree_courses[i].degreeID == this.id){
            DegreeCourseServices.getDegreeCourse(this.degree_courses[i].degreeCourseID)
              .then(response => {
                this.dcTemp = response.data;
                this.courses.push(this.dcTemp);
              })
              .catch(error => {
                console.log("There was an error:", error.response)
              });
          }
        }
        this.degree_courses = this.courses;
      })
      .catch(error => {
        console.log("There was an error:", error.response)
      });
  },
  methods: {
    deleteDegree(id, degreeName) {
      let confirmed = confirm(`Are you sure you want to delete ${degreeName}`);
      if (confirmed) {
        DegreeServices.deleteDegree(id)
          .then(() => {
            this.$router.push({ name: "degreeList" });
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    toEdit() {
      this.$router.push({ name: "degreeEdit", params: { id: this.degree.degreeID } });
    },
    toAdd() {
      this.$router.push({ name: "degreeCourseAddFromDegree", params: { id: this.degree.degreeID } });
    },
  },
};
</script>