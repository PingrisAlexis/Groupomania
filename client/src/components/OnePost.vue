<template>
<div class="one-post-contenair">
  <article v-for = "post in posts" :key="post.id">
      <h2>{{post.title}}</h2>
      <hr>
       <span>Posted by: {{userId.lastname}} {{post.Lastname}} at{{post.createdAt}}</span>
      <hr>
      <img src="" alt="" class="one-post-image">
      <hr>
      <span class="one-post-message">{{post.message}}</span>
      <hr>
  </article>
</div>  
</template>

<script>



export default {
  data(){
    return {
      // title:"",
      // message:"",
      // createdAt:"",
      // image: null,
      posts: [],
    }
  },

methods: {
  getAllPost(){
  this.$http.get('http://localhost:3000/api/posts',
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.$token}`
      }
    }
  )
  .then(res => {
    this.posts = res.data;
    console.log(this.posts)
  })
        
}
},
  mounted() {
    if(localStorage.user != undefined){
      this.getAllPost();
    }
  }
}

</script>
<style scoped>
hr {
  width: 8rem;
}
.one-post-contenair {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
}

article {
  margin-top: 2rem;
  width: 30rem;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  text-align: center;
   border: 0.2rem solid #fd2d01;
    font-size: 1rem;
    border-top: none;
    border-bottom: none;
    border-right: none;
}
h2 {
  font-size: 1.6rem;
  font-weight: bold;
}

.one-post-image {
  border: solid 0.1rem black;
  width: 8rem;
}

.one-post-message {
  font-size: 1.4rem;
}
</style>