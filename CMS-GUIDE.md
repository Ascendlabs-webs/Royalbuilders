# Royal Builders CMS — Editor Guide (Sanity, Free plan)

## Open the Studio
- Local: `npm run dev` → http://localhost:3000/studio (log in with your Sanity account)
- Hosted (recommended): sanity.io/manage → your project → Studio

## Content types
| Type | Used on | Notes |
|---|---|---|
| Property Listing | `/real-estate`, `/crm` | `status=draft` hides it from the public site but keeps it in CRM |
| Blog / News Article | `/blog`, homepage strip | Needs `slug` (Generate from title) + Published Date |
| Service Page | service pages | Packages + FAQs; slug must be `construction`, `interiors`, `real-estate`, or `maintenance` |
| Site Settings | homepage hero + testimonials | Single document — edit, don't create a second one |
| Author | blog bylines | Create once, reference from posts |

## Publish flow
1. Edit → **Publish**. Public pages revalidate within ~1 hour, or instantly if the
   `/api/revalidate` webhook is configured (sanity.io/manage → API → Webhooks →
   `POST https://royal-builders.in/api/revalidate`, header
   `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`, body `{ "paths": ["/", "/real-estate", "/blog"] }`).
2. Verify on the live URL with a hard refresh (Ctrl+Shift+R).

## CRM notes
- `/crm` reads live CMS data and merges it with this browser's local drafts.
- Clicking Publish in CRM also POSTs to `/api/properties` — it reaches Sanity only
  after a dev sets `SANITY_API_WRITE_TOKEN` (Editor role) in Vercel env. Until then it saves locally.

## First-time setup (dev, one off)
1. `.env.local`: set `NEXT_PUBLIC_SANITY_PROJECT_ID` (+ tokens). Never commit it.
2. `npm run migrate:sanity` (dry run) → `npm run migrate:sanity -- --commit` to import
   current listings, services, testimonials and FAQs.
3. Vercel → Project Settings → Environment Variables: add the same keys for Production.
4. Sanity CORS allowlist: `https://royal-builders.in`, `https://*.vercel.app`, `http://localhost:3000`.
