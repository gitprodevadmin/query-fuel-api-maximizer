import Connection from '#controllers/connection'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.resource('connection', Connection).apiOnly()
}).prefix('/api')
