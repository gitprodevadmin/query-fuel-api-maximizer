import { BaseSeeder } from '@adonisjs/lucid/seeders'
import CountryService from '#services/country_service'

export default class CountrySeeder extends BaseSeeder {
    /**
     * Seeder entrypoint
     */
    public async run() {
        await (new CountryService).syncCountries()
    }
}
