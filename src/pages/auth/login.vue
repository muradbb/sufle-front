<template>
   <div>
       <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-6 col-lg-6 col-md-6">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Login</h1>
                                    </div>
                                    <form @submit.prevent="login" class="user" >
                                        <div class="form-group">
                                            <input 
                                                v-model.lazy="$v.form.username.$model"
                                                type="text" 
                                                class="form-control form-control-user"
                                                id="exampleInputEmail" 
                                                placeholder="Enter username...">
                                             <div v-if="$v.form.username.$error">
                                                <div class="form-error" v-if="!$v.form.username.required">
                                                   Zəhmət olmasa xananı doldurun
                                                </div>
                                             </div>
                                        </div>
                                        <div class="form-group">
                                            <input 
                                                v-model.lazy="$v.form.password.$model"
                                                type="password" 
                                                class="form-control form-control-user"
                                                id="exampleInputPassword" 
                                                placeholder="Password"
                                             />
                                             <div v-if="$v.form.password.$error">
                                                <div class="form-error" v-if="!$v.form.password.required">
                                                   Zəhmət olmasa xananı doldurun
                                                </div>
                                             </div>
                                        </div>
                                       <button type="submit" class="btn btn-custom btn-user btn-block">Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
   </div>
</template>

<script>
   // Components
   import {required} from "vuelidate/lib/validators";
   import Swal from "sweetalert2";

   // Services
   import Auth from "../../services/auth.service";

   export default {
      name: "login",
      data() {
         return {
            form: {
               username: null,
               password: null
            }
         };
      },
      validations: {
         form: {
            username: {
               required,
            },
            password: {
               required
            }
         }
      },
      methods: {
         login() {
            this.$v.form.$touch();
            if (!this.$v.form.$invalid) {
               let loading = this.$loading.show();
               Auth.login(this.form)
                  .then(res => {
                     loading.hide();
                     if (res.data.code === 200) {
                        localStorage.token = JSON.stringify(
                           res.data.response.token
                        );
                        localStorage.data = JSON.stringify(
                           res.data.response
                        );
                        window.location.reload();
                     }
                  })
                  .catch(err => {
                     loading.hide();
                     Swal.fire({
                        icon: "error",
                        text: 'İstifadəçi adı vəya şifrə yalnışdır.'
                     });
                  });
            }
         }
      }
   };
</script>

<style scoped></style>
