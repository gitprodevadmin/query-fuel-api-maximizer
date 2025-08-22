import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Countries extends BaseSchema {
  protected tableName = 'countries'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('code').nullable()     // "AF"
      table.string('name').nullable()             // "Afghanistan"
      table.string('default_language').nullable()     // null or a language code
      table.boolean('facebook_known').nullable()
      table.boolean('taboola_known').nullable()
      table.string('outbrain_id').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
