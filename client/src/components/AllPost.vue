<template>
<div class="one-post-contenair">
  
  <div class="one-post-card" v-for = "post in posts" :key = "post.id">
    <div class="one-post-info-contenair"  v-for = "user in users" :key = "user.id">
      <div class="one-post-info-user" v-if="user.id == post.userId">
        <img v-if="user.avatar" :src="user.avatar" alt="User's post profil pick" :key="user.avatar" class="one-post-info-image">
        <img v-else src="../assets/random-user.png" :key="user.avatar" alt="Default user's profil pick" class="one-post-info-image">
        <div class="one-post-user-name">
          <div>
            <span id="user-lastname">{{user.lastname}} </span> 
            <span id="user-firstname">{{user.firstname}}</span>
          </div>
          <span class="one-post-info-date">The {{dateFormat(post.createdAt)}}</span>
        </div>
      </div>
    </div>
    
    <div class="one-post-main">
      <router-link :to="{ name: 'Post', params: { id : post.id } }">
        <img :src="post.media" alt="Post image" class="one-post-image">
        <h2>{{post.title}}</h2>
      </router-link>
    </div>
  </div>
  
</div>
</template>

<script>
export default {
  data(){
    return {
      storageUser: '',
      storageToken: '',
      posts: [],
      users:[],
    }
  },
  created() {
    this.connect();
    this.getAllUsers();   
    
  },
  methods: {
    connect(){
        this.storageToken = JSON.parse(localStorage.user).token;
        this.storageUser = JSON.parse(localStorage.user);
    },
    getAllPosts(){
      this.$http.get('http://localhost:3000/api/posts',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageToken}`
          }
        }
      )
      .then(res => {
        this.posts = res.data;
      })
    },
    getAllUsers(){
       this.$http.get('http://localhost:3000/api/auth/',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageToken}`
          }
        }
      )
      .then(res => {
        this.users = res.data;
        this.getAllPosts();
        
      })
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
.one-post-card,
.one-post-contenair,
.one-post-info-contenair,
.one-post-info-user,
.one-post-user-name {
  display: flex;
}

.one-post-main,
.one-post-info-contenair {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}

.one-post-contenair,
main,
.one-post-user-name
 {
  justify-content: center;
}

.one-post-contenair {
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  flex-flow: row wrap;
}

.one-post-card {
  flex-direction: column;
  font-size: 1rem;
  width: 25rem;
}

.one-post-main {
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-radius: 1rem;
  cursor: pointer;
  text-align: center;
  word-wrap: break-word;
}

h2 {
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
  padding-top: 1rem;
}

.one-post-info-contenair {
  text-align: left;
  border-radius: 1rem;
  background: #f1f2f6;
  max-width: 20rem;
  text-overflow: ellipsis;
  overflow: hidden; 
}

.one-post-image {
  height: 15rem;
  width: 100%;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  object-fit: cover;
}

.one-post-user-name {
  flex-direction: column;
  margin-left: 1rem;
}

#user-lastname {
  text-transform: uppercase;
}

#user-firstname {
  text-transform: capitalize;
}

.one-post-info-image {
  border-radius: 1rem;
  height: 5rem;
  width: 5rem;
  object-fit: cover;  
}

a {
  text-decoration: none;
}
</style>