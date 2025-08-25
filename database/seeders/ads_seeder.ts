import { BaseSeeder } from '@adonisjs/lucid/seeders'
import AdService from '#services/ad_service'

export default class AdSeeder extends BaseSeeder {
    /**
     * Seeder entrypoint
     */
    public async run() {
        await (new AdService).syncAds()
    }
}
