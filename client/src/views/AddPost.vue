<template>
  <div>
    <the-header></the-header>
    <post-form></post-form>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import PostForm from "@/components/PostForm.vue";


export default {
  components: {
    TheHeader,
    PostForm
  },
};
</script>