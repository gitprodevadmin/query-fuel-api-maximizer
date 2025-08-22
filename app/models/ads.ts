import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Ad extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare adId: string | null

  @column()
  declare provider: string | null

  @column()
  declare providerName: string | null

  @column()
  declare externalId: string | null

  @column()
  declare externalAccountId: string | null

  @column()
  declare externalAccountName: string | null

  @column()
  declare title: string | null

  @column()
  declare body: string | null

  @column()
  declare query: string | null

  @column()
  declare keywords: string[] | null  // stored as JSONB

  @column()
  declare mediaId: string | null

  @column()
  declare mimetype: string | null

  @column()
  declare thumbnailId: string | null

  @column()
  declare status: string | null

  @column()
  declare createdTs: number | null

  @column()
  declare lastSeenTs: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
