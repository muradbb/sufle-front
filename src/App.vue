<template>
   <div id="app">
      <main class="main-content">
         <section v-if="token">
            <div id="wrapper">
               <Sidebar/>
               <div id="content-wrapper" class="d-flex flex-column">
                  <Search/>
                     <!-- Main Content -->
                     <div id="content">
                        <!-- Begin Page Content -->
                        <div class="container-fluid">
                           <router-view/>
                        </div>
                     </div>
               </div>
            </div>
         </section>
         <section v-else>
            <div class="container">
               <router-view/>
            </div>    
         </section>
      </main>
   </div>
</template>

<script>
import Sidebar from './components/static/Sidebar';
import Search from './components/static/Search';

   export default {
      name: 'App',
      components: {Sidebar, Search},
      data() {
         return {
            token: localStorage.token
         }
      },
      mounted () {
         document.body.classList.add('bg-gradient-primary', 'login')
         
      },
      destroyed () {
         document.body.classList.remove('bg-gradient-primary', 'login')
      },
      
   }
</script>

<style>
  @import "./assets/app.css";
   .form-error {
      color: red;
   }

   .btn-custom {
      background-color: #37404a;
      color: #fff;
      border-color: #37404a;
   }
</style>
