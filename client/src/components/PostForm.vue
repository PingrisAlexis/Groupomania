<template>
  <div class="add-post-contenair">
    <form  @submit="trySubmit">
      <div id="preview">
          <img v-if="url" :src="url" />
          <img v-else src="../assets/groupomania-local.png">
      </div>
      <input class="btn-upload" @change="upload()" type="file" ref="image" name="image"  id="File" accept=".jpg, .jpeg, .gif, .png">
      <div class="add-post-form-group">
        <label>Title:</label>
        <input v-model="title" type="text" name="title" class="title" />
        <label>Message:</label>
        <vue-editor cols="30" rows="10" class="add-post-vue-editor" v-model="message" :editorToolbar="customToolbar"></vue-editor>
      </div>
      <ul v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <li class="error-message" v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
      <div class="validate-message">{{messagePostValidation}}</div>
      <div class="add-post-form-btn-container">
        <button class="btn-submit"><i class="far fa-envelope"></i></button>
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
      // ['clean'],
    ],
    url: null,
    title:"",
    message:"",
    createdAt:"",
    image: null,
    messagePostValidation:"",
    errors: []
    }
  },
  methods: {
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
        console.log(formData)
        formData.append("userId", this.$user.userId);
        formData.append("title", this.title);
        formData.append("message", this.message);
        formData.append("image", this.image, this.image.name);
        formData.append("createdAt", createdAt);
        this.$http.post('http://localhost:3000/api/posts', formData,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$token}`
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
        .catch(err => {this.errors.push(err.response.data.error)});
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
  border-radius: 3rem;
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

#preview img {
  max-width: 100%;
  border-radius: 3rem 3rem 0rem 0rem;
  max-height: 15rem;
  object-fit: cover;
}

input[type="file" i] {
  color: #333;
  font-weight: bold;
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

button {
  cursor: pointer;
  width:15rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background-color: #ffffff;
  color: #333;
  margin: 1rem;
}

.btn-submit:hover {
  transform: scale(1.03);
  transition: 0.6s;
  color: #333;
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