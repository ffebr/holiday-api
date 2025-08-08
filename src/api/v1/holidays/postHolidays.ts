import { Hono } from "hono";
import { jwt, type JwtVariables } from "hono/jwt";
import { validator } from "hono/validator";
import { insertHolidaySchema } from "./schema";
import { HTTPException } from "hono/http-exception";
import { holidays } from "../../../db/schema";
import { db } from "../../../db/dbconn";
type Variables = JwtVariables

export const postHolidays = new Hono<{ Variables: Variables }>()

postHolidays.post("/", 
    jwt({ secret: process.env.JWT_SECRET! }),
    validator("json", (value, c) => {
        const parsed = insertHolidaySchema.safeParse(value);
        if (!parsed.success) {
            throw new HTTPException(400, {message: "Invalid"});
        }
        return parsed.data;
    }),
    async (c) => {
        const body = c.req.valid("json");

        const [res] = await db
            .insert(holidays)
            .values({
                country: body.country,
                start: new Date(body.start),
                end: new Date(body.end),
                date: body.date,
                name: body.name,
                type: body.type,
                substitute: body.substitute ? body.substitute : undefined,
                rule: body.rule ? body.rule : undefined,
                custom: true,
                isDel: false,
            }).returning();
        
        return c.json(
            {
                holiday: res,
            }, 200
        );
    }
)