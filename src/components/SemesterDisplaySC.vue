<template>
    <div>
        <option :value="semester.semesterID"  :aria-placeholder="semester.semesterName"> {{semester.semesterName}} </option>
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
        }
    }
</script>