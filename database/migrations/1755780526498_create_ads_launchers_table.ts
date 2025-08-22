import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AdsLaunchers extends BaseSchema {
  protected tableName = 'ads_launchers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('ads_launcher_id').nullable() // API provides UUID
      table.string('name').nullable()
      table.string('query').nullable()
      table.string('ad_account_id').nullable()

      table.jsonb('countries').nullable().defaultTo('[]')
      table.jsonb('exclude_countries').nullable().defaultTo('[]')
      table.string('language').nullable()
      table.string('primary_language').nullable()
      table.string('provider').nullable()

      table.boolean('split_countries').nullable()
      table.boolean('worldwide').nullable()
      table.boolean('segment').nullable()

      table.jsonb('keywords').nullable().defaultTo('[]')
      table.jsonb('media_ids').nullable().defaultTo('[]')
      table.jsonb('titles').nullable().defaultTo('[]')
      table.jsonb('bodies').nullable().defaultTo('[]')

      table.string('status').nullable()
      table.bigInteger('created_ts').nullable()

      table.jsonb('facebook_data').nullable()
      table.jsonb('pixel').nullable()
      table.jsonb('campaign_names').nullable().defaultTo('[]')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
