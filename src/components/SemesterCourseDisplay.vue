<template>
    <div>
        <table width='100%'>
        <tr width='100%'>
            <td width='40%'>
            <router-link :to="{ name: 'semesterView', params: { id: semester.semesterID } }"  class='edit-btn'>
                {{ semester.semesterName }}
                <div id="myId" ref="myId">{{  }}</div>
            </router-link>
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
    export default {
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