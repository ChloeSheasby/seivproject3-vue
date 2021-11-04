<template>
    <div>
        <table width='100%'>
        <tr width='100%'>
            <td width='40%'>
            {{ semester.semesterName }}
            <hr>
            <br>
            Courses:
            <StudentCourseDisplayBySemester v-for="student_courses in student_courses" :key="student_courses.studentCourseID" :student='this.student' :semester='this.semester.semesterID' :student_courses="student_courses" @delete-student_courses=deleteStudentCourse />
            </td>
        </tr>
        </table>
    </div>
</template>
<style>
  @import '../assets/styles/course-list.css';
</style>

<script>
import SemesterServices from "@/services/semesterServices.js";
import StudentCourseDisplayBySemester from '@/components/StudentCourseDisplayBySemester.vue';
    export default {
        components: {
          StudentCourseDisplayBySemester,
          //CourseDisplay
        },
        props: {
            semester: Object
        },
        created() {
            SemesterServices.getSemester(this.semester.SemesterID)
                .then((response) => {
                  this.semester = response.data;
                  console.log(response.data);
                })
                .catch((error) => {
                  console.log("There was an error:", error.response);
                });
            },
        methods: {
            deleteSemester(id, semesterName) {
                this.$emit('delete-semester', id, semesterName);
            },
            onWindowLoad(semesterDescription) {
                this.appendChild(semesterDescription.slice(0, 50));
            },
        }
    }
</script>