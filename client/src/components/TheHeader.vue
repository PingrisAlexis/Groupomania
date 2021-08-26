<template>
  <div class="the-header-contenair">
      <div class="banner">
        <img src="../assets/groupomania-banner-logo.png" alt="Logo Groupomania">
        <nav>
          <router-link  tag="a" to="/Home" active-class="active"><i class="fas fa-home"></i></router-link>
          |
          <router-link  tag="a" to="/AddPost" active-class="active" v-on:click="show = !show"><i class="far fa-envelope-open"></i></router-link>
          |
          <router-link  tag="a" to="/MyAccount" active-class="active" v-on:click="show = !show"><i class="fas fa-cogs"></i></router-link>
          |
          <i class="fas fa-power-off" @click="onDisconnect()"></i>
        </nav>
      </div> 
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
  cursor: pointer;
  color: #ffffff;
}

.fa-power-off:hover {
  transform: scale(1.2);
  transition: 0.6s;
  color: red;
}
.fa-home,
.fa-envelope-open,
.fa-cogs {
  font-size: 2rem;
}
	
@media screen and (max-width: 480px) {
  .banner img {
  height: 6.8rem;
  width: 100vw;
  object-fit: cover;
}
} 
</style>