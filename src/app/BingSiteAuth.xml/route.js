import { getBingVerificationCode } from "@/lib/seo";

export async function GET() {
  const code = getBingVerificationCode();
  if (!code) {
    return new Response("Bing Webmaster verification code not configured", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const xml = `<?xml version="1.0"?>
<users>
\t<user>${code}</user>
</users>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
