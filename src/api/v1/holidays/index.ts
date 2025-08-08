import { Hono } from "hono";
import { postHolidays } from "./postHolidays";
import { getHolidays } from "./getHolidays";
import { searchHolidays } from "./searchHolidays";
import { patchHolidays } from "./patchHolidays";
import { deleteholidays } from "./deleteHolidays";

export const holidaysV1Router = new Hono()

holidaysV1Router.route("/holidays", postHolidays);
holidaysV1Router.route("/holidays", getHolidays);
holidaysV1Router.route("/holidays", searchHolidays);
holidaysV1Router.route("/holidays", patchHolidays);
holidaysV1Router.route("/holidays", deleteholidays);