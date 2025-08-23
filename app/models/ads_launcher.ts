import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

/**
 * Helper: safely stringify values for Postgres JSON columns
 */
function prepareJSON(val: any) {
  if (val === null || val === undefined) return null
  if (typeof val === 'string') return val // already stringified
  return JSON.stringify(val)              // stringify arrays/objects
}

/**
 * Helper: safely parse values when consuming
 */
function consumeJSON(val: any) {
  if (val === null) return null
  try {
    return typeof val === 'string' ? JSON.parse(val) : val
  } catch {
    return val
  }
}

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

  @column({
    prepare: prepareJSON,
    consume: consumeJSON,
  })
  declare countries: string[] | null

  @column({
    prepare: prepareJSON,
    consume: consumeJSON,
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
    prepare: prepareJSON,
    consume: consumeJSON,
  })
  declare keywords: string[] | null

  @column({
    columnName: 'media_ids',
    prepare: prepareJSON,
    consume: consumeJSON,
  })
  declare mediaIDs: string[] | null

  @column({
    prepare: prepareJSON,
    consume: consumeJSON,
  })
  declare titles: string[] | null

  @column({
    prepare: prepareJSON,
    consume: consumeJSON,
  })
  declare bodies: string[] | null

  @column()
  declare status: string | null

  @column()
  declare createdTs: number

  @column({
    prepare: prepareJSON,
    consume: consumeJSON,
  })
  declare facebookData: any | null

  @column({
    prepare: prepareJSON,
    consume: consumeJSON,
  })
  declare pixel: any | null

  @column({
    prepare: prepareJSON,
    consume: consumeJSON,
  })
  declare campaignNames: string[] | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
