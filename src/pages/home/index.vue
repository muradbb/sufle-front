<template>
   <div>
      <!-- Page Heading -->
      <div class="d-flex align-items-center justify-content-between mb-4">
         <h1 class="h3 mb-0 text-gray-800">Satış</h1>
         <router-link
            :to="{name: 'add-order'}"
            class="d-sm-inline-block btn btn-sm btn-custom"
         >
            <i class="fas fa-plus"></i> Əlavə et
         </router-link
         >
      </div>

      <!-- DataTales Example -->
      <div class="card shadow mb-4">
         <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Sifariş siyahısı</h6>
         </div>
         <div class="card-body">
            <div class="table-responsive-lg">
               <v-client-table
                  :data="tableData"
                  :columns="columns"
                  :options="options"
                  ref="myCoolDataTable"
               >
                  <template slot="itsTime" slot-scope="props">
              <span
                 :class="{'badge': true, 'badge-pill': true, 'badge-success': !props.row.itsTime, 'badge-danger': props.row.itsTime}"
              >
                {{ props.row.itsTime ? 'Finished' : 'Active' }}
              </span>
                  </template>
               </v-client-table>
            </div>
         </div>

         <download-excel
            class="btn btn-primary"
            :fields="json_fields"
            :fetch="exportTableData"
            :type="dataExportType"
            :name="'report.'+dataExportType"
         >
            Download Data
         </download-excel>
      </div>
   </div>
</template>

<script>
// Components
import Swal from "sweetalert2";
import JsonExcel from 'vue-json-excel';
import VModal from 'vue-js-modal';
import Vue from "vue";
Vue.use(VModal, { componentName: 'Polo' })

// Services
import Order from "../../services/orders.service";
import menus from "../../router/menu";


export default {


   name: "home",
   data() {
      return {
         json_fields: {
            "Adı": "name",
            "Soyadı": "lastName",
            "Sifariş kodu": "orderCode",
            "Nömrəsi": "phoneNumber",
            "Sifariş tarixi": "orderDate",
            "Sifariş saatı": "orderTime",
            "Qeydlər": "notes",
            "Tip": "type",
            "Say": "amount"
         },
         menus: menus,
         columns: ['name', 'lastName', 'orderCode', 'phoneNumber', 'orderDate', 'orderTime', 'type', 'amount','notes',  'itsTime'],
         tableData: [],
         options: {

            headings: {
               name: 'Adı',
               lastName: 'Soyadı',
               orderCode: 'Sifariş kodu',
               phoneNumber: 'Nömrəsi',
               orderDate: 'Sifariş tarixi',
               orderTime: 'Sifariş saatı',
               type: "Tip",
               amount: "Say",
               notes: 'Qeyd',
               itsTime: 'Status'
            }
         },
         dataExportType: 'csv',
      }
   },
   components: {
      downloadExcel: JsonExcel,
   },

   methods: {
      exportTableData() {
         return this.$refs.myCoolDataTable.allFilteredData; // Change "myCoolDataTable" to your ref
      },
      getOrders() {
         let loading = this.$loading.show();
         Order.list()
            .then(
               res => {
                  if (res.data.code === 200) {
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
