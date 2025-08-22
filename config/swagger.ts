import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  path: __dirname + '/../',
  info: {
    title: 'Query Fuel API for Maximizer',
    version: '1.0.0',
    description: 'My Adonis API',
  },
  tagIndex: 2,
  snakeCase: true,
  ignore: ['/swagger', '/docs'],

  // Required `common` field with all necessary subfields
  common: {
    parameters: {
      page: {
        name: 'page',
        in: 'query',
        description: 'Page number for pagination',
        required: false,
        schema: {
          type: 'integer',
          default: 1,
          minimum: 1,
        },
      },
      limit: {
        name: 'limit',
        in: 'query',
        description: 'Number of items per page',
        required: false,
        schema: {
          type: 'integer',
          default: 10,
          minimum: 1,
        },
      },
    },
    responses: {},
    securitySchemes: {},
    headers: {},
  },

}
