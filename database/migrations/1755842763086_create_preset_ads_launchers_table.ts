import { BaseSchema } from '@adonisjs/lucid/schema'

export default class PresetAdsLauncher extends BaseSchema {
  protected tableName = 'preset_ads_launchers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('account_id').nullable() // "id" from API
      table.string('name').nullable()
      table.string('request_scheme').nullable()
      table.string('campaign_scheme').nullable()
      table.string('adset_scheme').nullable()
      table.string('ad_account_id').nullable() // "act_2591429801052365"
      table.string('pixel_id').nullable()
      table.string('provider').nullable()
      table.boolean('default').nullable()
      table.bigInteger('created_ts').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
