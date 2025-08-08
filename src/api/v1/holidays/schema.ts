import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { holidays } from "../../../db/schema";
import z from "zod";
import type { InferSelectModel } from "drizzle-orm";

export const selectHolidaysSchema = createSelectSchema(holidays, {
    start: z.coerce.date(),
    end: z.coerce.date(),
    }
).partial().strict();
export const insertHolidaySchema = createInsertSchema(holidays, {
    start: z.coerce.date(),
    end: z.coerce.date(),
});
export const updateHolidaySchema = createUpdateSchema(holidays, {
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
}).partial()

export type HolidayRow = InferSelectModel<typeof holidays>;
export type SerchHolidayParams = z.infer<typeof selectHolidaysSchema>;
export type patchHolidayParams = z.infer<typeof updateHolidaySchema>;

export const getHolidayQuerySchema = z.object({
    id: z.coerce.number().positive().optional(),
    country: z.coerce.string().optional(),
    name: z.coerce.string().optional(),
    date: z.string().optional(),
}).strict()

export const patchHolidayParams = z.object({
    id: z.coerce.number().positive(),
})

export const deleteHolidayParams = z.object({
    id: z.coerce.number().positive(),
})

export const deleteholidayBody = z.object({
    force: z.coerce.boolean().default(false),
})