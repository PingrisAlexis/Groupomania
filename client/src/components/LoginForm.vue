<template class="template">
  <div class="login-contenair">
   <form @submit="trySubmit" class="login-form" >
     <div class="login-form-img-contenair">
        <img src="../assets/groupomania-local.png" alt="Logo Groupomania">
     </div>
      <nav>
        <router-link to="/LoginForm" class="router-link-active">Log in</router-link> 
       |
        <router-link to="/SignupForm" class="router-link-inactive">Sign up</router-link>
      </nav>
        <label for="login-email">E-mail:</label>
        <input v-model="form.email"  type="email" id="login-email"/>

        <label for="login-password">Password:</label>
        <input v-model="form.password" type="password" id="login-password"/>
        
         <ul v-if="errors.length">
            <b>Please correct the following error(s):</b>
          <li class="error-message" v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        <button id="login-btn type" type="submit"><i class="fas fa-check"></i></button>
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
  box-shadow: 0 0.5rem 0.5rem #d8d8d8;
  border-radius: 3rem;
  margin-top: 2rem;
}

.login-form img {
  width: 100%;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
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
  border-radius: 3rem;
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
