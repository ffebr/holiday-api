import { Hono } from "hono";
import { validator } from 'hono/validator'
import { authShcema } from "./schema";
import { db } from "../../../db/dbconn";
import { users } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { HTTPException } from 'hono/http-exception'
import { sign } from 'hono/jwt'

export const authV1Router = new Hono()

authV1Router.post(
    "/register", 
    validator("json", (value, c) => {
        const parsed = authShcema.safeParse(value);
        if (!parsed.success) {
            throw new HTTPException(401, {message: "Invalid"})
        }
        return parsed.data
    }),
    async (c) => {
        const { email, password } = c.req.valid("json");

        const passwordHash = await Bun.password.hash(password);
        const [exist] = await db
            .select()
            .from(users)
            .where(eq(users.email, email));
        if( !exist ) {
            throw new HTTPException(409, {message: "Такой пользователь существует"});
        }
        
        const res = await db
            .insert(users)
            .values({
                email: email,
                password: passwordHash
            }).returning()

        return c.json({
            id: res[0]?.id,
            email: res[0]?.email
        },200)
    }
)

authV1Router.post(
    "login",
    validator("json", (value, c) => {
        const parsed = authShcema.safeParse(value);
        if (!parsed.success) {
            throw new HTTPException(400, {message: "Invalid"});
        }
        return parsed.data;
    }),
    async (c) => {
        const { email, password } = c.req.valid("json");

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email));
        if(!users || user === undefined) {
            throw new HTTPException(401, {message: "Неправильный email или пароль"});
        }

        if(!(await Bun.password.verify(password, user.password))) {
            throw new HTTPException(401, {message: "Неправильный email или пароль"});
        }

        const token = await sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET!,
        )

        return c.json(
            {
                token: token,
                id: user.id
            }, 200
        )
    }
)