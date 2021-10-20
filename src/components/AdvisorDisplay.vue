<template>
    <div>
        <table width='100%'>
        <tr width='100%'>
            <td width='20%' >
                <div class='advisor-id'>
                    {{ advisor.advisorID }}
                </div>
            </td>
            <td width='40%'>
            <router-link :to="{ name: 'advisorView', params: { id: advisor.advisorID } }"  class='edit-btn'>
                {{ advisor.fName }}  {{ advisor.lName }}
                <div id="myId" ref="myId">{{ message }}</div>
            </router-link>
            </td>
            <td width='10%' class='edit-and-delete'>
                <router-link :to="{ name: 'advisorEdit', params: { id: advisor.advisorID } }"  class='edit-btn'>
                    <span>edit</span>
                </router-link>
            </td>
            <td width='10%' class='edit-and-delete'>
                <a  class='delete-btn' href = "#" @click="deleteAdvisor(advisor.advisorID, advisor.fName)">
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
            advisor: Object
        },
        methods: {
            deleteAdvisor(id, fName) {
                this.$emit('delete-advisor', id, fName);
            }/*,
            onWindowLoad(courseDescription) {
                this.appendChild(courseDescription.slice(0, 50));
            },*/
        }
    }
</script>