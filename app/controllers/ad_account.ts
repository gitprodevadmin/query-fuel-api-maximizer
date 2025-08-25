// app/Controllers/Http/CampaignsController.ts
import AdAccount from '#models/ad_account'
import AdAccountService from '#services/ad_account_service'
import QueryService from '#services/common/query_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdAccountController {
  public async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const sort = request.input('sort') // e.g. -spend
    const search = request.input('search') // e.g. "summer"
    const filters = request.only([]) // allow filterable fields

    const adStats = await QueryService.get(
      AdAccount.query(),
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

  // GET /api/ad_accounts/:id
  public async show({ params, response }: HttpContext) {
    const adAccount = await QueryService.getOne(
      AdAccount.query(),
      { filters: { id: params.id } } // fetch by primary key
    )

    if (!adAccount) {
      return response.status(404).json({ message: 'Ad account not found' })
    }

    return adAccount
  }

  public async update({ response }: HttpContext) {
    await (new AdAccountService).syncAdAccounts()
    return response.ok({ message: 'Ad accounts synced successfully' })
  }
}
