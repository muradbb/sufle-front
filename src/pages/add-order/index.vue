<template>
   <div>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
         <h1 class="h3 mb-0 text-gray-800">Sifariş əlavə et</h1>
      </div>
      <div class="card shadow mb-4">
         <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Sifariş formu</h6>
         </div>
         <div class="card-body">
            <form @submit.prevent="post">
               <div class="row">
                  <div class="col-lg-4 col-md-12">
                     <div class="form-group">
                        <label for="name">Sifarişçi adı<span class="i-input">*</span></label>
                        <input v-model.lazy="$v.form.name.$model" type="text" class="form-control" id="name"
                               aria-describedby="emailHelp" placeholder="Ad əlavə edin...">
                        <div v-if="$v.form.name.$error">
                           <div
                              class="form-error mt-2"
                              v-if="!$v.form.name.required">
                              Zəhmət olmasa xananı doldurun
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-4 col-md-12">
                     <div class="form-group">
                        <label for="surname">Şifarişçi soyadı<span class="i-input">*</span></label>
                        <input v-model.lazy="$v.form.lastName.$model" type="text" class="form-control" id="surname"
                               placeholder="Soyad əlavə edin...">
                        <div v-if="$v.form.lastName.$error">
                           <div
                              class="form-error mt-2"
                              v-if="!$v.form.lastName.required">
                              Zəhmət olmasa xananı doldurun
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-4 col-md-12">
                     <div class="form-group">
                        <label for="hour">Sifariş tipi<span class="i-input">*</span></label>

                        <select v-model.lazy="$v.type.$model" @change="onChange($event)" class="form-control" id="type">
                           <option>Tort</option>
                           <option>Avropa tortu</option>
                           <option>Marçipanlı tort</option>
                           <option>Şəkərbura</option>
                           <option>Paxlava</option>
                           <option>Qoğal</option>
                        </select>
                        <div v-if="$v.type.$error">
                           <div
                              class="form-error mt-2"
                              v-if="!$v.form.type.required">
                              Zəhmət olmasa xananı doldurun
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-lg-4 col-md-12">
                     <div class="form-group">
                        <label for="orderCode">Şifariş kodu<span class="i-input">*</span></label>
                        <input v-model.lazy="$v.form.orderCode.$model" type="text" class="form-control" id="orderCode"
                               placeholder="Sifariş kodunu əlavə edin...">
                        <div v-if="$v.form.orderCode.$error">
                           <div
                              class="form-error mt-2"
                              v-if="!$v.form.orderCode.required">
                              Zəhmət olmasa xananı doldurun
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-4 col-md-12">
                     <div class="form-group">
                        <label for="number">Sifarişçi nömrəsi<span class="i-input">*</span></label>
                        <input v-model.lazy="$v.form.phoneNumber.$model" type="text" class="form-control" id="number"
                               aria-describedby="emailHelp" placeholder="Nömrə əlavə edin...">
                        <div v-if="$v.form.phoneNumber.$error">
                           <div
                              class="form-error mt-2"
                              v-if="!$v.form.phoneNumber.required">
                              Zəhmət olmasa xananı doldurun
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-4 col-md-12">
                     <div class="form-group">
                        <label>Şifariş tarixi<span class="i-input">*</span></label>
                        <date-picker
                           @input="checkOptions"
                           v-model="form.orderDate"
                           valueType="DD-MM-YYYY"
                           format="DD-MM-YYYY"
                           :disabled-date="dateDisabler"
                           :disabled="typeNotChosen"
                        >
                        </date-picker>
                        <div v-if="$v.form.orderDate.$error">
                           <div
                              class="form-error mt-2"
                              v-if="!$v.form.orderDate.required">
                              Zəhmət olmasa xananı doldurun
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-lg-4 col-md-12">
                     <div class="form-group">
                        <label for="hour">Sifariş saatı<span class="i-input">*</span></label>
                        <select v-model.lazy="$v.form.orderTime.$model" class="form-control" id="hour"
                                :disabled="typeNotChosen || dateOnlyTypes" @change="timeFixer($event)">
                           <option v-for="(time,index) in times" :value="time" :class="{'bg-red': options[index]}"
                                   :disabled='options[index]'>{{ time }}
                           </option>

                        </select>
                        <div v-if="$v.form.orderTime.$error">
                           <div
                              class="form-error mt-2"
                              v-if="!$v.form.orderTime.required">
                              Zəhmət olmasa xananı doldurun
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-4 col-md-12">
                     <div class="form-group">
                        <label for="amount">Say/Çəki<span class="i-input">*</span></label>
                        <input v-model.lazy="$v.form.amount.$model" type="text" class="form-control" id="amount" :disabled="noAmount"
                               placeholder="Say/çəkini əlavə edin">
                        <div v-if="$v.form.amount.$error">
                           <div
                              class="form-error mt-2"
                              v-if="!$v.form.amount.required">
                              Zəhmət olmasa xananı doldurun
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-4 col-md-12">
                     <div class="form-group">
                        <label for="note">Qeyd</label>
                        <textarea v-model.lazy="form.notes" class="form-control" id="note" rows="3"
                                  placeholder="Qeyd əlavə edin..."></textarea>
                     </div>
                  </div>
               </div>
               <button type="submit" class="btn btn-custom">Submit</button>
               <button @click="formReset" class="btn btn-primary">Reset form</button>
            </form>
         </div>
      </div>
   </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import {required,requiredIf} from "vuelidate/lib/validators";
import Swal from "sweetalert2";

import Order from "../../services/orders.service";


export default {
   name: "home",
   components: {DatePicker},
   data() {
      return {
         noAmount:false,
         dateOnlyTypes: false,
         typeNotChosen: true,
         type: null,
         times: null,
         preciseTime: null,
         form: {
            name: null,
            lastName: null,
            entityType: null,
            phoneNumber: null,
            orderDate: null,
            orderTime: null,
            notes: null,
            orderCode: null,
            amount: null
         },
         options: []
      }
   },
   methods: {
      timeFixer(event) {
         if(this.entityType==='tort' || this.entityType==='mtort'){
            this.preciseTime=event.target.value;
         }else{
            const timeMap = new Map();
            //aTort  ['12:00-16:00', '16:00-21:00'] 14 17
            timeMap.set('12:00-16:00','14:00');
            timeMap.set('16:00-21:00','17:00');
            //mTort  ['12:00–14:00', '14:00-16:00', '16:00-18:00'] 13 15 18
            // timeMap.set('12:00–14:00','13:00');
            // timeMap.set('14:00-16:00','15:00');
            // timeMap.set('16:00-18:00','18:00');
            //qogal ['09:00-13:00', '13:00-19:00'] 10 15
            timeMap.set('09:00-13:00','10:00');
            timeMap.set('13:00-19:00','15:00');
            this.preciseTime=timeMap.get(event.target.value);
            // this.form.orderTime=this.preciseTime;
            // this.orderTime=this.preciseTime;
         }
         console.log(this.preciseTime);
         console.log(this.form.orderTime);
      },
      onChange(event) {
         switch (event.target.value) {
            case 'Tort':
               this.noAmount=true;
               this.form.amount=1;
               this.dateOnlyTypes = false;
               this.entityType = 'tort';
               this.times = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
               break;
            case 'Avropa tortu':
               this.noAmount=true;
               this.form.amount=1;
               this.dateOnlyTypes = false;
               this.times = ['12:00-16:00', '16:00-21:00']
               this.entityType = 'atort';
               break;
            case 'Marçipanlı tort':
               this.noAmount=true;
               this.form.amount=1;
               this.dateOnlyTypes = false;
               // this.times = ['09:00–13:00', '13:00-17:00', '17:00-21:00']
               this.times = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
               this.entityType = 'mtort';
               break;
            case 'Şəkərbura':
               this.noAmount=false;
               this.dateOnlyTypes = true;
               this.entityType = 'sekerbura'
               break;
            case 'Paxlava':
               this.noAmount=false;
               this.dateOnlyTypes = true;
               this.entityType = 'paxlava'
               break;
            case 'Qoğal':
               this.noAmount=false;
               this.dateOnlyTypes = false;
               this.times = ['09:00-13:00', '13:00-19:00']
               this.entityType = 'qogal'
               break;
         }
         this.typeNotChosen = false
         this.form.type = this.entityType;
      },
      dateDisabler(date) {
         const type = this.entityType;
         const today = new Date();
         today.setHours(0, 0, 0, 0);
         const timer = new Date();
         if (type === 'sekerbura' || type === 'paxlava') {
            today.setDate(today.getDate() + 2);
         } else if (type === 'qogal' && timer.getHours() >= 15) {
            today.setDate(today.getDate() + 1);
         }

         return date < today;
      },
      formReset() {
         this.form = {
            name: null,
            lastName: null,
            phoneNumber: null,
            orderDate: null,
            orderTime: null,
            notes: null,
            orderCode: null,
            amount: null,
            entityType: null
         }
      },
      checkOptions(query) {
         //we set the type of the entity here
         query += '&type=' + this.entityType;
         Order.check(query).then(res => {
            if (res.status === 200) {
               this.options = res.data.response.availability;
            }
            var s = ""
            var current = new Date();
            s = s + (current.getDate() < 10 ? '0' + current.getDate() : current.getDate()) + "-" + ((current.getMonth() + 1) < 10 ? '0' + (current.getMonth() + 1) : (current.getMonth() + 1)) + "-" + current.getFullYear()
            if (s === query) {
               switch (current.getHours()) {
                  case 14:
                     this.options = [true, true, true, true, true, true, true, true, true, true];
                     break;
                  case 13:
                     this.options = [true, true, true, true, true, true, true, true, true, this.options[9]];
                     break;
                  case 12:
                     this.options = [true, true, true, true, true, true, true, true, this.options[8], this.options[9]];
                     break;
                  case 11:
                     this.options = [true, true, true, true, true, true, true, this.options[7], this.options[8], this.options[9]];
                     break;
               }
            }
         })
      },
      post() {
         console.log(this.entityType);
         if(!(this.entityType==="paxlava")){
            this.form.amount=Math.trunc(this.form.amount);
         }
         this.form.orderTime = this.preciseTime;
         this.$v.form.$touch();
         if (!this.$v.form.$invalid) {
            let loading = this.$loading.show();
            Order.create(this.form)
               .then(res => {
                  if (res.status === 200) {
                     loading.hide();
                     Swal.fire({
                        icon: "success",
                        text: 'Sifariş əlavə edildi.'
                     });
                     this.$router.push({name: '/home'})
                  } else {
                     loading.hide();
                     Swal.fire({
                        icon: "error",
                        text: 'Xəta baş verdi. Zəhmət olmasa yenidən sınayın.'
                     });
                     this.formReset();
                  }
               })
               .catch(err => {
                  loading.hide();
                  Swal.fire({
                     icon: "error",
                     text: 'Xəta baş verdi.'
                  });
               });
         }
      }
   },
   validations: {
      type: {required},
      form: {
         name: {required},
         lastName: {required},
         phoneNumber: {required},
         orderDate: {required},
         orderTime: {
            required:requiredIf(function (){
               return !(this.entityType === 'paxlava' || this.entityType === 'sekerbura')
            })
         },
         orderCode: {required},
         //entityType: {required},
         amount: {required}
      }
   }
}
</script>
<style scoped>
.bg-red {
   background: #f14668;
   color: #fff;
}

.mx-datepicker {
   display: block;
   width: 100%;
}
</style>
