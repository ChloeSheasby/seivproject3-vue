<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Add Course</v-toolbar-title>
      </v-toolbar>
      <br>
    <v-form
      ref="form" 
      v-model="valid"
      lazy validation
    >
      <v-text-field
        v-model="course.courseNum"
        id="courseNum"
        label="Course Number"
        hint="CMSC-0001"
        persistent-hint
        required
      ></v-text-field>

      <v-text-field
        v-model="course.courseName"
        id="courseName"
        label="Course Name"
        hint="Programming I"
        persistent-hint
        required
      ></v-text-field>

      <v-text-field
        v-model="course.dept"
        id="dept"
        :counter="4"
        label="Department"
        hint="CMSC"
        persistent-hint
        required
      ></v-text-field>

      <v-text-field
        v-model="course.level"
        id="level"
        :counter="4"
        hint="1000"
        persistent-hint
        label="Level"
        required
      ></v-text-field>

      <v-text-field
        v-model="course.hours"
        id="id"
        :counter="1"
        hint="3"
        persistent-hint
        label="Hours"
        required
      ></v-text-field>
      <v-simple-table>
        <tr>
          <td>
            <v-checkbox
              v-model="semesterBools.spring"
              id="spring"
              label="Spring"
            ></v-checkbox>
          </td>

          <td>
            <v-checkbox
              v-model="semesterBools.summer"
              id="summer"
              label="Summer"
            ></v-checkbox>
          </td>

          <td>
            <v-checkbox
              v-model="semesterBools.fall"
              id="fall"
              label="Fall"
            ></v-checkbox>
          </td>

          <td>
            <v-checkbox
              v-model="semesterBools.winter"
              id="winter"
              label="Winter"
            ></v-checkbox>
          </td>
        </tr>
      </v-simple-table>

      <v-textarea
        v-model="course.description"
        name="description"
        label="Description"
      ></v-textarea>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="addCourse"
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
import CourseServices from "@/services/courseServices.js";
export default {
  data() {
    return {
      course: {},
      semesterBools: {},
    };
  },
  methods: {
    addCourse() {
      this.updateSemesterType()
      CourseServices.addCourse(this.course)
        .then(() => {
          this.$router.push({ name: "courseList" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateSemesterType() {
      var string = "";
      if(this.semesterBools.spring) {
        string += "Sp"
      }
      if(this.semesterBools.summer) {
        if (string.length > 0) {
          string += ","
        }
        string += "Su"
      }
      if(this.semesterBools.fall) {
        if (string.length > 0) {
          string += ","
        }
        string += "F"
      }
      if(this.semesterBools.winter) {
        if (string.length > 0) {
          string += ","
        }
        string += "W"
      }
      this.course.semesterTypes = string;
    },
    cancel() {
      this.$router.push({ name: "courseList" });
    },
  },
};
</script>