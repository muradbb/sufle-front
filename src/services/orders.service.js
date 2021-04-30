import AppService from './_app.service'

export default {

   list: () => {
      return AppService.get(`/requestTime/selectAll`);
   },
   create: (params) => {
      return AppService.post(`/requestTime/insert`, params)
   },
   check: (params) => {
      return AppService.get(`/cakeLimit/selectByDate?date=${params}`);
   }
}
