// app/Controllers/Http/CampaignsController.ts
import PresetAdsLauncher from '#models/preset_ads_launcher'
import QueryService from '#services/query_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class PresetAdLauncherController {
  public async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const sort = request.input('sort') // e.g. -spend
    const search = request.input('search') // e.g. "summer"
    const filters = request.only([]) // allow filterable fields

    const adStats = await QueryService.get(
      PresetAdsLauncher.query(),
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

  // GET /api/preset_ads_launchers/:id
  public async show({ params, response }: HttpContext) {
    const presetLauncher = await QueryService.getOne(
      PresetAdsLauncher.query(),
      { filters: { id: params.id } } // fetch by primary key
    )

    if (!presetLauncher) {
      return response.status(404).json({ message: 'Preset Ads Launcher not found' })
    }

    return presetLauncher
  }

}
