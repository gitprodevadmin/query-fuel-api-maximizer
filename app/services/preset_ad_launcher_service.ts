import PresetAdsLauncher from '#models/preset_ads_launcher'
import env from '#start/env'
import axios from "axios"

export default class PresetAdLauncherService {
    /**
       * Fetch data from external API (with pagination)
       */
    private async getData() {
        const baseUrl = env.get('MAXIMIZER_API_BASE_URL')
        const token = env.get('MAXIMIZER_API_TOKEN')
        const endpoint = '/presets/adlauncher'
        const backendBaseUrl = env.get("BACKEND_BASE_URL")

        let page = 1
        let allResults: any[] = []
        let currentResult: any = await (await axios.get(`${backendBaseUrl}/api/preset_ad_launcher`)).data.meta

        while (true) {
            const response = await axios.get(`${baseUrl}${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, sort: '-createdTS' },
            })

            const total = response.data.total
            if (total === currentResult?.total) {
                return allResults
            }

            await PresetAdsLauncher.truncate(true)

            const results = response.data.results
            if (!results || results.length === 0) break

            allResults = allResults.concat(results)
            page++
        }

        return allResults
    }

    public async syncPresetAdLauncher() {
        try {
            console.log('⏳ Fetching preset ads launchers...')
            const launchers = await this.getData()

            if (launchers.length === 0) {
                console.log('⚠️ No preset ads launchers found or data already seeded')
                return
            }

            await PresetAdsLauncher.createMany(
                launchers.map((item) => ({
                    accountId: item.id,               // API "id"
                    name: item.name,
                    requestScheme: item.requestScheme,
                    campaignScheme: item.campaignScheme,
                    adsetScheme: item.adsetScheme,
                    adAccountId: item.adAccountID,    // maps "act_..." from API
                    pixelId: item.pixelID,
                    provider: item.provider,
                    default: item.default ?? false,
                    createdTs: item.createdTS,
                }))
            )

            console.log(`✅ Seeded ${launchers.length} preset ads launchers`)
        } catch (error) {
            console.error('❌ PresetAdsLauncher seeder failed:', error.message || error)
        }
    }
}