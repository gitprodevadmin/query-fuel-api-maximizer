import { BaseSeeder } from '@adonisjs/lucid/seeders'
import AdAccount from '#models/ad_account'
import axios from 'axios'
import env from '#start/env'

export default class AdAccountSeeder extends BaseSeeder {
    /**
     * Fetch data from external API (with pagination)
     */
    private async getData() {
        const baseUrl = env.get('MAXIMIZER_API_BASE_URL')
        const token = env.get('MAXIMIZER_API_TOKEN')
        const endpoint = '/adaccounts'

        let page = 1
        let allResults: any[] = []

        while (true) {
            const response = await axios.get(`${baseUrl}${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, sort: '-createdTS' },
            })

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
            console.log('⏳ Fetching ad accounts...')
            const adAccounts = await this.getData()

            if (adAccounts.length === 0) {
                console.log('⚠️ No ad accounts found')
                return
            }

            await AdAccount.createMany(
                adAccounts.map((item) => ({
                    accountId: item.id,            // maps to uuid in your table
                    provider: item.provider,
                    providerName: item.providerName,
                    externalId: item.externalID,
                    externalName: item.externalName,
                    favorite: item.favorite ?? false,
                    timezone: item.timezone,
                    currency: item.currency,
                    status: item.status,
                    serviceToken: item.serviceToken,
                    incidentType: item.incidentType,
                    createdTs: item.createdTS,
                }))
            )

            console.log(`✅ Seeded ${adAccounts.length} ad accounts`)
        } catch (error) {
            console.error('❌ AdAccount seeder failed:', error.message || error)
        }
    }
}
