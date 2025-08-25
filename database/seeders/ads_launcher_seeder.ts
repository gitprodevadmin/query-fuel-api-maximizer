import { BaseSeeder } from '@adonisjs/lucid/seeders'
import AdLauncherService from '#services/ad_launcher_service'

export default class AdsLauncherSeeder extends BaseSeeder {
    /**
     * Seeder entrypoint
     */
    public async run() {
        await (new AdLauncherService).syncAdLauncher()
    }
}
