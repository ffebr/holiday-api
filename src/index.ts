import { Hono } from 'hono'
import { authV1Router } from './api/v1/auth/auth';
import { postHolidays } from './api/v1/holidays/postHolidays';
import { holidaysV1Router } from './api/v1/holidays';
import { docsV1 } from './api/v1/docsV1';

const app = new Hono();

app.get('/', (c) => c.text('im alive!'));

//api V1
app.route("/api/v1", authV1Router);
app.route("/api/v1", holidaysV1Router);
app.route("/api/v1", docsV1);


export default {
    port: process.env.PORT || 3000,
    fetch: app.fetch
}
