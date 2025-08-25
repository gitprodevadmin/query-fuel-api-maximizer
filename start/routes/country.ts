import CountryController from '#controllers/country'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.resource('countries', CountryController).apiOnly()
  router.put('countries/sync', [CountryController, 'update'])
}).prefix('/api')
