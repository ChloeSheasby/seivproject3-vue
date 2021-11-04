<template>
  <div>
    <h2 class="heading">Login Success!</h2>
      <div>
          <div v-if="this.$store.state.loginUser !== null" class="center">
            <h4>Welcome {{this.$store.state.loginUser.fName}}!</h4>
            <p v-if="this.$store.state.loginUser.role === 'admin'">You are an admin.</p>
            <p v-else-if="this.$store.state.loginUser.role === 'advisor'">You are an advisor.</p>
            <p v-else-if="this.$store.state.loginUser.role === 'student'">You are a student.</p>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  }
}
</script>
