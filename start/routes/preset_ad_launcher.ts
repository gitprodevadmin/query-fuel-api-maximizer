import PresetAdLauncherController from '#controllers/preset_ads_launcher'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.resource('preset_ad_launcher', PresetAdLauncherController).apiOnly()
  router.put('preset_ad_launcher/sync', [PresetAdLauncherController, 'update'])
}).prefix('/api')
