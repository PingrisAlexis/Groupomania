import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './views/Index';
import Home from './views/Home';
import MyAccount from './views/MyAccount';
import Login from './components/Login';
import Signup from './components/Signup';
import TheHeader from './components/TheHeader';
import UserAccount from './components/UserAccount';
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
     path: '/Login',
     component: Login,
   },
   {
     path: '/Signup',
     component: Signup,
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
   }
 ]
});