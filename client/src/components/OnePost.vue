<template>
<div>
  <article class="post-contenair" >
      <header  v-for = "user in users" :key = "user.id">
        <div class="post-contenair-header" v-if="user.id === post.userId">
          <img v-if="user.avatar" :src="user.avatar" alt="Profil image" :key="user.avatar">
          <img v-else src="../assets/random-user.png" :key="user.avatar" alt="Default profil image">
          <div class="post-header-info">
            <div>
              <span class="user-lastname">{{user.lastname}} </span> 
              <span class="user-firstname">{{user.firstname}}</span>
            </div>
            <span class="one-post-info-date">The {{post.createdAt}}</span>
          </div>
          <div></div>
        </div>
      </header>
      <div v-if="post.userId == $user.userId">
        <button class="btn-edit-post" v-if="!edit" @click="edit = true">Edit</button>
        <button class="btn-cancel-post" v-if="edit" @click="edit = false">Cancel</button>
        <button class="btn-delete-post"  @click="deletePost()">Delete Post</button>
      </div>
      
      <main v-if="!edit">
        <h1>{{post.title}}</h1>
        <section>
          <img :src="post.media" alt="Post image">
          <p class="post-message" v-html="(post.message)"></p>
        </section>
      </main>
      
      
      
      <main  v-if="edit">
         <label for="edit-title"></label>
            <input type="text" class="edit-post-title" id="modify-title" v-model="this.post.title">
            <section class="edit-section">
            <div id="preview">
              <img :src="this.post.media"/>
            </div>
            <input class="btn-upload" @change="upload()" type="file" ref="image" name="image"  id="File" accept=".jpg, .jpeg, .gif, .png">
              <vue-editor v-model="this.post.message"  :value="value" @input="updateText"  cols="30" rows="10" class="edit-post-vue-editor" :editorToolbar="customToolbar"></vue-editor>
            </section>
        <button class="btn-modify-post"  @click="modifyPost()">Modify Post</button>      
      </main>
  
  
      
      <footer>
        <div v-for = "comment in comments" :key = "comment.id">
        <div  v-for = "user in users" :key = "user.id">
          <div class="one-comment" v-if=" user.id === comment.userId">
            <div class="one-comment-info">
              <img v-if="user.avatar" :src="user.avatar" alt="Profil image" :key="user.avatar" class="one-comment-info-image">
              <img v-else src="../assets/random-user.png" :key="user.avatar" alt="Default profil image" class="one-comment-info-image">
              <div>
                <span class="user-lastname">{{user.lastname}} </span>
                <span class="user-firstname">{{user.firstname}} </span>
              </div>
              <div>
                <span>The {{comment.createdAt}}</span>
              </div>
            </div>
            <p class="comment-content">{{comment.comment}}</p>
            <button class="delete-post" v-if="comment.userId == $user.userId" @click="deleteComment(comment.id)">Delete Comment</button>
            <hr>
          </div>
        </div>
      </div>
      <ul v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <li class="error-message" v-for="error in errors" :key="error">{{ error }}</li>
        </ul>  
      <form  @submit="trySubmitComment" class="one-comment-add">
          <label for="add-comment">
            <textarea v-model="comment" class="add-comment"  cols="50" rows="5" placeholder=" Write a comment:"></textarea>
          </label>
          <button class="btn-add-comment"><i class="far fa-envelope"></i></button>   
        </form>
      </footer>
    </article>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
    components: {
    VueEditor
  },
  data(){
    return {
      customToolbar:[
      ['bold', 'italic', 'underline'],
      [{'align':''},{'align':'center'},{'align':'right'}],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{'background':[]},{'color':[]}],
      ['strike'],
    ],
      post: [],
      users: [],
      comment: "",
      errors: [],
      comments: [],
      edit: false,
      image: null,
      title:"",
      message:"",
      modifiedMessage:""
    }
  },
  mounted() {
    this.getOnePost();
    this.getAllUsers();
    this.getAllComments();
  },
  methods: {
    modifyPost() {
      // const postId = this.$route.params.id;
      const modifiedTitle = document.querySelector('#modify-title').value;
      const modifiedMessage = document.querySelector(".edit-post-vue-editor").value;
      
      // const NewMessage = this.post.message;
      console.log(modifiedTitle);
      console.log(modifiedMessage);
      
        // const formData = new FormData();
        // formData.append("image", this.image, this.image.name);
        // formData.append("title", modifiedTitle);
        // formData.append("message", modifiedMessage);
        // this.$http.put(`http://localhost:3000/api/posts/${postId}`, formData,{
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${this.$token}`
        //   }
        // })
        // .then(
        //   document.location.reload()
        // )
        // .catch(err => {this.errors.push(err.response.data.error)});
    },
     upload() {
      this.image = this.$refs.image.files[0];
      this.url = URL.createObjectURL(this.image);
    },
    getOnePost() {
      const postId = this.$route.params.id;
      this.$http.get(`http://localhost:3000/api/posts/${postId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$token}`
          }
        }
      )
      .then(res => {
        this.post = res.data;
      })
      .catch(err => {this.errors.push(err.response.data.error)});
    },
  getAllUsers(){
    this.$http.get('http://localhost:3000/api/auth/',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.$token}`
        }
      }
    )
    .then(res => {
      this.users = res.data;
    })
    .catch(err => {this.errors.push(err.response.data.error)});
  },
  getAllComments() {
    var routePostId = parseInt(this.$route.params.id);
    this.$http.get(`http://localhost:3000/api/posts/${routePostId}/comments/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.$token}`
        }
      }
    )
    .then(res => {
      this.comments = res.data;
    })
    .catch(err => {this.errors.push(err.response.data.error)});
  }, 
  trySubmitComment(e) {
  e.preventDefault();
    
  if (this.commentIsValid() ) {
    var routePostId = parseInt(this.$route.params.id);
    var commentUserId = this.$user.userId;
    var commentValue = this.comment;
    var date = new Date();
    const commentDate = date.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'});

    const formData = { 
      userId: commentUserId,
      postId: routePostId,
      comment: commentValue,
      createdAt: commentDate
    };
    this.$http.post(`http://localhost:3000/api/posts/${routePostId}/comments/`, formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.$token}`
    }
    })
    .then (res => {
      if(res.status === 200) {
        this.comment="";
        this.getAllComments();
        this.getAllUsers();
      }
    })
    .catch( err => {this.errors.push( err.response.data.error)});
    }
  },
  commentIsValid() {
      this.errors = [];
      if (!this.comment) {
        this.errors.push('Write a comment before submit.');
      }
      return this.errors.length ? false : true;
    },
    deletePost(){
      const postId = this.$route.params.id;
      this.$http.delete(`http://localhost:3000/api/posts/${postId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$token}`
          }
        }
      )
      .then(res => {
        if(res.status === 200) {
         this.$router.push("../Home");
        }
      })
    },
    deleteComment(commentId){
      const postId = this.$route.params.id;
      this.$http.delete(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$token}`
          }
        }
      )
      .then(
        document.location.reload()
      )
    },

  },
}
</script>

<style scoped>
.post-contenair {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.post-contenair-header {
  display: flex;
  background: #f1f2f6;
  border-radius: 1rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}

.post-contenair-header img {
  border-radius:1rem;
  height: 6rem;
  width: 6rem;
  object-fit: cover;
}


.post-header-info {
  margin-top: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  white-space: wrap;
  word-wrap:initial;
  overflow: hidden;
}

.user-lastname {
  text-transform: uppercase;
}

.user-firstname {
  text-transform: capitalize;
}
main {
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 2rem;
  text-align: center;
  border-radius: 1rem;
  height: 3rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  display: inline-block;
  position: relative;
  bottom: 1rem;
  background-color: #ffffff;
  padding: 1rem;
  white-space: wrap;
  word-wrap:break-word;
  overflow: hidden;
}

.post-message {
  font-size: 1.2rem;
  max-width: 30rem;
   white-space: wrap;
  word-wrap:initial;
  overflow: hidden;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  bottom: 2rem;
  padding: -1rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}
.edit-section {
  margin-top: 5.1rem;
}
section img {
  height: 15rem;
  width: 38rem;
  object-fit: cover;
  border-radius: 1rem 1rem 0rem 0rem;
}
.edit-post-title {
  font-size: 2rem;
  text-align: center;
  margin-top: 0.5rem;
}
section span,
.edit-post-vue-editor {
  max-width: 30rem;
  font-size: 1rem;
}

textarea {
  padding-left: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 1rem;
  font-size: 1rem;
  text-decoration: none;
  outline: none;
}

.error-message {
  color: #fd2d01;
  font-weight: bold;
  text-decoration: none;
}

ul {
  text-align: center;
  font-size: 1rem;
  list-style:none;
  
}

.one-comment {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comment-content {
  font-size: 1rem;
  background: #f1f2f6;
  padding: 0.8rem;
  margin: 0.8rem;
  border-radius: 1rem;
  max-width: 15rem;
  text-align: center;
  white-space: wrap;
  word-wrap: break-word;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  
}

.one-comment-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.one-comment-info-image {
  margin-top: 0.5rem;
  border-radius: 1rem;
  height: 5rem;
  width: 5rem;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  
}

.one-comment-add {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-add-comment {
   margin-top: 2rem;
  cursor: pointer;
  width: 15rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  margin: 1rem;
  font-weight: bold;
  background: #ffffff;
}

.fa-envelope {
  font-size: 2rem;
  color: green;
}

.btn-add-comment:hover {
  transform: scale(1.03);
  transition: 0.6s;
}

hr {
  width: 5rem;
}

footer {
  overflow-x: hidden;
}

.btn-delete-post,
.btn-edit-post,
.btn-cancel-post {
  cursor: pointer;
  width: 8rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
}

.btn-edit-post,
.btn-cancel-post {
  background-color: #ffffff;
  color: orange;
  
}

.btn-delete-post {
  background-color: #ffffff;
  color: #fd2d01;
}

.btn-delete-post:hover {
  transition: 0.6s;
  color: #ffffff;
  background-color: #fd2d01;
}
@media screen and (max-width: 680px) {
 h1,
 section img,
 header {
   width: 91vw;
 }
 textarea,
 .post-message {
   width: 90vw;
   padding-left: 0rem;
   border-radius: 0rem;
 }
}

</style>