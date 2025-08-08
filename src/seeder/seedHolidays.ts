import z from "zod";
import { getHolidaysForYears } from "./getHolidays";
import { parseArgs } from "util";
import { IANA } from "./IANA";
import { holidays } from "../db/schema";
import { db } from "../db/dbconn";
import { insertHolidaySchema } from "../api/v1/holidays/schema";

const seedSchema = z.object({
  from: z.coerce.number().min(1900).max(2100).default(2025),
  to:   z.coerce.number().min(1900).max(2100).default(2030),
  country: z.enum(IANA).default("RU"),
});

const { values } = parseArgs({
    args: Bun.argv.slice(2),
    options: {
        from: {type: "string"},
        to: {type: "string"},
        country: { type: 'string' },
    },
    strict: true
})

const arrayRange = (from: number, to: number, step: number = 1): number[] => {
    return Array.from({length: (to - from) / step + 1}, (_, index) => from + index * step);
}

const seedHolidays = async (from: number, to: number, country: string): Promise<void> => {
    try {
        const years = arrayRange(from, to);
        const rawHolidays = getHolidaysForYears(years, country);

        const parsed = rawHolidays
            .map(h => insertHolidaySchema.safeParse(h))
            .filter(r => {
                if (!r.success) console.warn("invalid:", r.error);
                return r.success;
            })
            .map(r => r.data);

        if (parsed.length > 0) {
            await db.insert(holidays).values(parsed);
            console.log(`Inserted ${parsed.length} holidays`);
        } else {
            console.warn("No valid holidays to insert");
        }
    } catch (error) {
        console.error("Seed error: ", error);
        throw error;
    }
}


const runSeedCMD = async () =>{
    try {
        const {from, to, country} = seedSchema.parse(values);
        if (from > to) {
            console.log("Seeder failed: from > to");
            process.exit(1);
        }
        await seedHolidays(from, to, country);
        console.log("Seeder completed successfully");
        process.exit(0);
    } catch (error) {
        console.error("Seeder failed:", error);
        process.exit(1);
    }
}

runSeedCMD();