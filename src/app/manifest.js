import { SITE_CONFIG } from "@/lib/constants";

export default function manifest() {
  return {
    name: SITE_CONFIG.name,
    short_name: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFB",
    theme_color: "#650510",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/united-rubber-cork-logo.png",
        sizes: "1774x887",
        type: "image/png",
      },
    ],
  };
}

