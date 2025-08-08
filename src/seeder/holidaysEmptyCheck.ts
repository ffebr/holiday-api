import { db } from "../db/dbconn"
import { holidays } from "../db/schema"

const holidaysemptyCheck = async (): Promise<boolean> => {
    const res = await db
        .select({id: holidays.id})
        .from(holidays)
        .limit(1);
    return res.length === 0; 
}

const main = async () => {
    try {
        const empty = await holidaysemptyCheck();
        console.log(empty ? "1" : "0");
        process.exit(0);
    } catch (error) {
        console.error("Empty check err: ", error);
        process.exit(1);
    }
}

main();