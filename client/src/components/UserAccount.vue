<template>
  <div class="user-account-contenair" >
    <div class="user-account-img-contenair">
    <div id="preview">
      <img v-if="user.avatar" :src="this.user.avatar">
      <img v-else-if="url" :src="url" />
      <img v-else src="../assets/random-user.png">
    </div>
      <input class="btn-upload" @change="upload()" type="file" ref="image" name="image"  id="File" accept=".jpg, .jpeg, .gif, .png">
    
    </div>
    <div class="user-data">
      <span >{{this.$user.lastname}} {{this.$user.firstname}}</span>
      <span>Account N° {{this.$user.userId}}</span>
      <span>Creation: The {{this.$user.createdAt}}</span>
      <span> {{this.$user.mail}}</span>
    </div>
    <ul v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <li class="error-message" v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    <div>
    <button class="user-account-modify-user" @click="trySubmit()">Save new profil pick</button>
    <button class="user-account-delete-user" @click="deleteUser()">Delete account</button>
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
    
  }
  },
  mounted (){
    this.getOneUser();
  },
  methods: {
    trySubmit() {
      if (this.AddProfilImageIsValid() ) { 
        const formData = new FormData();
        formData.append("image", this.image, this.image.name);
        this.$http.put(`http://localhost:3000/api/auth/${this.$user.userId}`, formData,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$token}`
          }
        })
        .then(res => {
          if(res.status === 200) {
            this.image = null;
            document.location.reload();
            
          }
        })
        .catch(err => {this.errors.push(err.response.data.error)});
        }
      },
    AddProfilImageIsValid() {
      this.errors = [];
      if (!this.image) {
        this.errors.push('Image is not upload.');
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
      .then(localStorage.removeItem('user'))
      .then(location.href = "/Login")
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
        this.user = res.data.[0];
        console.log(this.user.media);
      })
      .catch(err => {this.errors.push(err.response.data.error)});
    }
  
  }
}
</script>

<style scoped>
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
  border-radius: 3rem;
  max-width: 25rem;
  box-shadow: 0 0.5rem 0.5rem #d8d8d8;
  flex-flow: row wrap;
  flex-direction: column;
  margin-top: 3rem;
}
.user-account-img-contenair {
  background: #f1f2f6;
  width: 100%;
  border-radius: 3rem 3rem 0rem 0rem;
}
#preview img {
 border-radius: 50%;
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

.user-account-contenair-avatar {
  border: 0.1rem solid black;
  width: 100px;
  height: 100px;
  border-radius: 75px;
}



.user-data {
 display: flex;
 flex-direction: column; 
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
</style>