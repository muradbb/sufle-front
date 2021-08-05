import AppService from './_app.service'

export default {

   list: () => {
      return AppService.get(`/requestTime/selectAll`);
   },
   listArchived:()=>{
     return AppService.get('/requestTime/selectArchived');
   },
   create: (params) => {
      return AppService.post(`/requestTime/insert`, params)
   },
   check: (params) => {
      return AppService.get(`/cakeLimit/selectByDateAndType?date=${params}`);
   }
}
