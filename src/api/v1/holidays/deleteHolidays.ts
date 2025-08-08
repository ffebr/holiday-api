import { Hono } from "hono";
import { validator } from "hono/validator";
import { deleteholidayBody, deleteHolidayParams } from "./schema";
import { HTTPException } from "hono/http-exception";
import { db } from "../../../db/dbconn";
import { holidays } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { jwt } from "hono/jwt";

export const deleteholidays = new Hono();

deleteholidays.delete("/:id",
    jwt({ secret: process.env.JWT_SECRET! }),
    validator("param", (value, c) => {
        const parsed = deleteHolidayParams.safeParse(value);
        if (!parsed.success) {
            throw new HTTPException(400, {message: "Invalid"});
        };
        return parsed.data;
    }),
    validator("json", (value, c) => {
        const parsed = deleteholidayBody.safeParse(value);
        if (!parsed.success) {
            throw new HTTPException(400, {message: "Invalid"});
        };
        return parsed.data
    }),
    async (c) => {
        const { id } = c.req.valid("param");
        const { force } = c.req.valid("json");

        if (force) {
            const [deleted] = await db
                .delete(holidays)
                .where(eq(holidays.id, id))
                .returning();
            if (!deleted) {
                throw new HTTPException(404, { message: "Holiday not found or already deleted" });
            }

            return c.json({
                id: deleted.id,
                force: force
            })
        }

        if (!force) {
            const [deleted] = await db
                .update(holidays)
                .set({isDel: true})
                .where(eq(holidays.id, id))
                .returning();
        
            if (!deleted) {
                throw new HTTPException(404, { message: "Holiday not found or already deleted" });
            }

            return c.json({
                id: deleted.id,
                force: force
            })
        }
    }
)