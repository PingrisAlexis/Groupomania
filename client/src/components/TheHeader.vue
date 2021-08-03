<template>
  <div class="the-header-contenair">
      <div class="banner">
        <img src="../assets/groupomania-logo-align.png" alt="Logo Groupomania">
        <nav>
          <router-link  tag="a" to="/Home" active-class="active">Home</router-link>
          |
          <router-link  tag="a" to="/AddPost" active-class="active">Add a post</router-link>
          |
          <router-link  tag="a" to="/MyAccount" active-class="active">Account</router-link>
        </nav>
      </div> 
      <button class="left" @click="onDisconnect()">Log Off</button>
  </div>
</template>

<script>
export default {
  methods: {
     onDisconnect() {
        localStorage.removeItem('user');
        window.location="/Login";
    },
  }
};
</script>

<style scoped>
template {
  width: 100vw;
}

.the-header-contenair {
  width: 100%;
  display: flex;
  border: 0.1rem solid black;
  border-top: none;
  border-left: none;
  border-right: none;
}

.banner img {
  height: 3rem;
}

.banner nav {
  font-size: 1.6rem;
  list-style-type: none;
  margin-left: 1rem;

}

.banner {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 5rem;
}

a {
  text-decoration: none;
  color:#333;
  font-weight: bold;
}

.active {
  color: #fd2d01;
}

button {
  margin-right:auto;
  margin-top: 0.7rem;
  margin-right: 0.7rem;
  cursor: pointer;
  width: 5.3rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  background-color: #ffffff;
  color: #fd2d01;
  font-weight: bold;
}

button:hover {
  transform: scale(1.03);
  transition: 0.6s;
  color: #ffffff;
  background-color: #fd2d01;
}
</style>