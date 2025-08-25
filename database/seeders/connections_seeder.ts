import ConnectionService from '#services/connection_service'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class ConnectionSeeder extends BaseSeeder {
  /**
   * Seeder entrypoint
   */
  public async run() {
    await (new ConnectionService)
      .syncConnection()
  }
}
