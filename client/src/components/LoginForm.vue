<template class="template">
  <div class="login-contenair">
   <form @submit.prevent="trySubmitLogin" class="login-form">
     
      <div class="login-form-img-contenair">
        <img src="../assets/groupomania-local.png" alt="Logo Groupomania">
      </div>
      
      <nav>
        <router-link to="/LoginForm" class="router-link-active">Log in</router-link> 
       |
        <router-link to="/SignupForm" class="router-link-inactive">Sign up</router-link>
      </nav>
      
      <label for="login-email">E-mail:</label>
      <input v-model="form.email"  type="email" id="login-email">
      
      <label for="login-password">Password:</label>
      <input v-model="form.password" type="password" id="login-password">
      
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
      errors: [],
    }
  },
  methods: {
    trySubmitLogin() {
      
      if (this.loginIsValid()) {
        this.$http.post('http://localhost:3000/api/auth/login', this.form)
       
        .then(res => {
          if(res.status === 200) {
            localStorage.setItem("user", JSON.stringify(res.data));
            this.$router.push('/Home')
          }
        })
        .catch(err => {
          this.errors = [];
       
          if (err.response.status === 401) {    
            this.errors.push(err.response.data.error);
          }
          if (err.response.status === 500) {    
            this.errors.push("Internal Server Error");
          }
          return this.errors.length ? false : true;
        })
      }
    },
    loginIsValid() {
      this.errors = [];
      
      if (!this.form.email) {
        this.errors.push("Email is required");
      } 
      if (!this.form.password) {
        this.errors.push("Password is required");
      }
      return this.errors.length ? false : true;
    }
  }
};
</script>

<style scoped>
.login-contenair {
  width: 30rem;
  margin: auto;
}

.login-form {
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  border-radius: 1rem;
  margin-top: 2rem;
}

.login-form img {
  width: 100%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.login-contenair nav {
  margin-bottom: 1rem;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 1.6rem;
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
  border-radius: 1rem;
  font-size: 1.6rem;
  background-color: #192a56;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 1rem;
}

.login-form button:hover {
  transform: scale(1.03);
  transition: 0.6s;
}

.router-link-active {
  font-size: 2rem;
  color: #333;
  font-weight: bold;
  text-decoration: none;
}

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

ul {
  text-align: center;
  list-style:none;
  margin-right: 3rem;
}
</style>
