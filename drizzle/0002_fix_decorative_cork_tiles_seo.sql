-- Remove duplicated baked-in SEO/content copy from the DB-only decorative
-- cork tiles product. Use copy verified in its own stored product description.
UPDATE "products"
SET "seo_description" = 'Sound-dampening natural cork wall tiles with tactile texture, biophilic elegance, and acoustic reverberation control for offices, boardrooms, and studios.',
    "introduction" = 'Sound-dampening natural cork wall tiles with tactile texture, biophilic elegance, and acoustic reverberation control for offices, boardrooms, and studios.',
    "features" = '["Effective acoustic absorption (NRC 0.25 to 0.45) dampening voice reverberation","Self-healing fine-grain texture closes naturally after pin removal","Hypoallergenic, anti-static surface that naturally repels airborne dust","Available in natural sanded, bevelled, and geometric embossed textures"]'::jsonb,
    "applications" = '["Corporate Boardrooms & Conference Rooms","Listening Studios & Home Theaters","Hotel Lobbies & Executive Suites","Educational Classrooms & Libraries"]'::jsonb
WHERE "slug" = 'decorative-cork-tiles'
  AND "seo_description" = 'Textured natural cork tiles providing superior acoustic absorption, reverberation reduction, and organic warmth for modern interiors.';
