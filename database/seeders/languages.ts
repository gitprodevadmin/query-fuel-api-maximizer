import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Language from '#models/language'
import axios from 'axios'
import env from '#start/env'

export default class LanguageSeeder extends BaseSeeder {
    /**
     * Fetch data from external API
     */
    private async getData() {
        const baseUrl = env.get('MAXIMIZER_API_BASE_URL')
        const token = env.get('MAXIMIZER_API_TOKEN')
        const endpoint = '/languages'

        const response = await axios.get(`${baseUrl}${endpoint}`, {
            headers: { Authorization: `Bearer ${token}` },
        })

        return response.data.results || []
    }

    /**
     * Seeder entrypoint
     */
    public async run() {
        try {
            console.log('⏳ Fetching languages...')
            const languages = await this.getData()

            if (languages.length === 0) {
                console.log('⚠️ No languages found')
                return
            }

            await Language.createMany(
                languages.map((item: { code: string; name: string; facebookID: string; outbrainKnown: string }) => ({
                    code: item.code,                          // e.g. "sq"
                    name: item.name,                          // e.g. "Albanian"
                    facebookId: item.facebookID ?? null,      // maps → facebook_id
                    outbrainKnown: item.outbrainKnown ?? false, // maps → outbrain_known
                }))
            )

            console.log(`✅ Seeded ${languages.length} languages`)
        } catch (error) {
            console.error('❌ Language seeder failed:', error.message || error)
        }
    }
}
