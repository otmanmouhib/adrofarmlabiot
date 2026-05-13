# Adro FarmLab IoT

A production-ready Next.js 14+ template for an IoT monitoring dashboard with admin authentication, mock sensor data, pump control, and mobile-first responsive styling.

## Features

- Landing page with feature highlights
- Admin login with NextAuth.js Credentials provider
- Protected dashboard at `/dashboard`
- Mock sensor API with realistic values refreshed every 5 seconds
- Pump control endpoint with persistent in-memory demo state
- Tailwind CSS mobile-first responsive design
- Chart.js temperature history visualization

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env.local
```

3. Generate a bcrypt password hash:

```bash
npm run hash-password -- "your-password"
```

4. Paste the generated hash into `ADMIN_PASSWORD_HASH` inside `.env.local`.

5. Run the app:

```bash
npm run dev
```

6. Open `http://localhost:3000`

## Environment Variables

Set these values in `.env.local`:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=<bcrypt hash>
NEXTAUTH_SECRET=<strong-random-string>
NEXTAUTH_URL=http://localhost:3000
```

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Add the same environment variables in the Vercel dashboard.
4. Deploy.

## Replacing Mock Data with Real IoT Endpoints

- `/app/api/sensors/route.ts` returns mock sensor values. Replace the mock logic with real MQTT, HTTP, or database queries.
- `/app/api/control/pump/route.ts` stores pump state in memory via `lib/dbMock.ts`. Replace the global map with a persistent database or real relay controller API.
- Use the same dashboard client logic to call your real backend endpoints.

## Notes

- This template uses a single admin user defined by `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH`.
- The `middleware.ts` file protects `/dashboard` and redirects unauthenticated users to `/login`.
- The dashboard client fetches sensor data and pump state on mount and every 5 seconds.
