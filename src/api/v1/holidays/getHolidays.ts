import { Hono } from "hono";
import { validator } from "hono/validator";
import { getHolidayQuerySchema } from "./schema";
import { HTTPException } from "hono/http-exception";
import { holidaysFilter } from "../../../filters/holidaysFilter";

export const getHolidays = new Hono()

getHolidays.get("/",
    validator("query", (value, c) => {
        const parsed = getHolidayQuerySchema.safeParse(value);
        if (!parsed.success) {
            throw new HTTPException(400, {message: "Invalid"});
        }
        return parsed.data
    }),
    async (c) => {
        const query = c.req.valid("query");

        const res = await holidaysFilter(query);
        return c.json({
            holidays: res
        }, 200)
    }
)