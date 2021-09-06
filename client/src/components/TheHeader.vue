<template>
  <div class="the-header-contenair">
      <div class="banner">
        <img src="../assets/groupomania-banner-logo.png" alt="Logo Groupomania">
        <nav>
          <router-link aria-label="To home page" tag="a" to="/Home" custom v-slot="{ navigate }"><i class="fas fa-home" @click="navigate"></i></router-link>
          |
          <router-link aria-label="To create post page" tag="a" to="/AddPost" custom v-slot="{ navigate }"><i class="far fa-envelope-open" @click="navigate"></i></router-link>
          |
          <router-link aria-label="To my account" tag="a" to="/MyAccount" custom v-slot="{ navigate }"><i class="fas fa-cogs" @click="navigate"></i></router-link>
          |
          <i aria-label="To disconnect" class="fas fa-power-off" @click="onDisconnect()"></i>
        </nav>
      </div> 
  </div>
</template>

<script>
export default {
  methods: {
    onDisconnect() {
      localStorage.clear();
      window.location="/Login";
    },
  }
};
</script>

<style scoped>
.the-header-contenair {
  width: 100%;
  display: flex;
  justify-content: center;
}

.banner img {
  height: 8.5rem;
  width: 100vw;
  object-fit: cover;
}

.banner nav {
  font-size: 1.6rem;
  list-style-type: none;
  position: relative;
  bottom: 2.1rem;
  color:#ffffff;
}

.banner {
  width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

a {
  text-decoration: none;
  color:#ffffff;
  font-weight: bold;
}

.fa-power-off {
  font-size: 2rem !important;
  color: #ffffff;
}
.fa-home:hover,
.fa-envelope-open:hover,
.fa-cogs:hover,
.fa-power-off:hover {
  transform: scale(1.2);
  transition: 0.6s;
  cursor: pointer;
  
}

.fa-home,
.fa-envelope-open,
.fa-cogs {
  font-size: 2rem;
}

.fa-power-off:hover {
  color: red;
  
}
	
	
@media screen and (max-width: 480px) {
  .banner img {
    height: 6.8rem;
    width: 100vw;
    object-fit: cover;
  } 
} 
</style>