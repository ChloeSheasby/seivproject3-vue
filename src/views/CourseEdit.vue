<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>{{ this.course.courseName }}</v-toolbar-title>
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
        required
      ></v-text-field>

      <v-text-field
        v-model="course.courseName"
        id="courseName"
        label="Course Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="course.dept"
        id="dept"
        :counter="4"
        label="Department"
        required
      ></v-text-field>

      <v-text-field
        v-model="course.level"
        id="level"
        :counter="1"
        label="Level"
        required
      ></v-text-field>

      <v-text-field
        v-model="course.hours"
        id="id"
        :counter="1"
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
        @click="updateCourse"
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
  props: ["id"],

  data() {
    return {
      course: {},
      message: "Make updates to the Course",
      semesterBools: {},
    };
  },
  created() {
    CourseServices.getCourse(this.id)
      .then((response) => {
        this.course = response.data;
        console.log(response.data);
        this.getSemesterType();
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },

  methods: {
    updateCourse() {
      this.updateSemesterType()
      CourseServices.updateCourse(this.id, this.course)
        .then(() => {
          this.$router.go(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSemesterType() {
      if(this.course.semesterTypes != null) {
        var array = this.course.semesterTypes.split(",");
        array.forEach(element => {
        if(element == "Sp") {
          this.semesterBools.spring = true;
        }
        if(element == "Su") {
          this.semesterBools.summer = true;
        }
        if(element == "F") {
          this.semesterBools.fall = true;
        }
        if(element == "W") {
          this.semesterBools.winter = true;
        }
      });
      }
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
      this.$router.go(-1);
    },
  },
};
</script>