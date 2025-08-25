import AdStats from '#models/ad_stat'
import env from '#start/env'
import axios from 'axios'
import { DateTime } from 'luxon'

export default class AdStatsService {
    private async getData(date: string) {
        const baseUrl = env.get('MAXIMIZER_API_BASE_URL')
        const endpoint = '/stats'
        const token = env.get('MAXIMIZER_API_TOKEN')

        let page = 1
        let allResults: any[] = []

        while (true) {
            const query = {
                sort: '-spend',
                dateStart: date,
                dateEnd: date,
                dimensions:
                    'date,month,weekday,hour,sourceProvider,adAccountID,adAccountName,' +
                    'campaignID,campaignName,campaignStatus,campaignDailyBudget,' +
                    'adsetID,adsetName,adsetStatus,adsetDailyBudget,adsetBidAmount,adsetBidStrategy,' +
                    'adID,adName,adStatus,query',
                metrics:
                    'impressions,clicks,spend,cpa,views,conversions,cr,rpc,rpm,revenue,profit,roi,cpc',
                page,
            }

            const response = await axios.get(`${baseUrl}${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: query,
            })

            const results = response.data.results
            if (!results || results.length === 0) break

            allResults = allResults.concat(results)
            page++
        }

        return allResults
    }

    public async syncAdStats() {
        try {
            let currentDate = DateTime.now()
            let totalSeeded = 0

            while (true) {
                const dateStr = currentDate.toISODate()
                console.log(`⏳ Processing ${dateStr}...`)

                // ✅ Step 1: check if this date already has records
                const existingCount = await AdStats.query()
                    .where('date', dateStr)
                    .count('* as total')

                if (Number(existingCount[0].$extras.total) > 0) {
                    console.log(`⚠️ Data already exists for ${dateStr}, skipping API call`)
                    // move backwards by 1 day
                    currentDate = currentDate.minus({ days: 1 })
                    continue
                }

                // ✅ Step 2: only call external API if no records exist
                const data = await this.getData(dateStr)
                if (data.length === 0) {
                    console.log(`⚠️ No results for ${dateStr}, stopping.`)
                    break
                }

                await AdStats.createMany(
                    data.map((item) => ({
                        // --- Date / Time ---
                        date: item.date,
                        month: item.month,
                        weekday: item.weekday,
                        hour: item.hour,

                        // --- Source / Account ---
                        sourceProvider: item.sourceProvider,
                        adAccountID: item.adAccountID,
                        adAccountName: item.adAccountName,

                        // --- Campaign ---
                        campaignID: item.campaignID,
                        campaignName: item.campaignName,
                        campaignStatus: item.campaignStatus,
                        campaignDailyBudget: item.campaignDailyBudget,

                        // --- Adset ---
                        adsetID: item.adsetID,
                        adsetName: item.adsetName,
                        adsetStatus: item.adsetStatus,
                        adsetDailyBudget: item.adsetDailyBudget,
                        adsetBidAmount: item.adsetBidAmount,
                        adsetBidStrategy: item.adsetBidStrategy,

                        // --- Ad ---
                        adID: item.adID,
                        adName: item.adName,
                        adStatus: item.adStatus,

                        // --- Query ---
                        query: item.query,

                        // --- Metrics ---
                        impressions: item.impressions,
                        clicks: item.clicks,
                        spend: item.spend,
                        cpc: item.cpc,
                        views: item.views,
                        vpc: item.vpc,
                        conversions: item.conversions,
                        cpa: item.cpa,
                        cr: item.cr,
                        rpc: item.rpc,
                        rpm: item.rpm,
                        revenue: item.revenue,
                        profit: item.profit,
                        roi: item.roi,
                    }))
                )

                console.log(`✅ Seeded ${data.length} new campaigns for ${dateStr}`)
                totalSeeded += data.length

                // move backwards by 1 day
                currentDate = currentDate.minus({ days: 1 })
            }

            console.log(`🎉 Done! Total new campaigns seeded: ${totalSeeded}`)
        } catch (error) {
            console.error('Seeder failed:', error)
        }
    }
}
