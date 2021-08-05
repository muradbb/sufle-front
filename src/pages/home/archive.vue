<template>
   <div>
      <h1 class="h3 mb-0 text-gray-800">Arxiv</h1>

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
// Services
import Order from "../../services/orders.service";
import menus from "../../router/menu";


export default {


   name: "archive",
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
         columns: ['name', 'lastName', 'orderCode', 'phoneNumber', 'orderDate', 'orderTime', 'type', 'amount','notes'],
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
         Order.listArchived()
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
