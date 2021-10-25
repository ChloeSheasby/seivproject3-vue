<template>
    <div>
        <table width='100%'>
        <tr width='100%'>
            <td width='20%' >
                <div class='semester-num'>
                    {{ semester.semesterID }}
                </div>
            </td>
            <td width='40%'>
            <router-link :to="{ name: 'semesterView', params: { id: semester.semesterID } }"  class='edit-btn'>
                {{ semester.semesterName }}
                <div id="myId" ref="myId">{{  }}</div>
            </router-link>
            </td>
            <td width='10%' class='edit-and-delete'>
                <router-link :to="{ name: 'semesterEdit', params: { id: semester.semesterID } }"  class='edit-btn'>
                    <span>edit</span>
                </router-link>
            </td>
            <td width='10%' class='edit-and-delete'>
                <a  class='delete-btn' href = "#" @click="deleteSemester(semester.semesterID, semester.semesterName)">
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
            semester: Object
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