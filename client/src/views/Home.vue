<template>
  <div>
    <the-header></the-header>
    <all-post></all-post>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import AllPost from '../components/AllPost.vue';

export default {
  name:'Home',
  components: {
    TheHeader,
    AllPost
  },
};
</script>
<style scoped>

</style>