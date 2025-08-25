import LanguageController from '#controllers/language'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.resource('languages', LanguageController).apiOnly()
  router.put('languages/sync', [LanguageController, 'update'])
}).prefix('/api')
