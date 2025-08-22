import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AdsLauncher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare adsLauncherId: string | null
  @column()
  declare name: string | null

  @column()
  declare query: string | null

  @column()
  declare adAccountId: string | null

  @column()
  declare countries: string[] | null

  @column({
    prepare: (val: string[]) => JSON.stringify(val),
    consume: (val: any) => (val),
  })
  declare excludeCountries: string[] | null

  @column()
  declare language: string | null

  @column()
  declare primaryLanguage: string | null

  @column()
  declare provider: string | null

  @column()
  declare splitCountries: boolean | null

  @column()
  declare worldwide: boolean | null

  @column()
  declare segment: boolean | null

  @column({
    prepare: (val: string[]) => JSON.stringify(val),
    consume: (val: any) => (val),
  })
  declare keywords: string[] | null

  @column({
    columnName: 'media_ids',   // 👈 matches your migration
    prepare: (val: string[]) => JSON.stringify(val),
    consume: (val: any) => (val),
  })
  declare mediaIDs: string[] | null

  @column({
    prepare: (val: string[]) => JSON.stringify(val),
    consume: (val: any) => (val),
  })
  declare titles: string[] | null

  @column({
    prepare: (val: string[]) => JSON.stringify(val),
    consume: (val: any) => (val),
  })
  declare bodies: string[] | null

  @column()
  declare status: string | null

  @column()
  declare createdTs: number

  // facebookData (nullable JSON)
  @column({
    prepare: (val: any) => (val ? JSON.stringify(val) : null),
    consume: (val: any) => (val),
  })
  declare facebookData: any | null

  // pixel (JSON object)
  @column({
    prepare: (val: any) => (val ? JSON.stringify(val) : null),
    consume: (val: any) => (val),
  })
  declare pixel: any | null

  @column({
    prepare: (val: string[]) => JSON.stringify(val),
    consume: (val: any) => (val),
  })
  declare campaignNames: string[] | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
