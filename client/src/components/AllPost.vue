<template>
<div class="one-post-contenair">
  <article  v-for = "post in posts" :key = "post.id">
    <header class="one-post-info-contenair"  v-for = "user in users" :key = "user.id">    
      <div class="one-post-info-user" v-if="user.id === post.userId">
        <img v-if="user.avatar" :src="user.avatar" alt="Profil image" :key="user.avatar" class="one-post-info-image">
        <img v-else src="../assets/random-user.png" :key="user.avatar" alt="Default profil image" class="one-post-info-image">
        <div class="one-post-user-name">
          <div>
            <span id="user-lastname">{{user.lastname}} </span> 
            <span id="user-firstname">{{user.firstname}}</span>
          </div>
          <span class="one-post-info-date">The {{dateFormat(post.createdAt)}}</span>
        </div>
      </div>
    </header>
    <footer>
      <router-link :to="{ name: 'Post', params: { id : post.id } }">
        <img :src="post.media" alt="Post image" class="one-post-image">
        <h2>{{post.title}}</h2>
      </router-link>
    </footer>
  </article>
</div>
</template>

<script>
export default {
  data(){
    return {
      posts: [],
      users:[],
    }
  },
  mounted() {
    this.getAllPosts();
    this.getAllUsers();
  },
  methods: {
    getAllPosts(){
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
    getAllUsers(){
       this.$http.get('http://localhost:3000/api/auth/',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$token}`
          }
        }
      )
      .then(res => {
        this.users = res.data;
        console.log(this.users)
      })
      .catch(err => {this.errors.push(err.response.data.error)});
    },
    dateFormat(date) {
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
  width: 35rem;
}

footer {
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
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

.one-post-info-user,
.one-post-user-name {
  display: flex;
}

.one-post-user-name {
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
}

#user-lastname {
  text-transform: uppercase;
}

#user-firstname {
  text-transform: capitalize;
}

.one-post-info-image {
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
  object-fit: cover;  
}
</style>