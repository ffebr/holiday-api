import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity().primaryKey(),
    email: varchar({length: 255}).unique().notNull(),
    password: varchar({length:255}).notNull(),
})

export const holidays = pgTable('holidays', {
  id: integer().primaryKey().generatedAlwaysAsIdentity().primaryKey(),
  country: text().notNull(),
  date: text().notNull(),
  start: timestamp({mode: "date"}).notNull(),
  end: timestamp(({mode: "date"})).notNull(),
  name: text().notNull(),
  type: text({enum: ["public", "bank", "school", "optional", "observance"]}).notNull(),
  substitute: boolean().default(false),
  rule: text(),
  custom: boolean().default(false),
  isDel: boolean().default(false),
});