<template>
  <div class="main-container">
    <h2 class="heading">Sign In</h2>
    <SocialLogin />
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