<template>
  <div>
    <the-header></the-header>
    <one-post></one-post>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import OnePost from '../components/OnePost.vue';

export default {
  name:'Home',
  components: {
    TheHeader,
    OnePost
  },
};
</script>
<style scoped>

</style>