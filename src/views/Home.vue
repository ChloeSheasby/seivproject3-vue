<template>
  <div>
    <HomeMenu />
    <h2 class="heading">Login Success!</h2>
      <div>
        <!-- <div v-if="this.$store.state.user.loginType == 'google'"> -->
          <div class="center">
            <p>Welcome {{this.$store.state.loginUser.fName}} !</p>
            <p>Email Address: {{this.$store.state.loginUser.email}} !</p>
          </div>
        <!-- </div> -->
      </div>
    </div>
</template>

<script>
import HomeMenu from '@/components/Menu'
export default {
  name: 'home',
  components: {
    HomeMenu
  }
}
</script>
