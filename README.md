# Western Premium website

Next.js App Router site for Western Premium Company Limited. All editable copy, contact details and
placeholder values live in `content/company.ts`. Values set to `null` render as visible `[TOKEN]`
placeholders, or the related link is omitted, until a confirmed value is supplied.

## Quotation form

The `/contact` form is validated with a single zod schema (`lib/quote.ts`) on both the client
(react-hook-form) and the server action (`app/contact/actions.ts`). On submit the server action:

1. Rejects the request if the hidden honeypot field is filled.
2. Applies a rate limit of 5 submissions per IP per hour.
3. Validates every field again with the shared schema.
4. Verifies the Cloudflare Turnstile token.
5. Checks the attachment type, size and file signature, then uploads it to Vercel Blob with private access.
6. Sends an internal notification to `company.enquiriesEmail` and an acknowledgement to the enquirer through Resend.
7. Returns `{ ok: true, reference }` or `{ ok: false, message }`.

The success panel is only shown when the server action returns `ok: true`.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `TURNSTILE_SECRET_KEY` | Yes | Server-side Turnstile verification. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes | Renders the invisible Turnstile widget. Comes from the same Turnstile site as the secret key. |
| `RESEND_API_KEY` | Yes | Sends the internal notification and the acknowledgement email. |
| `BLOB_READ_WRITE_TOKEN` | For attachments | Uploads attachments to a private Vercel Blob store. Added automatically when a Blob store is connected to the project. |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` | No | Shows the embedded map. Without it, only the "Open in Google Maps" link appears. |

When `TURNSTILE_SECRET_KEY` or `RESEND_API_KEY` is missing, the form shows a visible
"Form backend not configured" banner and submission is disabled. When `BLOB_READ_WRITE_TOKEN` is
missing, a banner appears and the attachment field is disabled. See `.env.example`.

### Before going live

- Verify the sender domain used in `company.formSender` in Resend.
- Confirm `company.enquiriesEmail` and `company.whatsappNumber` in `content/company.ts`.
- The rate limit is held in memory per server instance. For a strict limit across instances, move it
  to a shared store such as Upstash Redis.
- Attachments are private. Links in the internal email open only for users signed in to the Vercel team.

Personal data and attachment contents are never logged. Operational errors are logged in development only.
