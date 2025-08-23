import { BaseSeeder } from '@adonisjs/lucid/seeders'
import PresetCountry from '#models/preset_country'
import axios from 'axios'
import env from '#start/env'

export default class PresetCountrySeeder extends BaseSeeder {
    /**
     * Fetch data from external API (with pagination)
     */
    private async getData() {
        const baseUrl = env.get('MAXIMIZER_API_BASE_URL')
        const token = env.get('MAXIMIZER_API_TOKEN')
        const endpoint = '/presets/countries'
        const backendBaseUrl = env.get("BACKEND_BASE_URL")

        let page = 1
        let allResults: any[] = []
        let currentResult: any = await (await axios.get(`${backendBaseUrl}/api/preset_countries`)).data.meta

        while (true) {
            const response = await axios.get(`${baseUrl}${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, sort: '-createdTS' },
            })

            const total = response.data.total
            if (total === currentResult?.total) {
                return allResults
            }

            await PresetCountry.truncate(true)

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
            console.log('⏳ Fetching preset countries...')
            const presetCountries = await this.getData()

            if (presetCountries.length === 0) {
                console.log('⚠️ No preset countries found or data already seeded')
                return
            }

            await PresetCountry.createMany(
                presetCountries.map((item) => ({
                    presetCountryId: item.id,                   // UUID
                    name: item.name,
                    countries: item.countries ?? [],     // array of codes
                    default: item.default ?? false,
                    provider: item.provider,
                    createdTs: item.createdTS,
                }))
            )

            console.log(`✅ Seeded ${presetCountries.length} preset countries`)
        } catch (error) {
            console.error('❌ PresetCountry seeder failed:', error.message || error)
        }
    }
}
