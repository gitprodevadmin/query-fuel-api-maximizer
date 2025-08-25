import { BaseSeeder } from '@adonisjs/lucid/seeders'
import LanguageService from '#services/language_service'

export default class LanguageSeeder extends BaseSeeder {
    /**
     * Seeder entrypoint
     */
    public async run() {
        await (new LanguageService).syncLanguages()
    }
}
