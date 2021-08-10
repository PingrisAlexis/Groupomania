<template>
<div class="one-post-contenair">
  <article v-for = "post in posts" :key="post.id">
    <div class="one-post-info-contenair">
      <img :src="post.avatar" alt="Profil image" class="one-post-info-image">
      <div class="one-post-info-user">
        <span>{{post.lastname}} {{post.firstname}}</span>
        <span class="one-post-info-date">The {{dateFormat(post.createdAt)}}</span>
      </div>
    </div>
    <section>
    <img :src="post.media" alt="Post image" class="one-post-image">
    <h2>{{post.title}}</h2>
    </section>
  </article>
</div>

</template>

<script>
export default {
  data(){
    return {
      posts: [],
    }
  },
  mounted() {
    this.getAllPost();
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
        console.log(this.posts);
      })
      .catch(err => {this.errors.push(err.response.data.error)});
    },
    dateFormat(date){
      const postCreatedAt = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return postCreatedAt.toLocaleDateString('en-GB', options);
    },
  },
}

</script>
<style scoped>
.one-post-contenair {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  flex-flow: row wrap;
}

article {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  margin: 1rem;
  width: 35rem;
}
section {
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
  text-align: center;
  box-shadow: 0 0.5rem 0.5rem #d8d8d8;
  border-radius: 3rem;
  cursor: pointer;
}


article:hover h2 {
  transform: scale(1.5);
  transition: 0.6s;
}

h2 {
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
  padding-top: 1rem
}

.one-post-info-contenair {
  text-align: left;
  display: flex;
  box-shadow: 0.5rem 0.5rem 0.5rem #d8d8d8;
  border-radius: 3rem;
  background: #f1f2f6;
  width: 26rem;
}
.one-post-image {
  height: 15rem;
  width: 100%;
  border-top-right-radius: 3rem;
  border-top-left-radius: 3rem;
  object-fit: cover;
}
.one-post-info-user {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-left: 0.5rem;
}
.one-post-info-image {
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
  object-fit: cover;
  
}

</style>