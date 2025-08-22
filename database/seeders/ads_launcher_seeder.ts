import { BaseSeeder } from '@adonisjs/lucid/seeders'
import AdsLauncher from '#models/ads_launcher'
import axios from 'axios'
import env from '#start/env'

export default class AdsLauncherSeeder extends BaseSeeder {
    /**
     * Fetch data from external API (with pagination)
     */
    private async getData() {
        const baseUrl = env.get('MAXIMIZER_API_BASE_URL')
        const token = env.get('MAXIMIZER_API_TOKEN')
        const endpoint = '/adlauncher'

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
            console.log('⏳ Fetching ads launchers...')
            const adLaunchers = await this.getData()

            if (adLaunchers.length === 0) {
                console.log('⚠️ No ads launchers found')
                return
            }

            await AdsLauncher.createMany(
                adLaunchers.map((item) => ({
                    adsLauncherId: item.id, // UUID from API
                    name: item.name,
                    query: item.query,
                    adAccountId: item.adAccountID,

                    countries: item.countries ?? [],
                    excludeCountries: item.excludeCountries ?? [],
                    language: item.language,
                    primaryLanguage: item.primaryLanguage ?? null,
                    provider: item.provider,

                    splitCountries: item.splitCountries ?? false,
                    worldwide: item.worldwide ?? false,
                    segment: item.segment ?? false,

                    keywords: item.keywords ?? [],
                    mediaIDs: item.mediaIDs ?? [],
                    titles: item.titles ?? [],
                    bodies: item.bodies ?? [],

                    status: item.status,
                    createdTs: item.createdTS,

                    facebookData: item.facebookData ?? null,
                    pixel: item.pixel ?? null,
                    campaignNames: item.campaignNames ?? [],
                }))
            )

            console.log(`✅ Seeded ${adLaunchers.length} ads launchers`)
        } catch (error) {
            console.error('❌ AdsLauncher seeder failed:', error.message || error)
        }
    }
}
