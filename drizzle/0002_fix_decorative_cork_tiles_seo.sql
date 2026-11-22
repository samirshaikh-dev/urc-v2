-- Remove duplicated baked-in SEO/content copy from the DB-only decorative
-- cork tiles product. Derive its description from its own stored product copy.
UPDATE "products"
SET "seo_description" = left(trim(regexp_replace("description", '<[^>]*>', ' ', 'g')), 160),
    "introduction" = NULL,
    "features" = '[]'::jsonb,
    "applications" = '[]'::jsonb
WHERE "slug" = 'decorative-cork-tiles'
  AND "seo_description" = 'Textured natural cork tiles providing superior acoustic absorption, reverberation reduction, and organic warmth for modern interiors.';
