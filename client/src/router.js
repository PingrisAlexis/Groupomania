import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './views/Index';
import Home from './views/Home';
import MyAccount from './views/MyAccount';
import AddPost from './views/AddPost';
import Post from './views/Post';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import PostForm from './components/PostForm';
import TheHeader from './components/TheHeader';
import UserAccount from './components/UserAccount';
import AllPost from './components/AllPost';
import OnePost from './components/OnePost';

Vue.use(VueRouter);

export default new VueRouter({
  linkActiveClass: 'is-active',
  routes: [
   {
     path:'/',
     name:'Index',
     component: Index,
   },
   {
    path: '/Home',
    name:'Home',
    component: Home,
  },
   {
     path: '/LoginForm',
     component: LoginForm,
   },
   {
     path: '/SignupForm',
     component: SignupForm,
   },
   {
     path: '/TheHeader',
     component: TheHeader,
   },
   {
     path:'/UserAccount',
     component: UserAccount,
   },
   {
     path:'/MyAccount',
     name:'MyAccount',
     component: MyAccount,
   },
   {
    path:'/AddPost',
    name:'AddPost',
    component: AddPost,
  },
  {
    path:'/PostForm',
    name:'PostForm',
    component: PostForm,
  },
  {
    path:'/AllPost',
    name:'AllPost',
    component: AllPost,
  },
  {
    path:'/Post/:id',
    name:'Post',
    component: Post,
  },
  {
    path:'/OnePost',
    name:'OnePost',
    component: OnePost,
  },
 ]
});