import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Connection extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare connectionId: string | null

  @column()
  declare name: string | null

  @column()
  declare provider: string | null

  @column({ columnName: 'external_id' })
  declare externalId: string | null

  @column({ columnName: 'external_name' })
  declare externalName: string | null

  @column({ columnName: 'incident_type' })
  declare incidentType: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
