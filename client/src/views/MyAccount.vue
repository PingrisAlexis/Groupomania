<template>
  <div>
    <the-header></the-header>
    <user-account></user-account>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import UserAccount from "../components/UserAccount.vue";

export default {
  name:'MyAccount',
  components: {
    TheHeader,
    UserAccount
  },
};
</script>
<style scoped>

</style>