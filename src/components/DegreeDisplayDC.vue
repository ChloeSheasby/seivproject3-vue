<template>
    <div>
        <option :value="degree.degreeID"> {{degree.degreeName}} </option>
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
        }
    }
</script>