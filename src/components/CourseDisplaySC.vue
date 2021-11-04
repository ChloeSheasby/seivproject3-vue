<template>
    <div>
        <option :value="course.courseID">{{ course.courseName }}</option>
    </div>
</template>
<style>
  @import '../assets/styles/course-list.css';
</style>

<script>
    export default {
        props: {
            course: Object
        },
        methods: {
        }
    }
</script>