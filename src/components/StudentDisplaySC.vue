<template>
    <div>
        <option :value="student.studentID"  :aria-placeholder="student.studentName"> {{student.fName}} {{student.lName}}</option>
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
        }
    }
</script>