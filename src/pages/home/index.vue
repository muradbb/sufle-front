<template>
    <div>
        <!-- Page Heading -->
        <div class="d-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Satış</h1>
            <router-link :to="{name: 'add-order'}" class="d-sm-inline-block btn btn-sm btn-custom"><i class="fas fa-plus"></i> Əlavə et</router-link>
        </div>

        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Sifariş siyahısı</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive-lg">
                    <v-client-table :data="tableData" :columns="columns" :options="options">
                        <template slot="itsTime" slot-scope="props">
                            <span :class="{'badge': true, 'badge-pill': true, 'badge-success': !props.row.itsTime, 'badge-danger': props.row.itsTime}">
                                {{props.row.itsTime ? 'Finished' : 'Active' }}
                            </span>
                        </template>
                    </v-client-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
   // Components
   import Swal from "sweetalert2";

   // Services
   import Order from "../../services/orders.service";
   import menus from "../../router/menu";

   export default {
      name: "home",
      data() {
        return {
            menus: menus,
            columns: ['name', 'lastName','phoneNumber', 'orderDate', 'orderTime', 'notes', 'itsTime'],
            tableData: [],
            options: {
                headings: {
                    name: 'Adı',
                    lastName: 'Soyadı',
                    phoneNumber: 'Nömrəsi',
                    orderDate: 'Sifariş tarixi',
                    orderTime: 'Sifariş saatı',
                    notes: 'Qeyd',
                    itsTime: 'Status'
                }
            }
        }
      },
      
      methods: {   
          getOrders(){
              let loading = this.$loading.show();
              Order.list()
              .then(
                res => {
                    if(res.data.code === 200){
                        loading.hide();
                        this.tableData = res.data.response;
                    }
                }
              )
          },
      },
      mounted() {
        this.getOrders();
      }
   };
</script>

<style>
.VueTables__search-field {
    display: flex;
}
</style>
