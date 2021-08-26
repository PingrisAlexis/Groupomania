<template class="template">
  <div class="signup-contenair">
    <form @submit="trySubmit" class="signup-form" id="signup">
      <div class="signup-form-img-contenair">
        <img src="../assets/groupomania-local.png" alt="Logo Groupomania">
      </div>
      <nav>
      <router-link to="/LoginForm" class="router-link-inactive">Log in</router-link> 
      | 
      <router-link to="/SignupForm" class="router-link-active">Sign up</router-link>
    </nav>
        <label for="signup-firstname">Firstname:</label>
        <input  v-model="form.firstname" type="text" id="signup-firstname"/>
      
        <label for="signup-lastname">Lastname:</label>
        <input v-model="form.lastname" type="text" id="signup-lastname"/>

        <label for="signup-email">E-mail:</label>
        <input v-model="form.email" type="email" id="signup-email"/>
        
        <label for="signup-password">Password:</label>
        <input v-model="form.password" type="password" id="signup-password"/>

        <label for="signup-password-verification">Password verification:</label>
        <input  v-model="form.passwordVerification"  type="password" id="signup-password-verification"/>

        <ul v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <li class="error-message" v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
         <div class="validate-message">{{message}}</div>
        <button id="signup-btn" type="submit"><i class="fas fa-check"></i></button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      },
      message:"",
      errors: []
      }
    },
 methods: {
  trySubmit(e) {
    e.preventDefault();
    if (this.signupIsValid()) {
       this.$http.post('http://localhost:3000/api/auth/signup', this.form )
     .then(res => {
        if(res.status === 201) {
          this.message = "Your account has been created, please login.";
          this.form.firstname= "";
          this.form.lastname= "";
          this.form.email= "";
          this.form.password= "";
          this.form.passwordVerification="";
      }
    })
     .catch(err => {this.errors.push(err.response.data.error)});
    }
  },
  signupIsValid() {
    this.errors = [];
    if (!this.form.firstname) {
      this.errors.push('Firstname is required');
    }
    if (!this.form.lastname) {
      this.errors.push('Lastname is required');
    }
    if (!this.form.email) {
      this.errors.push('Email is required');
    } 
    if (!this.form.password) {
      this.errors.push('Password is required');
    }
    if (this.form.password != this.form.passwordVerification) {
      this.errors.push('Password is not validate');
    }
    return this.errors.length ? false : true;
  }
}
}
</script>

<style scoped>
.signup-form {
 display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  border-radius: 1rem;
  width: 30rem;
  margin: auto;
  margin-top: 2rem;
}

.signup-form img {
  width: 100%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.signup-contenair nav {
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  font-size: 1.6rem;
}

.signup-form input{
  width:20rem;
  height: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.signup-form button {
  cursor: pointer;
  width:15rem;
  height: 3.5rem;
  border-radius: 1rem;
  font-size: 1.6rem;
  background-color: #192a56;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 1rem;
}

.signup-form button:hover {
  transform: scale(1.03);
  transition: 0.6s;
}

.router-link-active {
  font-size: 2rem;
  color: #333;
  font-weight: bold;
  text-decoration: none;
}

.error-message {
  color: #fd2d01;
  font-weight: bold;
  text-decoration: none;
}

.router-link-inactive {
  text-decoration: none;
  color:#333;
  font-weight: bold;
  
}
.validate-message {
  color: green;
  font-weight: bold;
  margin-bottom: 1rem;
}

ul {
  text-align: center;
  list-style:none;
  margin-right: 2.9rem; 
}
</style>
