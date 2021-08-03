<template class="template">
  <div class="login-contenair">
    <img src="../assets/groupomania-logo-center.png" alt="Logo Groupomania">
    <nav>
      <router-link to="/Login" class="router-link-active">Log in</router-link> 
      |
      <router-link to="/Signup" class="router-link-inactive">Sign up</router-link>
    </nav>
    
   <form @submit="trySubmit" class="login-form" >
        <label for="login-email">E-mail:</label>
        <input v-model="form.email"  type="email" id="login-email"/>

        <label for="login-password">Password:</label>
        <input v-model="form.password" type="password" id="login-password"/>
        
         <ul v-if="errors.length">
            <b>Please correct the following error(s):</b>
          <li class="error-message" v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        <button id="login-btn type" type="submit">Submit</button>
    </form>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email:'',
        password:''
      },
      errors: []
    }
  },
  methods: {
   trySubmit(e) {
      e.preventDefault();
    if (this.loginIsValid()) {
       this.$http.post('http://localhost:3000/api/auth/login', this.form )
    .then(res => {
        if(res.status === 200) {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.$router.push('/Home');
          location.reload();
      }
    })
    .catch( err => {this.errors.push( err.response.data.error)});
    }
  },
    loginIsValid() {
      this.errors = [];
      if (!this.form.email) {
        this.errors.push('Email is required');
      } 
      if (!this.form.password) {
        this.errors.push('Password is required');
      }
    return this.errors.length ? false : true;
    }
  }
};
</script>

<style scoped>
.template {
    height: 100%;
  max-width: 100%;

}

.login-contenair {
  height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-contenair img {
  width:25rem;
}

.login-contenair nav {
  margin-bottom: 1rem;
}

.login-form {
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  
}

.login-form input{
  width:20rem;
  height: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.login-form button {
  cursor: pointer;
  width: 15rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  margin-top: 2rem;
  background-color: #ffffff;
  color: #fd2d01;
  font-weight: bold;
}
.login-form button:hover {
  transform: scale(1.03);
  transition: 0.6s;
}
nav {
  cursor: pointer;
  font-size: 1.6rem;
}

.router-link-active,
.error-message  {
  color: #fd2d01;
  font-weight: bold;
  text-decoration: none;
}

.router-link-inactive {
  text-decoration: none;
  color:#333;
  font-weight: bold;
  
}
</style>
