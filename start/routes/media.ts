import router from '@adonisjs/core/services/router'
import MediaController from '#controllers/media_controller'

router.group(() => {
  router.post('/media/upload', [MediaController, 'upload'])
}).prefix('/api')
