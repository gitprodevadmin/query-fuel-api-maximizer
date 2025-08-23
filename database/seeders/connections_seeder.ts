import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Connection from '#models/connection'
import axios from 'axios'
import env from '#start/env'

export default class ConnectionSeeder extends BaseSeeder {
  /**
   * Fetch data from external API (with pagination)
   */
  private async getData() {
    const baseUrl = env.get('MAXIMIZER_API_BASE_URL')
    const token = env.get('MAXIMIZER_API_TOKEN')
    const endpoint = '/connections'
    const backendBaseUrl = env.get("BACKEND_BASE_URL")

    let page = 1
    let allResults: any[] = []
    let currentResult: any = await (await axios.get(`${backendBaseUrl}/api/connection`)).data.meta    

    while (true) {
      const response = await axios.get(`${baseUrl}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page },
      })

      const total = response.data.total
      if (total === currentResult?.total) {
        return allResults
      }

      await Connection.truncate(true)

      const results = response.data.results
      if (!results || results.length === 0) break

      allResults = allResults.concat(results)
      page++
    }

    return allResults
  }

  /**
   * Seeder entrypoint
   */
  public async run() {
    try {
      console.log('⏳ Fetching connections...')
      const connections = await this.getData()

      if (connections.length === 0) {
        console.log('⚠️ No connections found or data already seeded')
        return
      }

      await Connection.createMany(
        connections.map((item) => ({
          connectionId: item.id,        // API "id" → connection_id
          name: item.name,
          provider: item.provider,
          externalId: item.externalID,  // matches your model column
          externalName: item.externalName,
          incidentType: item.incidentType,
        }))
      )

      console.log(`✅ Seeded ${connections.length} connections`)
    } catch (error) {
      console.error('❌ Connection seeder failed:', error.message || error)
    }
  }
}
