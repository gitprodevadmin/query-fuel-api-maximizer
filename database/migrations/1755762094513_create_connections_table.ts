import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Connections extends BaseSchema {
  protected tableName = 'connections'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // auto-increment PK
      table.string('connection_id').nullable()
      table.string('name').nullable()
      table.string('provider').nullable()
      table.string('external_id').nullable()
      table.string('external_name').nullable()
      table.string('incident_type').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
