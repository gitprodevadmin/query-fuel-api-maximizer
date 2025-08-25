import PresetCountryController from '#controllers/preset_country'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.resource('preset_countries', PresetCountryController).apiOnly()
  router.put('preset_countries/sync', [PresetCountryController, 'update'])
}).prefix('/api')
