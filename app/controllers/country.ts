// app/Controllers/Http/CampaignsController.ts
import Country from '#models/country'
import QueryService from '#services/query_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class CountryController {
  public async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const sort = request.input('sort') // e.g. -spend
    const search = request.input('search') // e.g. "summer"
    const filters = request.only([]) // allow filterable fields

    const adStats = await QueryService.get(
      Country.query(),
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

  // GET /api/countries/:id
  public async show({ params, response }: HttpContext) {
    const country = await QueryService.getOne(
      Country.query(),
      { filters: { id: params.id } } // fetch by primary key
    )

    if (!country) {
      return response.status(404).json({ message: 'Country not found' })
    }

    return country
  }

}
