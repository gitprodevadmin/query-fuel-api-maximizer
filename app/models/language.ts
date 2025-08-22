import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Language extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string | null

  @column()
  declare name: string | null

  @column({ columnName: 'facebook_id' })
  declare facebookId: string | null

  @column({ columnName: 'outbrain_known' })
  declare outbrainKnown: boolean | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
