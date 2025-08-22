import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AdStats extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // --- Date / Time ---
  @column()
  declare date: string

  @column()
  declare month: string

  @column()
  declare weekday: string

  @column()
  declare hour: string

  // --- Source / Account ---
  @column()
  declare sourceProvider: string

  @column()
  declare adAccountID: string

  @column()
  declare adAccountName: string

  // --- Campaign ---
  @column()
  declare campaignID: string

  @column()
  declare campaignName: string

  @column()
  declare campaignStatus: string

  @column()
  declare campaignDailyBudget: string

  // --- Adset ---
  @column()
  declare adsetID: string

  @column()
  declare adsetName: string

  @column()
  declare adsetStatus: string

  @column()
  declare adsetDailyBudget: string

  @column()
  declare adsetBidAmount: string

  @column()
  declare adsetBidStrategy: string

  // --- Ad ---
  @column()
  declare adID: string

  @column()
  declare adName: string

  @column()
  declare adStatus: string

  // --- Query ---
  @column()
  declare query: string

  // --- Metrics ---
  @column()
  declare impressions: string

  @column()
  declare clicks: string

  @column()
  declare spend: string

  @column()
  declare cpc: string

  @column()
  declare views: string

  @column()
  declare vpc: string

  @column()
  declare conversions: string

  @column()
  declare cpa: string

  @column()
  declare cr: string

  @column()
  declare rpc: string

  @column()
  declare rpm: string

  @column()
  declare revenue: string

  @column()
  declare profit: string

  @column()
  declare roi: string

  // --- Timestamps ---
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
