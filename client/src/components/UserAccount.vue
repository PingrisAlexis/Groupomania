<template>
  <div class="user-account-contenair" >
    
    <div class="user-account-img-contenair">
      <div id="preview">
        <img v-if="this.url" :src="this.url" alt="Preview user's profil pick">
        <img v-else-if="this.user.avatar" :src="this.user.avatar" alt="User's profil pick">
        <img v-else src="../assets/random-user.png" alt="User's account random pick">
      </div>
      <input aria-label="Click here to choose your profil image" class="btn-upload" @change="upload()" type="file" ref="image" name="image"  id="preview-file" accept=".jpg, .jpeg, .gif, .png">
    </div>
    
    <div>
      <button class="user-account-modify-user" @click="trySubmit()">Save new profil pick</button>
      <button v-if="this.user.admin == 0" class="user-account-delete-user" @click="deleteUser(user.id)">Delete account</button>
    </div>
    
    <div class="user-data">
      <div class="user-data-name">
        <span class="user-lastname">{{this.user.lastname}} </span>
        <span class="user-firstname"> {{this.user.firstname}}</span>
      </div>
      <span>Account N° {{this.user.id}}</span>
    </div>
    
    <ul v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <li class="error-message" v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
    
      <span class="lists" v-if="storageUser.admin == 1">POSTS LIST</span>
      <div v-for= "post in posts" :key="post.id">
        <div  v-if="post.userId == user.id || storageUser.admin == 1">
          <router-link class="user-post" :to="{ name: 'Post', params: { id: post.id } }">
            <p>The {{post.createdAt}}</p>
            <p class="user-post-title">{{post.title}}</p>
            </router-link>
            <hr>
        </div>
      </div>
      
      <span v-if="storageUser.admin == 1" class="lists">USERS LIST</span>
      <div v-for= "user in users" :key="user.id">
        <div class="user-list" v-if="storageUser.admin == 1 && storageUser.userId != user.id">
          <button class="user-account-delete-user-by-admin" @click="deleteUserByAdmin(user.id)"><i class="fas fa-trash-alt"></i></button>
          <span>N°{{user.id}} </span>
          <span class="user-lastname">{{user.lastname}} </span>
          <span class="user-firstname">{{user.firstname}}</span>
          <hr>
        </div>
      </div>
      
  </div>
</template>

<script> 
 
export default {
  data() {
  return {
    storageUser: '',
    storageToken: '',
    url: null,
    image: null,
    errors: [],
    user: [],
    users: [],
    posts:[]
  }
  },
  mounted (){
    this.connect();
    this.getOneUser();
    this.getAllPosts();
    this.getAllUsers();
  },
  methods: {
    connect(){
      this.storageToken = JSON.parse(localStorage.user).token;
      this.storageUser = JSON.parse(localStorage.user);
    },
    trySubmit() {
      if (this.AddProfilImageIsValid() ) {
        this.storageUser.avatar = this.image;
        const formData = new FormData();
        formData.append("image", this.image, this.image.name);
        
        this.$http.put(`http://localhost:3000/api/auth/${this.storageUser.userId}`, formData,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageToken}`
          }
        })
        .then(
          document.location.reload()
        )
      }
    },
    AddProfilImageIsValid() {
      this.errors = [];
      
      if (!this.image) {
        this.errors.push('There is no image to upload.');
      }
      return this.errors.length ? false : true;
    }, 
    deleteUser(userId){
      this.$http.delete(`http://localhost:3000/api/auth/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageToken}`
          }
        }
      )
      .then( () => {
        localStorage.clear();
        window.location="/Login";
      })
    },
    deleteUserByAdmin(userId){
      this.$http.delete(`http://localhost:3000/api/auth/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageToken}`
          }
        }
      )
      .then(
        document.location.reload()
      )
    },
    upload() {
      this.image = this.$refs.image.files[0];
      this.url = URL.createObjectURL(this.image);
    },
    getOneUser() {
      this.$http.get(`http://localhost:3000/api/auth/${this.storageUser.userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageToken}`
          }
        }
      )
      .then(res => {
        this.user = res.data;
      })
    },
    getAllUsers() {
      this.$http.get(`http://localhost:3000/api/auth`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageToken}`
          }
        }
      )
      .then(res => {
        this.users = res.data;
      })
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
  }
}
</script>

<style scoped>
template,
.user-account-contenair,
.user-data {
  display: flex;
}

h2 {
  font-size: 1rem;
}

template {
  justify-content: center;
  align-items: center;
}

hr {
  width: 5rem;
}

.user-account-contenair {
  margin: auto;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  max-width: 25rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  flex-flow: row wrap;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.user-account-img-contenair {
  background: #f1f2f6;
  width: 100%;
  border-radius: 1rem 1rem 0rem 0rem;
}

#preview img {
 border-radius: 1rem;
  height: 10rem;
  width: 10rem;
  object-fit: cover;
  position: relative;
  bottom:2rem;
  left: 7rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}

span, label {
  font-size: 1.2rem;
  margin-top:1rem; 
}

.user-lastname {
  text-transform: uppercase;
}

.user-firstname {
  text-transform: capitalize;
}

.user-account-modify-user,
.user-account-delete-user {
  margin-top: 2rem;
  cursor: pointer;
  width: 8rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  margin: 1rem;
  font-weight: bold;
}
.user-post-title {
  text-transform: uppercase;
  font-weight: bold;
}
.user-account-modify-user {
  background-color: #ffffff;
  color: green;
}

.user-account-delete-user {
   background-color: #ffffff;
  color: #fd2d01;
}

.user-account-delete-user:hover {
  transform: scale(1.03);
  transition: 0.6s;
  color: #ffffff;
  background-color: #fd2d01;
}

.user-account-modify-user:hover {
  transform: scale(1.03);
  transition: 0.6s;
  color: #ffffff;
  background-color:green;
}

.user-data {
 flex-direction: column;
 margin-top:1rem;
 width: 20rem;
 word-wrap: break-word;
 white-space: wrap;
}

.error-message {
  color: #fd2d01;
  font-weight: bold;
  text-decoration: none;
}

.validate-message {
  color: green;
  font-weight: bold;
  text-align: center;
  font-size: 1rem;
}

ul {
  text-align: center;
  list-style:none;
  margin-right: 2.9rem;
  font-size: 1rem;
}

p {
  font-size: 1rem;
}

.lists {
  font-size: 1.4rem;
  font-weight: bold;
}

.lists,
.user-post,
.user-list
 {
  text-align: center;
}

.user-account-delete-user-by-admin {
   margin-top: 2rem;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  margin: 1rem;
  font-weight: bold;
  color: red;
  background: #ffffff;
}
</style>