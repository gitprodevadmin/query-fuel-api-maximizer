import AdStatsService from '#services/ad_stats_service'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class AdStatsSeeder extends BaseSeeder {
  /**
   * Seeder entrypoint
   */
  public async run() {
    await (new AdStatsService).syncAdStats()
  }
}
