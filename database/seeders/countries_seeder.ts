import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Country from '#models/country'
import axios from 'axios'
import env from '#start/env'

export default class CountrySeeder extends BaseSeeder {
    /**
     * Fetch country data from external API (with pagination if available)
     */
    private async getData() {
        const baseUrl = env.get('MAXIMIZER_API_BASE_URL') // e.g. https://rocket.maximizer.io/api/v1
        const token = env.get('MAXIMIZER_API_TOKEN')
        const endpoint = '/countries'
        const params = { filter: 'facebookKnown:eq:1' }

        let page = 1
        let allResults: any[] = []

        while (true) {
            const response = await axios.get(`${baseUrl}${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { ...params, page },
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
            console.log('⏳ Fetching countries...')
            const countries = await this.getData()

            if (countries.length === 0) {
                console.log('⚠️ No countries found')
                return
            }

            await Country.createMany(
                countries.map((item) => ({
                    code: item.code,                       // "AF"
                    name: item.name,                       // "Afghanistan"
                    defaultLanguage: item.defaultLanguage, // can be null
                    facebookKnown: item.facebookKnown,
                    taboolaKnown: item.taboolaKnown,
                    outbrainId: item.outbrainID,
                }))
            )

            console.log(`✅ Seeded ${countries.length} countries`)
        } catch (error) {
            console.error('❌ Country seeder failed:', error.message || error)
        }
    }
}
