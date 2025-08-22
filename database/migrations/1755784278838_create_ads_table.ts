import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Ads extends BaseSchema {
  protected tableName = 'ads'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // internal auto id
      table.string('ad_id').nullable()

      table.string('provider').nullable()
      table.string('provider_name').nullable()
      table.string('external_id').nullable()
      table.string('external_account_id').nullable()
      table.string('external_account_name').nullable()

      table.text('title').nullable()
      table.text('body').nullable()
      table.text('query').nullable()

      table.jsonb('keywords').nullable().defaultTo('[]')
      table.string('media_id').nullable()
      table.string('mimetype').nullable()
      table.string('thumbnail_id').nullable()

      table.string('status').nullable()

      table.bigInteger('created_ts').notNullable()
      table.bigInteger('last_seen_ts').nullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
