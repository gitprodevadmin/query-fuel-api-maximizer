import AdStats from '#models/ad_stat'
import QueryService from '#services/query_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdStatsController {
  public async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const sort = request.input('sort') // e.g. -spend
    const search = request.input('search') // e.g. "summer"
    const filters = request.only(['campaignStatus', 'adAccountID']) // allow filterable fields

    const adStats = await QueryService.get(
      AdStats.query(),
      {
        page,
        limit,
        sort,
        search,
        searchColumns: ['campaignName', 'adsetName', 'adName'],
        filters,
      }
    )

    return adStats
  }

  // New show method
  public async show({ params, response }: HttpContext) {
    const record = await QueryService.getOne(
      AdStats.query(),
      { filters: { id: params.id } } // filter by primary key
    )

    if (!record) return response.status(404).json({ message: 'AdStat not found' })
    return record
  }
}
