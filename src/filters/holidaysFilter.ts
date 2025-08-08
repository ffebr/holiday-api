import { and, between, eq, gte, ilike, lte } from "drizzle-orm";
import { isAfter } from "date-fns";
import { selectHolidaysSchema, type HolidayRow, type SerchHolidayParams } from "../api/v1/holidays/schema";
import { holidays } from "../db/schema";
import { db } from "../db/dbconn";
import { HTTPException } from "hono/http-exception";


export const holidaysFilter = async (params : SerchHolidayParams): Promise<HolidayRow[]> => {
    const query = selectHolidaysSchema.parse(params);

    if (query.end && query.start && isAfter(query.start, query.end)) {
        throw new HTTPException(400, {message: "Дата начала не может быть позже даты окончания"});
    }
    if (query.date && query.start && isAfter(query.date, query.start)) {
        throw new HTTPException(400, {message: "Дата не может быть позже даты начала"});
    }
    if (query.date && query.end && isAfter(query.date, query.end)) {
        throw new HTTPException(400, {message: "Дата не может быть позже даты окончания"})
    }

    const searchHolidays = await db
        .select()
        .from(holidays)
        .where(and(
            query.id ? eq(holidays.id, query.id) : undefined,
            query.country ? ilike(holidays.country, `%${query.country}%`): undefined,
            query.date ? eq(holidays.date, query.date) : undefined,
            query.name ? ilike(holidays.name, `%${query.name}%`): undefined,
            query.start && query.end ? between(holidays.start, query.start, query.end) : undefined,
            query.start ? gte(holidays.start, query.start) : undefined,
            query.end ? lte(holidays.end, query.end) : undefined,
            query.type ? eq(holidays.type, query.type) : undefined,
            query.substitute ? eq(holidays.substitute, query.substitute) : undefined,
            query.rule ? ilike(holidays.rule, `%${query.rule}%`) : undefined,
            query.custom ? eq(holidays.custom, query.custom) : undefined,
            query.isDel ? eq(holidays.isDel, query.isDel) : eq(holidays.isDel, false),
        )) as HolidayRow[]

    return searchHolidays
}