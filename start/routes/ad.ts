import AdsController from '#controllers/ads'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.resource('ads', AdsController).apiOnly()
  router.put('ads/sync', [AdsController, 'update'])
}).prefix('/api')
