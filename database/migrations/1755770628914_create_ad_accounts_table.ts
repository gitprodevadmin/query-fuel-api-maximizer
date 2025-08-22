import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AdAccounts extends BaseSchema {
  protected tableName = 'ad_accounts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // auto-increment PK
      table.string('account_id').nullable()
      table.string('provider').nullable()
      table.string('provider_name').nullable()
      table.string('external_id').nullable()
      table.string('external_name').nullable()
      table.boolean('favorite').nullable()
      table.string('timezone').nullable()
      table.string('currency').nullable()
      table.string('status').nullable()
      table.string('service_token').nullable()
      table.string('incident_type').nullable()
      table.bigInteger('created_ts').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
