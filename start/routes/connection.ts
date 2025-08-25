import Connection from '#controllers/connection'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.resource('connection', Connection).apiOnly()
  router.put('connection/sync', [Connection, 'update'])
}).prefix('/api')
