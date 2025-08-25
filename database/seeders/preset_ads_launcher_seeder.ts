import PresetAdLauncherService from '#services/preset_ad_launcher_service'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class PresetAdsLauncherSeeder extends BaseSeeder {
  /**
   * Seeder entrypoint
   */
  public async run() {
    await (new PresetAdLauncherService).syncPresetAdLauncher()
  }
}
