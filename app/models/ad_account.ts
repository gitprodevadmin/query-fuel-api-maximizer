import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AdAccount extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accountId: string

  @column()
  declare provider: string

  @column()
  declare providerName: string

  @column()
  declare externalId: string

  @column()
  declare externalName: string

  @column()
  declare favorite: boolean

  @column()
  declare timezone: string

  @column()
  declare currency: string

  @column()
  declare status: string

  @column()
  declare serviceToken: string | null

  @column()
  declare incidentType: string | null

  @column()
  declare createdTs: number

  @column()
  declare connectionId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
