<template>
<div >
  <article  v-for = "user in users" :key = "user.id">
    <div class="post-contenair"  v-if="user.id === post.userId">
      <header class="post-contenair-header">
        <img v-if="user.avatar" :src="user.avatar" alt="Profil image" :key="user.avatar" class="one-post-info-image">
        <img v-else src="../assets/random-user.png" :key="user.avatar" alt="Default profil image" class="one-post-info-image">
        <div class="post-header-info">
          <div>
            <span id="user-lastname">{{user.lastname}} </span> 
            <span id="user-firstname">{{user.firstname}}</span>
          </div>
          <div>
            <span class="one-post-info-date">The {{post.createdAt}}</span>
          </div>
        </div>
      </header>
      <main>
        <h1>{{post.title}}</h1>
        <section>
          <img :src="post.media" alt="Post image">
          <span v-html="(post.message)"></span>
        </section>
      </main>
      <footer>
         <div  v-for = "comment in comments" :key = "comment.id">
           <div class="one-post-info-user" v-if="user.id === comment.userId">
           <p class="comment">{{comment.comment}} </p>
           <p>{{user.lastname}}</p>
           </div>
         </div>
        
        <form @submit="trySubmitComment" class="post-footer-add-comment">
          <label for="add-comment"></label>
            <textarea v-model="comment" id="add-comment"  cols="50" rows="4" placeholder=" Write a comment:"></textarea>
          <button class="btn-submit"><i class="far fa-envelope"></i></button>   
        </form>
           
        <ul  v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <li class="error-message" v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </footer>
    </div>   
  </article>
</div>
</template>

<script>
export default {
  data(){
    return {
      post: [],
      users: [],
      comment: "",
      errors: [],
      comments: []
    }
  },
  mounted() {
    this.getOnePost();
    this.getAllUsers();
    this.getAllComments();
  },
  methods: {
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
        console.log(this.post)
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
        console.log(this.users)
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
        console.log(this.comments)
      })
      .catch(err => {this.errors.push(err.response.data.error)});
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
  border-radius: 3rem;
  font-size: 1.2rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

}

.post-contenair-header img {
  border-radius: 50%;
  height: 6rem;
  width: 6rem;
  object-fit: cover;
}


.post-header-info {
  margin-top: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

#user-lastname {
  text-transform: uppercase;
}

#user-firstname {
  text-transform: capitalize;
}
main {
  display: flex;
  flex-direction: column;
  border-radius: 3rem;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 2rem;
  text-align: center;
  border-radius: 3rem;
  height: 3rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  min-width: 10rem;
  display: inline-block;
  position: relative;
  bottom: 1rem;
  z-index: 1;
  background-color: #ffffff;
  padding: 1rem;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  bottom: 2rem;
  padding: -1rem;
  border-radius: 3rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}

section img {
  height: 20rem;
  height: 15rem;
  width: 40rem;
  object-fit: cover;
  border-radius: 3rem 3rem 0rem 0rem;
}

section span {
  max-width: 30rem;
  font-size: 1rem;
}

textarea {
  padding-left: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 3rem;
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
  font-size: 1rem;
}

.comment {
  font-size: 1rem;
  background: #f1f2f6;
}
</style>