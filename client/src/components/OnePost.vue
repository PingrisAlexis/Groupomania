<template>
  <div>
    <div class="post-contenair" >
    
      <header  v-for = "user in users" :key = "user.id">
        <div class="post-contenair-header" v-if="user.id === post.userId">
          <img v-if="user.avatar" :src="user.avatar" alt="User's profil pick" :key="user.avatar">
          <img v-else src="../assets/random-user.png" :key="user.avatar" alt="Default profil pick">
          <div class="post-header-info">
            <div>
              <span class="user-lastname">{{user.lastname}} </span> 
              <span class="user-firstname">{{user.firstname}}</span>
            </div>
            <span class="one-post-info-date">The {{post.createdAt}}</span>
          </div>
        </div>
      </header>
      
      <div >
        <button aria-label="Post options" v-if="post.userId == storageUser.userId && !editPost" class="btn-edit-post" @click="editPost = true"><i class="fas fa-bars"></i></button>
        <button aria-label="Back from post options" v-if="post.userId == storageUser.userId && editPost" class="btn-cancel-post" @click="editPost = false"><i class="fas fa-undo"></i></button>
        <button aria-label="Delete the post" v-if="post.userId == storageUser.userId  && editPost || storageUser.admin == 1 && post.userId != storageUser.userId" class="btn-delete-post" @click="deletePost()"><i class="fas fa-trash-alt"></i></button>
        <button aria-label="Modify the post" v-if="post.userId == storageUser.userId && editPost" class="btn-modify-post"  @click="modifyPost()"><i class="fas fa-check"></i></button>
      </div>
      
      <main v-if="!editPost">
        <h1>{{post.title}}</h1>
        <section>
          <img :src="this.post.media" alt="Post pick">
          <p class="post-message" v-html="(post.message)"></p>
        </section>
      </main>
      
      <main v-if="editPost">
        <input aria-label="Edit the title" :value="post.title" @change="handleInputTitle" maxlength="30" type="text" class="edit-post-title" id="edit-title" required>
        <div class="edit-section">
          <div id="preview">
            <img v-if="url" :src="url" alt="Post Image">
            <img v-else :src="this.post.media" alt="Post Image">
          </div>
          <input aria-label="Click to modify your article image" @change="upload()" type="file" ref="image" name="image"  id="post-file" accept=".jpg, .jpeg, .gif, .png">
          <vue-editor @input="handleInputMessage" :value="post.message"  cols="30" rows="10" class="edit-post-vue-editor" :editorToolbar="customToolbar">
          </vue-editor>
        </div>
      </main>
      
      <footer v-if="!editPost">
        <div v-for = "comment in comments" :key = "comment.id">
          <div  v-for = "user in users" :key = "user.id">
            <div class="one-comment" v-if=" user.id === comment.userId">
              <div class="one-comment-info">
                <img v-if="user.avatar" :src="user.avatar" alt="User's comment profil pick" :key="user.avatar" class="one-comment-info-image">
                <img v-else src="../assets/random-user.png" :key="user.avatar" alt="Default profil pick" class="one-comment-info-image">
                <div class="one-comment-user">
                  <span class="user-lastname">{{user.lastname}} </span>
                  <span class="user-firstname">{{user.firstname}} </span>
                </div>
                <div>
                  <span>The {{comment.createdAt}}</span>
                </div>
                <p v-if="editComment != comment.id " class="comment-content">{{comment.comment}}</p>
                <textarea contentEditable class="edit-comment-content" aria-label="Click here to modify the comment" id="edit-comment" @input="handleInputComment" v-if="editComment == comment.id" :value="comment.comment" type="text"></textarea>
              </div>
              <div class="btn-options">
                <button aria-label="Comment option" v-if="comment.userId == storageUser.userId && editComment == 0" class="btn-cancel-post" @click="editComment = comment.id"><i class="fas fa-bars"></i></button>
                <button aria-label="Back from comment option" v-if="comment.userId == storageUser.userId && editComment == comment.id" class="btn-cancel-post" @click="editComment = 0"><i class="fas fa-undo"></i></button>
                <button aria-label="Delete the comment" v-if="comment.userId == storageUser.userId && editComment == comment.id|| storageUser.admin == 1 && comment.userId != storageUser.userId" class="btn-delete-post" @click="deleteOneComment(comment.id)"><i class="fas fa-trash-alt"></i></button>
                <button aria-label="Modify the comment" v-if="comment.userId == storageUser.userId && editComment == comment.id" class="btn-modify-post" @click="modifyOneComment(comment.id)"><i class="fas fa-check"></i></button>
              </div>
              <hr>
            </div>
          </div>
        </div>
        <ul v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <li class="error-message" v-for="error in errors" :key="error">{{ error }}</li>
        </ul>  
        <form  @submit="trySubmitComment" class="one-comment-add">
          <textarea aria-label="Click here to write a comment" v-model="comment" id="comment" class="add-comment"  cols="50" rows="5" placeholder=" Write a comment:"></textarea>
          <button aria-label="Send the new comment" class="btn-add-comment">Send</button>
          <hr>
        </form>
      </footer>
      
    </div>
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
      storageToken: "",
      storageUser:"",
      post: [],
      users: [],
      comment: "",
      errors: [],
      comments: [],
      editPost: false,
      editComment: 0,
      image: "",
      title: "",
      message: "",
      media: "",
      inputDataTitle: "",
      inputDataMessage:"",
      url: null
    }
  },
  mounted() {
    this.connect();
    this.getOnePost();
    this.getAllUsers();
    this.getAllComments();
  },
  methods: {
    connect(){
      this.storageToken = JSON.parse(localStorage.user).token;
      this.storageUser = JSON.parse(localStorage.user);
    },
    handleInputTitle(event) {
      this.inputDataTitle = event.target.value;
    },
    handleInputMessage($event) {
      this.inputDataMessage = $event;
    },
    handleInputComment(event) {
      this.inputDataComment = event.target.value;
    },
    upload() {
      this.image = this.$refs.image.files[0];
      this.url = URL.createObjectURL(this.image);
      if (this.post.title != this.inputDataTitle) {
        this.post.title = this.inputDataTitle;
      }
    },
    modifyPost() {
      const postId = this.$route.params.id;
      const currentImgUrl = document.querySelector("#preview").querySelector("img").src;
      const formData = new FormData();
      
      this.post.title = this.inputDataTitle;
      formData.append("title", this.inputDataTitle);
        
      if (currentImgUrl != this.post.media) {
        formData.append("image", this.image, this.image.name);
      }
        

      if (this.post.message != this.inputDataMessage) {
        formData.append("message", this.inputDataMessage);
      }
        
      this.$http.put(`http://localhost:3000/api/posts/${postId}`, formData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.storageToken}`
        }
      })
      .then( () => {
        this.post.media = this.url;
        this.getOnePost();
      })
    }, 
    getOnePost() {
      const postId = this.$route.params.id;
      this.$http.get(`http://localhost:3000/api/posts/${postId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageToken}`
          }
        }
      )
      .then(res => {
        this.post = res.data;
      })
    },
    deletePost(){
      const postId = this.$route.params.id;
      this.$http.delete(`http://localhost:3000/api/posts/${postId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageToken}`
          }
        }
      )
      .then(res => {
        if(res.status === 200) {
         this.$router.push("../Home");
        }
      })
    },
    getAllUsers(){
      this.$http.get('http://localhost:3000/api/auth/',
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.storageToken}`
          }
        }
      )
      .then(res => {
        this.users = res.data;
      })
    },
    getAllComments() {
      var routePostId = parseInt(this.$route.params.id);
      this.$http.get(`http://localhost:3000/api/posts/${routePostId}/comments/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageToken}`
          }
        }
      )
      .then(res => {
        this.comments = res.data;
      })
    }, 
    trySubmitComment(e) {
    e.preventDefault();
    
    if (this.commentIsValid() ) {
      var routePostId = parseInt(this.$route.params.id);
      var commentUserId = this.storageUser.userId;
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
          'Authorization': `Bearer ${this.storageToken}`
      }
      })
      .then (res => {
      if(res.status === 200) {
        this.comment="";
        this.getAllComments();
        this.getAllUsers();
      }
      })
    }
    },
    commentIsValid() {
      this.errors = [];
      if (!this.comment) {
        this.errors.push("Write a comment before submit.");
      }
      return this.errors.length ? false : true;
    },
    deleteOneComment(commentId){
      const postId = this.$route.params.id;
      this.$http.delete(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageToken}`
          }
        }
      )
      .then(
        document.location.reload()
      )
    },
    modifyOneComment(commentId) {
      const postId = this.$route.params.id;
      const formData = { 
        comment: this.inputDataComment,
      };
      this.$http.put(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`, formData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.storageToken}`
        }
      })
      .then( () => {
        this.getAllComments();
      })
    }, 
  },
}
</script>

<style scoped>
.post-contenair,
.post-contenair-header,
main,
.edit-section,
section,
.one-comment,
.one-comment-info,
.one-comment-add {
  display: flex;
}

.post-contenair,
main,
.one-comment-info,
.one-comment-add    {
  justify-content: center;
}

.post-contenair,
main,
.edit-section,
section,
.one-comment,
.one-comment-info,
.one-comment-add {
  align-items: center;
}

h1,
.edit-post-title,
.validate-message,
ul,
.comment-content {
  text-align: center;
}

.post-contenair,
main,
.edit-section,
section,
.one-comment,
.one-comment-info,
.one-comment-add {
  flex-direction: column;
}

.post-contenair-header,
h1,
.edit-section,
section,
.comment-content,
.one-comment-info-image,
textarea,
button {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}

.post-contenair-header {
  background: #f1f2f6;
  border-radius: 1rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
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
  border-radius: 1rem;
}

textarea {
  margin: 1rem;
}

h1 {
  margin-top: 1rem;
  font-size: 2rem;
  border-radius: 1rem;
  background-color: #ffffff;
  padding: 1rem;
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

.edit-section,
section {
  position: relative;
  border-radius: 1rem;
  padding-bottom: 1rem;
}


.edit-section {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  
}

.edit-section img,
section img {
  height: 15rem;
  width: 38rem;
  object-fit: cover;
  border-radius: 1rem 1rem 0rem 0rem;
}

.edit-post-title {
  font-size: 2rem;
  margin-top: 2.5rem;
}

section span,
.edit-post-vue-editor {
  max-width: 34rem;
  font-size: 1rem;
}

textarea {
  padding-left: 1rem;
  margin-bottom: 1.8rem;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 1rem;
  font-size: 1rem;
  text-decoration: none;
  outline: none;
}

.validate-message {
  color: green;
  font-weight: bold;
  font-size: 1.4rem;
}

.error-message {
  color: #fd2d01;
  font-weight: bold;
  text-decoration: none;
}

ul {
  font-size: 1rem;
  list-style:none;
}

.one-comment-user {
  margin-top: 1rem;
}

.comment-content {
  font-size: 1.2rem;
  background: #f1f2f6;
  padding: 0.8rem;
  border-radius: 1rem;
  max-width: 15rem;
  white-space: wrap;
  word-wrap: break-word;
}

.one-comment-info {
  font-size: 1.1rem;
}

.one-comment-info-image {
  margin-top: 0.5rem;
  border-radius: 1rem;
  height: 5rem;
  width: 5rem;
  object-fit: cover;
}

hr {
  width: 5rem;
}

footer {
  overflow-x: hidden;
}

.btn-add-comment,
.btn-modify-post,
.btn-delete-post,
.btn-edit-post,
.btn-cancel-post {
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  margin: 1rem;
}

.btn-edit-post,
.btn-cancel-post {
  color: #333;
  background-color: #ffffff;
}

.btn-edit-post:hover,
.btn-cancel-post:hover {
  transition: 0.6s;
  color: #ffffff;
  background-color: #333;
}


.btn-add-comment,
.btn-modify-post {
  background-color: #ffffff;
  color: green;
}

.btn-add-comment:hover,
.btn-modify-post:hover {
  transition: 0.6s;
  color: #ffffff;
  background-color: green;
}

.btn-add-comment {
 margin-bottom: 1.5rem; 
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

.write-comment,
.image-post-file {
  font-size: 1.4rem;
}

.edit-comment-content {
    width: auto;
    min-height: 5rem;
    overflow: auto;
}
  
@media screen and (max-width: 680px) {

 section img,
 header {
   width: 100vw;
 }
  h1,
 textarea,
 .post-message {
   width: 86vw;
 }
}

</style>