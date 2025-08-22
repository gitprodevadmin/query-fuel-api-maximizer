import AdsLauncher from '#models/ads_launcher'
import QueryService from '#services/query_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdsLauncherController {
  public async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const sort = request.input('sort') // e.g. -spend
    const search = request.input('search') // e.g. "summer"
    const filters = request.only([]) // allow filterable fields

    const adStats = await QueryService.get(
      AdsLauncher.query(),
      {
        page,
        limit,
        sort,
        search,
        searchColumns: [],
        filters,
      }
    )

    return adStats
  }

  // GET /api/ads_launchers/:id
  public async show({ params, response }: HttpContext) {
    const adLauncher = await QueryService.getOne(
      AdsLauncher.query(),
      { filters: { id: params.id } }
    )

    if (!adLauncher) {
      return response.status(404).json({ message: 'Ads launcher not found' })
    }

    return adLauncher
  }
}
