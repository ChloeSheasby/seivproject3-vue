<template>
  <div class="main-container">
    <form>
      <div class="box-container">
        <h2 class="heading">Sign In</h2>
        <SocialLogin />
      </div>
    </form>
    <div class="footer">
       <p>Don't have an account? <a href="/signup"> Create one now</a></p>
    </div>
  </div>
</template>

<script>
import SocialLogin from '@/components/SocialLogin'
export default {
  name: 'login',
  components: {
    SocialLogin
  }
}
</script>