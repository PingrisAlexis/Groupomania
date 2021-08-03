<template class="template">
  <div class="signup-contenair">
    <img src="../assets/groupomania-logo-center.png" alt="Logo Groupomania">
    <nav>
      <router-link to="/Login" class="router-link-inactive">Log in</router-link> 
      | 
      <router-link to="/Signup" class="router-link-active">Sign up</router-link>
    </nav>

    <form @submit="trySubmit" class="signup-form" id="signup" >
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
        <button id="signup-btn" type="submit">Submit</button>
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
          this.message = "You account has been created, please login.";
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
      this.errors.push('Password is not identical');
    }
    return this.errors.length ? false : true;
  }
}
}

</script>

<style scoped>
.template {
  height: 100%;
  max-width: 100%;
}

.signup-contenair {
  height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.signup-contenair img {
  width:25rem;
}

.signup-contenair nav {
  margin-bottom: 1rem;
}

.signup-form {
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  
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
  border-radius: 0.5rem;
  font-size: 1.6rem;
  margin-top: 2rem;
  background-color: #ffffff;
  color: #fd2d01;
  font-weight: bold;
}

.signup-form button:hover {
  transform: scale(1.03);
  transition: 0.6s;
}

nav {
  cursor: pointer;
  font-size: 1.6rem;
}

.router-link-active,
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
}
</style>
