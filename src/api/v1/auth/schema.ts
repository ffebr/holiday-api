import { z } from "zod";

export const authShcema = z.object({
    email: z.email(),
    password: z.string().min(8)
});