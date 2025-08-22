import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Country extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string | null  // e.g. "AF"

  @column()
  declare name: string | null  // e.g. "Afghanistan"

  @column()
  declare defaultLanguage: string | null  // can be null

  @column()
  declare facebookKnown: boolean | null

  @column()
  declare taboolaKnown: boolean | null

  @column()
  declare outbrainId: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
