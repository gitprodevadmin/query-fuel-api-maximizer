import CountryController from '#controllers/country'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.resource('countries', CountryController).apiOnly()
}).prefix('/api')
