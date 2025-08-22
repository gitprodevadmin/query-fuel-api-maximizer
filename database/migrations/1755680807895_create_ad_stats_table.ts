import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AdStats extends BaseSchema {
  protected tableName = 'ad_stats'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      // --- Date / Time ---
      table.date('date').nullable()
      table.string('month').nullable()
      table.string('weekday').nullable()
      table.string('hour').nullable()
      // --- Source / Account ---
      table.string('source_provider').nullable()
      table.string('ad_account_id').nullable()
      table.string('ad_account_name').nullable()

      // --- Campaign ---
      table.string('campaign_id').nullable()
      table.string('campaign_name').nullable()
      table.string('campaign_status').nullable()
      table.decimal('campaign_daily_budget', 14, 2).nullable()

      // --- Adset ---
      table.string('adset_id').nullable()
      table.string('adset_name').nullable()
      table.string('adset_status').nullable()
      table.decimal('adset_daily_budget', 14, 2).nullable()
      table.decimal('adset_bid_amount', 14, 2).nullable()
      table.string('adset_bid_strategy').nullable()

      // --- Ad ---
      table.string('ad_id').nullable()
      table.string('ad_name').nullable()
      table.string('ad_status').nullable()

      // --- Query ---
      table.text('query').nullable()

      // --- Metrics ---
      table.decimal('impressions', 14, 2).nullable()
      table.decimal('clicks', 14, 2).nullable()
      table.decimal('spend', 14, 2).nullable()
      table.decimal('cpc', 14, 2).nullable()
      table.decimal('views').nullable()
      table.decimal('vpc', 14, 2).nullable()
      table.decimal('conversions', 14, 2).nullable()
      table.decimal('cpa', 14, 4).nullable()
      table.decimal('cr', 14, 4).nullable()
      table.decimal('rpc', 14, 4).nullable()
      table.decimal('rpm', 14, 4).nullable()
      table.decimal('revenue', 14, 2).nullable()
      table.decimal('profit', 14, 2).nullable()
      table.decimal('roi', 14, 4).nullable()

      // --- Timestamps ---
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
