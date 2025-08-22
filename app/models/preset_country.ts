import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PresetCountry extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare presetCountryId: string | null // UUID from API

  @column()
  declare name: string | null

  // ✅ JSON transformer for countries
  @column({
    prepare: (value: string[]) => JSON.stringify(value),   // before save
    consume: (value: any) => (value), // after fetch
  })
  declare countries: string[] | null  // stored as JSON array of country codes

  @column()
  declare default: boolean | null

  @column()
  declare provider: string | null

  @column()
  declare createdTs: number | null     // unix timestamp from API

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
