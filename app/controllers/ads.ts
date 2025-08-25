// app/Controllers/Http/CampaignsController.ts
import Ad from '#models/ads'
import AdService from '#services/ad_service'
import QueryService from '#services/common/query_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdsController {
  public async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const sort = request.input('sort') // e.g. -spend
    const search = request.input('search') // e.g. "summer"
    const filters = request.only([]) // allow filterable fields

    const adStats = await QueryService.get(
      Ad.query(),
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

  // GET /api/ads/:id
  public async show({ params, response }: HttpContext) {
    const ad = await QueryService.getOne(
      Ad.query(),
      { filters: { id: params.id } }
    )

    if (!ad) {
      return response.status(404).json({ message: 'Ad not found' })
    }

    return ad
  }

  public async update({ response }: HttpContext) {
    await (new AdService).syncAds()
    return response.ok({ message: 'Ads synced successfully' })
  }

}
