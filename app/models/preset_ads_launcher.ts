import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PresetAdsLauncher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accountId: string | null   // "id" from API

  @column()
  declare name: string | null

  @column()
  declare requestScheme: string | null

  @column()
  declare campaignScheme: string | null

  @column()
  declare adsetScheme: string | null

  @column()
  declare adAccountId: string | null   // "act_2591429801052365"

  @column()
  declare pixelId: string | null

  @column()
  declare provider: string | null

  @column()
  declare default: boolean | null

  @column()
  declare createdTs: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
