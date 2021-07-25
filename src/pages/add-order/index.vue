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
                                    <input v-model.lazy="$v.form.name.$model" type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Ad əlavə edin...">
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
                                <input v-model.lazy="$v.form.lastName.$model" type="text" class="form-control" id="surname" placeholder="Soyad əlavə edin...">
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

                             <select v-model.lazy="$v.form.type.$model" @change="onChange($event)" class="form-control" id="type">
                                <option>Tort</option>
                                <option>Avropa tortu</option>
                                <option>Marçipanlı tort</option>
                                <option>Şəkərbura</option>
                                <option>Paxlava</option>
                                <option>Qoğal</option>
                             </select>
                             <div v-if="$v.form.type.$error">
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
                              <input v-model.lazy="$v.form.orderCode.$model" type="text" class="form-control" id="orderCode" placeholder="Sifariş kodunu əlavə edin...">
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
                                <input v-model.lazy="$v.form.phoneNumber.$model" type="text" class="form-control" id="number" aria-describedby="emailHelp" placeholder="Nömrə əlavə edin...">
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
                                    :disabled-date="disabledBeforeTodayAndAfterAWeek"
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

                                <select v-model.lazy="$v.form.orderTime.$model" class="form-control" id="hour" :disabled="typeNotChosen">
                                    <option :disabled='options[1]' :class="{'bg-red': options[1] }">11:00</option>
                                    <option :disabled='options[2]' :class="{'bg-red': options[2] }">12:00</option>
                                    <option :disabled='options[3]' :class="{'bg-red': options[3] }">13:00</option>
                                    <option :disabled='options[4]' :class="{'bg-red': options[4] }">14:00</option>
                                    <option :disabled='options[5]' :class="{'bg-red': options[5] }">15:00</option>
                                    <option :disabled='options[6]' :class="{'bg-red': options[6] }">16:00</option>
                                    <option :disabled='options[7]' :class="{'bg-red': options[7] }">17:00</option>
                                    <option :disabled='options[8]' :class="{'bg-red': options[8] }">18:00</option>
                                    <option :disabled='options[9]' :class="{'bg-red': options[9] }">19:00</option>
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
                             <input v-model.lazy="$v.form.amount.$model" type="text" class="form-control" id="amount" placeholder="Say/çəkini əlavə edin">
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
                                <textarea v-model.lazy="form.notes" class="form-control" id="note" rows="3" placeholder="Qeyd əlavə edin..."></textarea>
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

import {required} from "vuelidate/lib/validators";
import Swal from "sweetalert2";

import Order from "../../services/orders.service";



export default {
    name: "home",
    components: { DatePicker },
    data() {
        return {
           typeNotChosen:true,
           entityType:null,
            form: {
                name: null,
                lastName: null,
                type:null,
                phoneNumber: null,
                orderDate: null,
                orderTime: null,
                notes: null,
                orderCode:null,
                amount:null
            },
            options:[]
      }
    },
    methods: {
       onChange(event) {

          switch (event.target.value) {
             case 'Tort':
                this.entityType='tort';
                break;
             case 'Avropa tortu':
                this.entityType='atort';
                break;
             case 'Marçipanlı tort':
                this.entityType='mtort';
                break;
             case 'Şəkərbura':
                this.entityType='sekerbura'
                break;
             case 'Paxlava':
                this.entityType='paxlava'
                break;
             case 'Qoğal':
                this.entityType='qogal'
                break;
          }
          console.log(this.entityType)
          this.typeNotChosen=false
       },

      disabledBeforeTodayAndAfterAWeek(date) {
           const today = new Date();
           today.setHours(0, 0, 0, 0);

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
                orderCode:null,
                amount:null
            }
        },
        checkOptions(query){
            Order.check(query).then(res => {
                if(res.status === 200){
                    this.options = res.data.response.availability;
                    // var current = new Date();
                    // console.log(query);
                }
                var s=""
                var current = new Date();
                s=s+(current.getDate()<10?'0'+current.getDate():current.getDate())+"-"+((current.getMonth()+1)<10?'0'+(current.getMonth()+1):(current.getMonth()+1))+"-"+current.getFullYear()
                if(s===query){
                //  console.log(current.getHours())
                  switch (current.getHours()) {
                    case 14:
                        this.options=[true, true, true, true, true, true, true, true, true, true ];
                        break;
                    case 13:
                        this.options=[true, true, true, true, true, true, true, true, true, this.options[9] ];
                        break;
                    case 12:
                        this.options=[true, true, true, true, true, true, true, true, this.options[8], this.options[9] ];
                        break;
                    case 11:
                        this.options=[true, true, true, true, true, true, true, this.options[7], this.options[8], this.options[9] ];
                      break;
                  }
                }
            })
        },
        post(){
            this.$v.form.$touch();
            if(!this.$v.form.$invalid){
                let loading = this.$loading.show();
                Order.create(this.form)
                .then(res => {
                    console.log(res);
                    if (res.status === 200){
                        loading.hide();
                        Swal.fire({
                            icon: "success",
                            text: 'Sifariş əlavə edildi.'
                        });
                        this.$router.push({ name: '/home' })
                    } else if(res.response.status === 401){
                        loading.hide();
                        Swal.fire({
                            icon: "error",
                            text: 'Seçilmiş tarixə sifariş doludur.'
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
        form: {
            name: {required},
            lastName: {required},
            phoneNumber: {required},
            orderDate: {required},
            orderTime: {required},
            orderCode:{required},
            type: {required},
            amount:{required}
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
