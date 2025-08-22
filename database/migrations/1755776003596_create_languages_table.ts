import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Languages extends BaseSchema {
  protected tableName = 'languages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()        // auto increment PK
      table.string('code').nullable() // e.g. "sq"
      table.string('name').nullable()    // e.g. "Albanian"
      table.integer('facebook_id').nullable() // e.g. 87
      table.boolean('outbrain_known').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
