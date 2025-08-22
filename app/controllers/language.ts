import Language from '#models/language'
import QueryService from '#services/query_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class LanguageController {
    public async index({ request }: HttpContext) {
        const page = request.input('page', 1)
        const limit = request.input('limit', 10)
        const sort = request.input('sort') // e.g. -spend
        const search = request.input('search') // e.g. "summer"
        const filters = request.only([]) // allow filterable fields

        const adStats = await QueryService.get(
            Language.query(),
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

    // GET /api/languages/:id
    public async show({ params, response }: HttpContext) {
        const language = await QueryService.getOne(
            Language.query(),
            { filters: { id: params.id } } // fetch by primary key
        )

        if (!language) {
            return response.status(404).json({ message: 'Language not found' })
        }

        return language
    }

}
