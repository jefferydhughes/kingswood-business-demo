import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_slug" AS ENUM('about', 'academics', 'admissions', 'student-life');
  CREATE TYPE "public"."enum__pages_v_version_slug" AS ENUM('about', 'academics', 'admissions', 'student-life');
  CREATE TABLE "pages_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"internal_label" varchar,
  	"internal_href" varchar,
  	"internal_cta" varchar,
  	"external_label" varchar,
  	"external_href" varchar,
  	"external_cta" varchar
  );
  
  CREATE TABLE "_pages_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"internal_label" varchar,
  	"internal_href" varchar,
  	"internal_cta" varchar,
  	"external_label" varchar,
  	"external_href" varchar,
  	"external_cta" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_seo_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_seo_image_id_media_id_fk";
  
  DROP INDEX "pages_seo_seo_image_idx";
  DROP INDEX "_pages_v_version_seo_version_seo_image_idx";
  ALTER TABLE "pages" ALTER COLUMN "slug" SET DATA TYPE "public"."enum_pages_slug" USING "slug"::"public"."enum_pages_slug";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_slug" SET DATA TYPE "public"."enum__pages_v_version_slug" USING "version_slug"::"public"."enum__pages_v_version_slug";
  ALTER TABLE "pages" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages" ADD COLUMN "introduction" varchar;
  ALTER TABLE "pages" ADD COLUMN "heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_primary_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_primary_href" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_primary_cta" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_secondary_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_secondary_href" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_secondary_cta" varchar;
  ALTER TABLE "pages" ADD COLUMN "next_step_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "next_step_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "next_step_primary_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "next_step_primary_href" varchar;
  ALTER TABLE "pages" ADD COLUMN "next_step_primary_cta" varchar;
  ALTER TABLE "pages" ADD COLUMN "next_step_external_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "next_step_external_href" varchar;
  ALTER TABLE "pages" ADD COLUMN "next_step_external_cta" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_eyebrow" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_introduction" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_primary_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_primary_href" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_primary_cta" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_secondary_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_secondary_href" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_secondary_cta" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_next_step_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_next_step_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_next_step_primary_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_next_step_primary_href" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_next_step_primary_cta" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_next_step_external_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_next_step_external_href" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_next_step_external_cta" varchar;
  ALTER TABLE "pages_sections" ADD CONSTRAINT "pages_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_sections" ADD CONSTRAINT "_pages_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_sections_order_idx" ON "pages_sections" USING btree ("_order");
  CREATE INDEX "pages_sections_parent_id_idx" ON "pages_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_sections_order_idx" ON "_pages_v_version_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_version_sections_parent_id_idx" ON "_pages_v_version_sections" USING btree ("_parent_id");
  ALTER TABLE "pages" DROP COLUMN "summary";
  ALTER TABLE "pages" DROP COLUMN "content";
  ALTER TABLE "pages" DROP COLUMN "seo_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_summary";
  ALTER TABLE "_pages_v" DROP COLUMN "version_content";
  ALTER TABLE "_pages_v" DROP COLUMN "version_seo_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_sections" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_sections" CASCADE;
  DROP TABLE "_pages_v_version_sections" CASCADE;
  ALTER TABLE "pages" ALTER COLUMN "slug" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_slug" SET DATA TYPE varchar;
  ALTER TABLE "pages" ADD COLUMN "summary" varchar;
  ALTER TABLE "pages" ADD COLUMN "content" jsonb;
  ALTER TABLE "pages" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_summary" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_seo_image_id" integer;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages" USING btree ("seo_image_id");
  CREATE INDEX "_pages_v_version_seo_version_seo_image_idx" ON "_pages_v" USING btree ("version_seo_image_id");
  ALTER TABLE "pages" DROP COLUMN "eyebrow";
  ALTER TABLE "pages" DROP COLUMN "introduction";
  ALTER TABLE "pages" DROP COLUMN "heading";
  ALTER TABLE "pages" DROP COLUMN "hero_primary_label";
  ALTER TABLE "pages" DROP COLUMN "hero_primary_href";
  ALTER TABLE "pages" DROP COLUMN "hero_primary_cta";
  ALTER TABLE "pages" DROP COLUMN "hero_secondary_label";
  ALTER TABLE "pages" DROP COLUMN "hero_secondary_href";
  ALTER TABLE "pages" DROP COLUMN "hero_secondary_cta";
  ALTER TABLE "pages" DROP COLUMN "next_step_title";
  ALTER TABLE "pages" DROP COLUMN "next_step_description";
  ALTER TABLE "pages" DROP COLUMN "next_step_primary_label";
  ALTER TABLE "pages" DROP COLUMN "next_step_primary_href";
  ALTER TABLE "pages" DROP COLUMN "next_step_primary_cta";
  ALTER TABLE "pages" DROP COLUMN "next_step_external_label";
  ALTER TABLE "pages" DROP COLUMN "next_step_external_href";
  ALTER TABLE "pages" DROP COLUMN "next_step_external_cta";
  ALTER TABLE "_pages_v" DROP COLUMN "version_eyebrow";
  ALTER TABLE "_pages_v" DROP COLUMN "version_introduction";
  ALTER TABLE "_pages_v" DROP COLUMN "version_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_primary_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_primary_href";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_primary_cta";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_secondary_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_secondary_href";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_secondary_cta";
  ALTER TABLE "_pages_v" DROP COLUMN "version_next_step_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_next_step_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_next_step_primary_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_next_step_primary_href";
  ALTER TABLE "_pages_v" DROP COLUMN "version_next_step_primary_cta";
  ALTER TABLE "_pages_v" DROP COLUMN "version_next_step_external_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_next_step_external_href";
  ALTER TABLE "_pages_v" DROP COLUMN "version_next_step_external_cta";
  DROP TYPE "public"."enum_pages_slug";
  DROP TYPE "public"."enum__pages_v_version_slug";`)
}
