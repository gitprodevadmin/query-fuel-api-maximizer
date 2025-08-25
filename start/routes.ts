/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// start/routes.ts
import router from '@adonisjs/core/services/router'
import './routes/ad_stats.js'
import "./routes/ad_account.js"
import "./routes/ad_launcher.js"
import "./routes/ad.js"
import "./routes/preset_ad_launcher.js"
import "./routes/country.js"
import "./routes/language.js"
import "./routes/preset_country.js"
import "./routes/connection.js"
import "./routes/media.js"
import AutoSwagger from 'adonis-autoswagger'
import swaggerConfig from '#config/swagger'

// All routes will be prefixed with /api
router.group(() => {
  // Health check
  router.get('/', async () => {
    return { message: 'API is running 🚀' }
  })
}).prefix('/api')

// Swagger JSON (YAML) spec endpoint
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swaggerConfig)
})

// Swagger UI endpoint
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swaggerConfig)
})




