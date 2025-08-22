// app/Controllers/Http/CampaignsController.ts
import QueryService from '#services/query_service'
import type { HttpContext } from '@adonisjs/core/http'
import Connections from '#models/connection'

export default class Connection {
  public async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const sort = request.input('sort') // e.g. -spend
    const search = request.input('search') // e.g. "summer"
    const filters = request.only([]) // allow filterable fields

    const adStats = await QueryService.get(
      Connections.query(),
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

  // GET /api/connections/:id
  public async show({ params, response }: HttpContext) {
    const connection = await QueryService.getOne(
      Connections.query(),
      { filters: { id: params.id } } // filter by primary key
    )

    if (!connection) {
      return response.status(404).json({ message: 'Connection not found' })
    }

    return connection
  }

}
