// app/Controllers/Http/CampaignsController.ts
import PresetCountry from '#models/preset_country'
import QueryService from '#services/common/query_service'
import PresetCountryService from '#services/preset_country_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class PresetCountryController {
  public async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const sort = request.input('sort') // e.g. -spend
    const search = request.input('search') // e.g. "summer"
    const filters = request.only([]) // allow filterable fields

    const adStats = await QueryService.get(
      PresetCountry.query(),
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

  // GET /api/preset_countries/:id
  public async show({ params, response }: HttpContext) {
    const presetCountry = await QueryService.getOne(
      PresetCountry.query(),
      { filters: { id: params.id } } // fetch by primary key
    )

    if (!presetCountry) {
      return response.status(404).json({ message: 'Preset Country not found' })
    }

    return presetCountry
  }

  public async update({ response }: HttpContext) {
    await (new PresetCountryService).syncCounrties()
    return response.ok({ message: 'Countries synced successfully' })
  }

}
