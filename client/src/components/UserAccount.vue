<template>
  <div class="user-account-contenair">
    <!-- <div class="user-account-contenair-avatar">
        <img alt="image" :src="$user.avatar" />
    </div> -->
    <h1>Account N° {{this.$user.userId}}</h1>
    <hr>
    <div>
      <h3>Firstname: </h3>
      <h4 class="user-data">{{this.$user.firstname}}</h4>
    </div>
    <hr>
    <div>
      <h3>Lastname: </h3>
      <h4 class="user-data">{{this.$user.lastname}}</h4>
    </div>
    <hr>
    <div>
      <h3>Account created: </h3>
      <h4 class="user-data"> {{this.$user.createdAt	}}</h4>
    </div>
    <hr>
    <!-- <label for="avatar">Modify avatar:</label>
    <input type="text" name="avatar" id="avatar" placeholder="URL to image"> -->
    <button class="user-account-delete-user" @click="deleteUser()">Delete Account</button>
  </div>
</template>

<script> 
 
export default {
  methods: {
    deleteUser(){
      console.log(this.$user.userId)
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
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10rem;
    border: 0.2rem solid #fd2d01;
    width: 20rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-top: none;
    border-bottom: none;
    border-right: none;
}

span, label {
    font-size: 1.6rem;
}

.user-account-delete-user {
    margin-top: 2rem;
    cursor: pointer;
    width: 15rem;
    height: 3.5rem;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    margin-top: 2rem;
    background-color: #ffffff;
    color: #fd2d01;
    font-weight: bold;
}

.user-account-delete-user:hover {
    transform: scale(1.03);
    transition: 0.6s;
    color: #ffffff;
    background-color: #fd2d01;
}

.user-account-contenair-avatar {
    border: 0.1rem solid black;
    width: 150px;
    height: 150px;
    border-radius: 75px;
}

.user-account-contenair-avatar img {
    width: 150px;
    height: 150px;
    border-radius: 75px; 
    object-fit: contain;
}
label {
    margin-top:1rem;
}
h1,
h3 {
  /* color: #fd2d01; */
  
  text-align: center;
  font-size: 1.4rem;
  margin: 0.5rem;
}
h4{
  font-weight: lighter;
  text-align: center;
  font-size: 1.3rem;
  margin: 0;
}
hr {
  width:7rem;
}
</style>