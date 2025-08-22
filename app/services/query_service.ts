// app/Services/QueryService.ts
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

interface QueryOptions {
  page?: number
  limit?: number
  sort?: string
  search?: string
  searchColumns?: string[] // e.g. ['name', 'email']
  filters?: Record<string, any> // e.g. { status: 'active', role: 'admin' }
}

export default class QueryService {
  /**
   * Apply pagination, search, sorting, and filters to a query.
   */
  public static async get(
    query: ModelQueryBuilderContract<any, any>,
    options: QueryOptions = {}
  ) {
    const {
      page = 1,
      limit = 10,
      sort,
      search,
      searchColumns = [],
      filters = {},
    } = options

    // 🔍 Apply search
    if (search && searchColumns.length > 0) {
      query.where((builder) => {
        for (const col of searchColumns) {
          builder.orWhereILike(col, `%${search}%`) // case-insensitive LIKE
        }
      })
    }

    // 🎯 Apply filters
    Object.entries(filters).forEach(([field, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.where(field, value)
      }
    })

    // ↕️ Sorting
    if (sort) {
      const direction = sort.startsWith('-') ? 'desc' : 'asc'
      const column = sort.replace('-', '')
      query.orderBy(column, direction)
    }

    // 📄 Pagination
    const results = await query.paginate(page, limit)

    return results
  }

  public static async getOne(
    query: ModelQueryBuilderContract<any, any>,
    options: QueryOptions = {}
  ) {
    const { sort, search, searchColumns = [], filters = {} } = options

    // 🔍 Apply search
    if (search && searchColumns.length > 0) {
      query.where((builder) => {
        for (const col of searchColumns) {
          builder.orWhereILike(col, `%${search}%`)
        }
      })
    }

    // 🎯 Apply filters
    Object.entries(filters).forEach(([field, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.where(field, value)
      }
    })

    // ↕️ Sorting
    if (sort) {
      const direction = sort.startsWith('-') ? 'desc' : 'asc'
      const column = sort.replace('-', '')
      query.orderBy(column, direction)
    }

    // Fetch first record only
    const record = await query.first()

    return record
  }
}
