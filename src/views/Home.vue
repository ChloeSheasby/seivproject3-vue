<template>
  <div>
    <h2 class="heading">Login Success!</h2>
      <div>
        <!-- <div v-if="this.$store.state.user.loginType == 'google'"> -->
          <div v-if="this.$store.state.loginUser !== null" class="center">
            <p>Welcome {{this.$store.state.loginUser.fName}} !</p>
            <p>Email Address: {{this.$store.state.loginUser.email}} !</p>
          </div>
        <!-- </div> -->
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
