<template>
  <div class="add-post-contenair">
    <form  @submit="trySubmit">
        <div class="add-post-form-group">
          <label>Title:</label>
          <input v-model="title" type="text" name="title" class="title" />
        </div>
        <div class="add-post-form-group">
          <label>Message:</label>
          <vue-editor class="add-post-vue-editor" v-model="message" :editorToolbar="customToolbar"></vue-editor>
        </div>
        <div >
          <input class="btn-upload" @change="upload()" type="file" ref="image" name="image"  id="File" accept=".jpg, .jpeg, .gif, .png">
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
      // ['clean'],
    ],
    userId:this.$user.userId,
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
      if (this.AddPostIsValid() ) {
        const signupDate = new Date();
        const createdAt = signupDate.toLocaleString('en-GB',{
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'});
          
        const formData = new FormData();
        formData.append("userId", this.userId);
        formData.append("title", this.title);
        formData.append("message", this.message);
        formData.append("image", this.image, this.image.name);
        formData.append("createdAt", createdAt);
        console.log(this.image)
        
        this.$http.post('http://localhost:3000/api/posts', formData,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$token}`
          }
        })
     .then(res => {
        if(res.status === 201) {
          this.messagePostValidation = "Your post has been created!";
          this.title = "";
          this.message = "";
          this.image = null;
      }
    })
    .catch(err => {this.errors.push(err.response.data.error)});
    }
  },
  AddPostIsValid() {
    this.errors = [];
    if (!this.title) {
      this.errors.push('Title is required.');
    }
    if (!this.message) {
      this.errors.push('Message is required.');
    }
    return this.errors.length ? false : true;
  },
  upload() {
      this.image = this.$refs.image.files[0]; 
  }
}
    
};
</script>
<style scoped>
.add-post-vue-editor, .title {
  border: 0.1rem solid black !important;
  outline:none;
}

input[type="file" i] {
  color: #fd2d01;
  font-weight: bold;
}

.add-post-contenair {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 2rem;
}

.add-post-contenair form {
  width: 40rem;
    padding: 4rem;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    border: 0.2rem solid #fd2d01;
    font-size: 1rem;
    border-top: none;
    border-bottom: none;
    border-right: none;
}

.add-post-form-group {
    display: flex;
    flex-direction: column-reverse;
}

.add-post-form-group {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.add-post-form-group label {
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: #fd2d01;
}

.add-post-form-group input {
  height: 2rem;
}

.add-post-form-group input,
.add-post-form-group
 {
  font-size: 1.2rem;
  font-family: Arial, Helvetica, sans-serif;
}

.add-post-form-btn-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

button {
  cursor: pointer;
  width:15rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  margin-top: 2rem;
  font-weight: bold;
  
}

.btn-submit {
  background-color: #ffffff;
  color: #fd2d01;
}

.btn-submit:hover {
  transform: scale(1.03);
  transition: 0.6s;
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
}
</style>