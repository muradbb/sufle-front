import Methods from '../methods/helper'

export default [
   {
      path: '/home',
      name: 'home',
      component: () => import('../pages/home/index'),
      meta: {
         isLogin: true
      }
   },
   {
      path: '/add-order',
      name: 'add-order',
      component: () => import('../pages/add-order/index'),
      meta: {
         isLogin: true
      }
   },
   {
      path: '/auth/login',
      name: 'auth.login',
      component: () => import('../pages/auth/login'),
   },
   {
      path: '/archive',
      name: 'archive',
      component:()=>import('../pages/home/archive'),
      meta: {
         isLogin: true
      }

   }


]
