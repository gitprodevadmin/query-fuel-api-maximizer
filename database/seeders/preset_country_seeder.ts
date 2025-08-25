import { BaseSeeder } from '@adonisjs/lucid/seeders'
import PresetCountryService from '#services/preset_country_service'

export default class PresetCountrySeeder extends BaseSeeder {
    /**
     * Seeder entrypoint
     */
    public async run() {
        await (new PresetCountryService).syncCounrties()
    }
}
