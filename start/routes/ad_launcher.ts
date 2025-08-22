import AdsLauncherController from '#controllers/ads_launcher'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.resource('ad_launchers', AdsLauncherController).apiOnly()
}).prefix('/api')