import AdsController from '#controllers/ads'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.resource('ads', AdsController).apiOnly()
}).prefix('/api')
