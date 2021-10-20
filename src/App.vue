<!--<template src="./templates/course-list.html"></template>-->
<template>
  <div>
    <!--<UserDisplay></UserDisplay>-->
    <div class="navbar">
      <router-link to="/advisorList">Advisor List</router-link>|
      <router-link to="/advisorAdd">Advisor Add</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
@import "./assets/styles/basic.css";
</style>

<script>
</script>