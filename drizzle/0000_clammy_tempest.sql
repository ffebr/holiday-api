CREATE TABLE "holidays" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "holidays_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"country" text NOT NULL,
	"date" text NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"substitute" boolean DEFAULT false,
	"rule" text,
	"custom" boolean DEFAULT false,
	"isDel" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
