<template>
  <div class="the-header-contenair">
      <img src="../assets/groupomania-logo-align.png" alt="Logo Groupomania">
      <nav>
        <router-link  tag="a" to="/Home" active-class="active">Home</router-link>
          |
        <router-link  tag="a" to="/MyAccount" active-class="active">Account</router-link>
          |
        <button @click="onDisconnect()">Log Off</button>
      </nav>
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
  /* height: 6rem; */
  box-shadow: 0 0.2rem 0.2rem #d8d8d8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.the-header-contenair img {
  height: 3rem;
}
.the-header-contenair nav {
  padding-right: 1rem;
  font-size: 1.6rem;
  list-style-type: none;
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
  margin-top: 2rem;
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