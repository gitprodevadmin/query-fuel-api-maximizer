import router from '@adonisjs/core/services/router'
const AdStatsController = () => import('#controllers/ad_stats')

router.group(() => {
  router.resource('ad_stats', AdStatsController).apiOnly()
}).prefix('/api')
