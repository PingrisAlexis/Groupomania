<template>
  <div class="add-post-contenair">
    <form  @submit="trySubmit">
      <div id="preview">
          <img v-if="url" :src="url" alt="Post Image">
          <img v-else src="../assets/groupomania-local.png" alt="Default Post Image">
      </div>
      <label class="post-form-file" for="post-file">Click to choose your article image:</label>
      <input class="btn-upload" @change="upload()" type="file" ref="image" name="image"  id="post-file" accept=".jpg, .jpeg, .gif, .png">
      <div class="add-post-form-group">
        <label for="title">Title:</label>
        <input v-model="title" id="title" type="text" maxlength="30" name="title" class="title" required/>
        <label for="message">Message:</label>
        <vue-editor cols="30" id="message" rows="10" class="add-post-vue-editor" v-model="message" :editorToolbar="customToolbar" required></vue-editor>
      </div>
      <ul v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <li class="error-message" v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
      <div class="validate-message">{{messagePostValidation}}</div>
      <div class="add-post-form-btn-container">
        <button class="btn-submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
   components: {
    VueEditor
  },
data() {
  return {
    customToolbar:[
      ['bold', 'italic', 'underline'],
      [{'align':''},{'align':'center'},{'align':'right'}],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{'background':[]},{'color':[]}],
      ['strike'],
    ],
    storageToken: "",
    storageUser:"",
    url: null,
    title:"",
    message:"",
    createdAt:"",
    image: null,
    messagePostValidation:"",
    errors: []
    }
  },
   mounted() {
    this.connect();
  },
  methods: {
    connect(){
      this.storageToken = JSON.parse(localStorage.user).token;
      this.storageUser = JSON.parse(localStorage.user);
    },
    trySubmit(e) {
      e.preventDefault();
      if (this.postIsValid() ) {
        const signupDate = new Date();
        const createdAt = signupDate.toLocaleString('en-GB',{
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'});

        const formData = new FormData();
          formData.append("userId", this.storageUser.userId);
          formData.append("title", this.title);
          formData.append("message", this.message);
          formData.append("image", this.image, this.image.name);
          formData.append("createdAt", createdAt);

        this.$http.post('http://localhost:3000/api/posts', formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageToken}`
          }
        })
        .then(res => {
          if(res.status === 200) {
            this.messagePostValidation = "Your post has been created!";
            this.title = "";
            this.message = "";
            this.image = null;
          }
        })
        .catch(err => console.log( err.response.data));
      }
    },
    postIsValid() {
      this.errors = [];
      if (!this.title) {
        this.errors.push('Title is required.');
      }
      if (!this.message) {
        this.errors.push('Message is required.');
      }
      if (!this.image) {
        this.errors.push('Image is required.');
      }
      return this.errors.length ? false : true;
    },
    upload() {
      this.image = this.$refs.image.files[0];
      this.url = URL.createObjectURL(this.image);
    }
  }   
};
</script>

<style scoped>
.add-post-contenair {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  max-width: 29rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  flex-flow: row wrap;
}

.add-post-form-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.vue-editor{
  resize:vertical;
  
}
.add-post-vue-editor {
  outline:none;
  border: #333;
  width: 400px;
}

.title {
  outline:none; 
}

.post-form-file {
  font-size: 1.4rem;
  display: block;
}
#preview img {
  max-width: 100%;
  border-radius: 1rem 1rem 0rem 0rem;
  max-height: 15rem;
  object-fit: cover;
}

.add-post-form-group label {
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
}

.add-post-form-group input,
.add-post-form-group
 {
  font-size: 1.2rem;
  font-family: Arial, Helvetica, sans-serif;
}

.add-post-form-btn-container {
  display: flex;
  justify-content: center;
}

.btn-submit {
  cursor: pointer;
  width: 10rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background-color: #ffffff;
  margin: 1rem;
  color: green;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}


.error-message {
  color: #fd2d01;
  font-weight: bold;
  text-decoration: none;
}

.validate-message {
  color: green;
  font-weight: bold;
  text-align: center;
  font-size: 1rem;
}

ul {
  text-align: center;
  list-style:none;
  padding-right: 40px;
  font-size: 1rem;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>