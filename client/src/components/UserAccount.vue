<template>
  <div class="user-account-contenair" >
    <div class="user-account-img-contenair">
    <div id="preview">
      <img v-if="this.url" :src="this.url">
      <img v-else-if="this.user.avatar" :src="this.user.avatar" />
      <img v-else src="../assets/random-user.png">
    </div>
      <input class="btn-upload" @change="upload()" type="file" ref="image" name="image"  id="File" accept=".jpg, .jpeg, .gif, .png">
    </div>
    <div class="user-data">
      <div class="user-data-name">
        <span id="user-lastname" >{{this.$user.lastname}} </span>
        <span id="user-firstname"> {{this.$user.firstname}}</span>
      </div>
      <span>Account N° {{this.$user.userId}}</span>
    </div>
    <ul v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <li class="error-message" v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    <div>
    <button class="user-account-modify-user" @click="trySubmit()">Save new profil pick</button>
    <button class="user-account-delete-user" @click="deleteUser()">Delete account</button>
    </div>
    <h2> Your post(s):</h2>
     <div v-for= "post in posts" :key="post.id">
        <div  v-if="post.userId === user.id">
          <router-link class="user-post" :to="{ name: 'Post', params: { id: post.id } }">
            <p>The {{post.createdAt}}</p>
            <p class="user-post-title">{{post.title}}</p>
            </router-link>
            <hr>
        </div>
    </div>
  </div>
</template>

<script> 
 
export default {
  data() {
  return {
    url: null,
    image: null,
    errors: [],
    user: [],
    posts:[]
  }
  },
  mounted (){
    this.getOneUser();
    this.getAllPosts();
    
  },
  methods: {
    trySubmit() {
      if (this.AddProfilImageIsValid() ) {
        this.$user.avatar = this.image;
        const formData = new FormData();
        formData.append("image", this.image, this.image.name);
        this.$http.put(`http://localhost:3000/api/auth/${this.$user.userId}`, formData,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$token}`
          }
        })
        .then(
          document.location.reload()
        )
        .catch(err => {this.errors.push(err.response.data.error)});
        }
    },
    AddProfilImageIsValid() {
      this.errors = [];
      if (!this.image) {
        this.errors.push('There is no image to upload.');
      }
      return this.errors.length ? false : true;
    }, 
    deleteUser(){
      this.$http.delete(`http://localhost:3000/api/auth/${this.$user.userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$token}`
          }
        }
      )
      .then(
        localStorage.removeItem('user')
      )
      .then(
        window.location="/Login"
      )
    },
    upload() {
      this.image = this.$refs.image.files[0];
      this.url = URL.createObjectURL(this.image);
    },
    getOneUser() {
       this.$http.get(`http://localhost:3000/api/auth/${this.$user.userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$token}`
          }
        }
      )
      .then(res => {
        this.user = res.data;
      })
      .catch(err => {
        this.errors.push(err.response.data.error)
      });
    },
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
    
      })
      .catch(err => {this.errors.push(err.response.data.error)});
    },
  }
}
</script>

<style scoped>
h2 {
  font-size: 1rem;
}

template {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-account-contenair {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  max-width: 25rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  flex-flow: row wrap;
  flex-direction: column;
  margin-top: 3rem;
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
}

span, label {
  font-size: 1.2rem;
  margin-top:1rem; 
}

#user-lastname {
  text-transform: uppercase;
}

#user-firstnamer {
  text-transform: capitalize;
}

.user-account-modify-user,
.user-account-delete-user {
  margin-top: 2rem;
  cursor: pointer;
  width: 8rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  margin: 1rem;
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
 display: flex;
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

.user-post {
  text-align: center;
}

</style>