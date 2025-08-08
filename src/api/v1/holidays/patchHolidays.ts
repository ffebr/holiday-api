import { Hono } from "hono";
import { validator } from "hono/validator";
import { patchHolidayParams, updateHolidaySchema } from "./schema";
import { HTTPException } from "hono/http-exception";
import { jwt } from "hono/jwt";
import { db } from "../../../db/dbconn";
import { holidays } from "../../../db/schema";
import { eq } from "drizzle-orm";

export const patchHolidays = new Hono();

patchHolidays.patch("/:id",
    jwt({ secret: process.env.JWT_SECRET! }),
    validator("param", (value, c) => {
        const parsed = patchHolidayParams.safeParse(value);
        if (!parsed.success) {
            throw new HTTPException(400, {message: "Invalid"});
        }
        return parsed.data;
    }),
    validator("json", (value, c) => {
        const parsed = updateHolidaySchema.safeParse(value);
        if (!parsed.success) {
            throw new HTTPException(400, {message: "Invalid"});
        }
        return parsed.data;
    }),
    
    async (c) => {
        const { id } = c.req.valid("param");
        const body = c.req.valid("json");

        const [exist] = await db
            .select()
            .from(holidays)
            .where(eq(holidays.id, id));
        
        if (!exist) {
            throw new HTTPException(404, {message: "Not found"});
        }

        const [res] = await db
            .update(holidays)
            .set({
                country: body.country,
                start: body.start ? new Date(body.start): undefined,
                end: body.end ? new Date(body.end): undefined,
                date: body.date,
                name: body.name,
                type: body.type,
                substitute: body.substitute,
                rule: body.rule,
                custom: true,
                isDel: false,
            })
            .where(eq(holidays.id, id))
            .returning()
        
        return c.json({
            holiday: res
        }, 200)
    }

)