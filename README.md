# NILSCA — Next.js (Vercel-ready)

Nigeria Licensed Ship Chandlers Association website + admin, rebuilt for **Next.js** so it can deploy on Vercel.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- JSON data in `/data` (members, content, executives, applications, inquiries)
- Cookie admin auth (`ADMIN_PASSWORD` + `ADMIN_SECRET`)

## Local

```bash
npm install
cp .env.example .env.local   # set ADMIN_PASSWORD
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin/login  

## Vercel

1. Import https://github.com/DaUnderlord/Nigeria-Licensed-Ship-Chandlers-Association  
2. Framework: Next.js (auto)  
3. Env vars: `ADMIN_PASSWORD`, `ADMIN_SECRET` (long random string)  
4. Deploy  

**Note on admin writes:** Serverless filesystems on Vercel are not durable. Public pages and seeded data work. For admin edits / form submissions to persist in production, add a database (e.g. Supabase — ~$10/mo on this org, or a free Neon/Turso plan). Locally and on a Node VPS, JSON writes work as-is.

## Legacy PHP

Previous shared-hosting PHP build is preserved under `legacy-php/` for reference.
