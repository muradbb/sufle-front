import AppService from './_app.service'

export default {

   login: (params) => {
      return AppService.post('/user/auth', params);
   }
}
