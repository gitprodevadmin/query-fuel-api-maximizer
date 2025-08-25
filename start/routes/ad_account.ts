import AdAccountController from '#controllers/ad_account'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.resource('ad_accounts', AdAccountController).apiOnly()
  router.put('ad_accounts/sync', [AdAccountController, 'update'])
}).prefix('/api')
