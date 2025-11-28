# Database Setup Instructions

## 1. Environment Variables

Add your Neon database URL to Vercel environment variables:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add a new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://neondb_owner:npg_5nharwiOFD6Y@ep-shiny-recipe-a1wx8koz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
   - **Environment**: Production, Preview, Development

## 2. Database Schema

The API will automatically create the following tables on first request:

### `visitors` table
- Stores unique visitor information
- Tracks device, location, and visit statistics
- Auto-increments visit count

### `visit_logs` table
- Logs every visit with timestamp
- Links to visitors table
- Useful for detailed analytics

## 3. Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
DATABASE_URL=your_neon_database_url_here
```

3. Run Vercel dev server:
```bash
npm run dev
```

## 4. Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variable in Vercel dashboard (see step 1)

## 5. API Endpoints

### POST `/api/visitors`
Stores visitor data in database
- Body: `{ visitorId, device, location }`

### GET `/api/visitors`
Retrieves visitor statistics
- Returns: stats, countries, devices, recent visits

## Security Notes

- Database credentials are stored in Vercel environment variables (not in code)
- API endpoints are serverless functions (server-side only)
- Client-side code never sees database credentials

