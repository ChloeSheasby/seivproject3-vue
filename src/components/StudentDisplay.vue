<template>
    <div>
        <table width='100%'>
        <tr width='100%'>
            <td width='20%' >
                <div class='student-id'>
                    {{ student.studentID }}
                </div>
            </td>
            <td width='40%'>
            <router-link :to="{ name: 'studentView', params: { id: student.studentID } }"  class='edit-btn'>
                {{ student.fName }} {{ student.lName }}
                <div id="myId" ref="myId">{{  }}</div>
            </router-link>
            </td>
            <td width='10%' class='edit-and-delete'>
                <router-link :to="{ name: 'studentEdit', params: { id: student.studentID } }"  class='edit-btn'>
                    <span>edit</span>
                </router-link>
            </td>
            <td width='10%' class='edit-and-delete'>
                <a  class='delete-btn' href = "#" @click="deleteStudent(student.studentID, student.fName)">
                    <span>delete</span>
                </a>
            </td>
        </tr>
        </table>
    </div>
</template>
<style>
  @import '../assets/styles/course-list.css';
</style>

<script>
    export default {
        props: {
            student: Object
        },
        methods: {
            deleteStudent(id, fName) {
                this.$emit('delete-student', id, fName);
            }/*,
            onWindowLoad(courseDescription) {
                this.appendChild(courseDescription.slice(0, 50));
            },*/
        }
    }
</script>