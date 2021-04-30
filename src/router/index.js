import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router);

const customRouter = new Router({
   routes
});

customRouter.beforeEach((to, from, next) => {
   const token = localStorage.token;

   if (token) {
      if (to.matched.some(route => route.meta.isLogin)) {
         next();
      } else {
         next({name: 'home'})
      }
   } else if (!token &&
      (to.name === 'auth.login' )) {
      next()
   } else {
      next({name: 'auth.login'});
   }

});


export default customRouter

