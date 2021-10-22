<template>
    <div>
        <table width='100%'>
        <tr width='100%'>
            <td width='20%' >
                <div class='degree-id'>
                    {{ degree.degreeID }}
                </div>
            </td>
            <td width='40%'>
            <router-link :to="{ name: 'degreeView', params: { id: degree.degreeID } }"  class='edit-btn'>
                {{ degree.degreeName }}
                <div id="myId" ref="myId">{{  }}</div>
            </router-link>
            </td>
            <td width='10%' class='edit-and-delete'>
                <router-link :to="{ name: 'degreeEdit', params: { id: degree.degreeID } }"  class='edit-btn'>
                    <span>edit</span>
                </router-link>
            </td>
            <td width='10%' class='edit-and-delete'>
                <a  class='delete-btn' href = "#" @click="deleteDegree(degree.degreeID, degree.degreeName)">
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
            degree: Object
        },
        methods: {
            deleteDegree(id, degreeName) {
                this.$emit('delete-degree', id, degreeName);
            }/*,
            onWindowLoad(courseDescription) {
                this.appendChild(courseDescription.slice(0, 50));
            },*/
        }
    }
</script>