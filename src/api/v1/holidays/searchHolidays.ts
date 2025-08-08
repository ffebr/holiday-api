import { Hono } from "hono";
import { validator } from "hono/validator";
import { selectHolidaysSchema } from "./schema";
import { HTTPException } from "hono/http-exception";
import { holidaysFilter } from "../../../filters/holidaysFilter";

export const searchHolidays = new Hono()

searchHolidays.post("/search",
    validator("json", (value, c) => {
        const parsed = selectHolidaysSchema.safeParse(value);
        if (!parsed.success) {
            throw new HTTPException(400, {message: "Invalid"});
        }
        return parsed.data
    }),
    async (c) => {
        const body = c.req.valid("json");
        const res = await holidaysFilter(body);

        return c.json({
            holidays: res
        }, 200)
    }
)