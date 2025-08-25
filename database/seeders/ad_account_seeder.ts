import { BaseSeeder } from '@adonisjs/lucid/seeders'
import AdAccountService from '#services/ad_account_service'

export default class AdAccountSeeder extends BaseSeeder {
    /**
     * Seeder entrypoint
     */
    public async run() {
        await (new AdAccountService).syncAdAccounts()
    }
}
