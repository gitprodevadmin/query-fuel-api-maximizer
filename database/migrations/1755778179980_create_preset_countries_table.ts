import { BaseSchema } from '@adonisjs/lucid/schema'

export default class PresetCountries extends BaseSchema {
  protected tableName = 'preset_countries'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()                  
      table.string('preset_country_id').nullable() // API provides UUID
      table.string('name').nullable()
      table.jsonb('countries').defaultTo([]).nullable()      // ["US","GB","CA",...]
      table.boolean('default').nullable()
      table.string('provider').nullable()
      table.bigInteger('created_ts').nullable() // unix timestamp
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
