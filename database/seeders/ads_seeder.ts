import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Ad from '#models/ads'
import axios from 'axios'
import env from '#start/env'

export default class AdSeeder extends BaseSeeder {
    /**
     * Fetch ads from external API (with pagination)
     */
    private async getData() {
        const baseUrl = env.get('MAXIMIZER_API_BASE_URL')   // e.g. https://rocket.maximizer.io/api/v1
        const token = env.get('MAXIMIZER_API_TOKEN')        // your bearer token
        const endpoint = '/ads'

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
            console.log('⏳ Fetching ads...')
            const ads = await this.getData()

            if (ads.length === 0) {
                console.log('⚠️ No ads found')
                return
            }

            for (const item of ads) {
                await Ad.updateOrCreate(
                    { adId: item.id }, // lookup condition
                    {
                        adId: item.id,
                        provider: item.provider,
                        providerName: item.providerName,
                        externalId: item.externalID ?? null,
                        externalAccountId: item.externalAccountID,
                        externalAccountName: item.externalAccountName,
                        title: item.title,
                        body: item.body,
                        query: item.query,
                        keywords: item.keywords ?? [],   // jsonb
                        mediaId: item.mediaID,
                        mimetype: item.mimetype,
                        thumbnailId: item.thumbnailID,
                        status: item.status,
                        createdTs: item.createdTS,
                        lastSeenTs: item.lastSeenTS,
                    }
                )
            }


            console.log(`✅ Seeded ${ads.length} ads`)
        } catch (error) {
            console.error('❌ Ad seeder failed:', error.message || error)
        }
    }
}
