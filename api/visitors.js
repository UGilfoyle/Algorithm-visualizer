const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function initDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS visitors (
                id SERIAL PRIMARY KEY,
                visitor_id VARCHAR(255) UNIQUE NOT NULL,
                device_type VARCHAR(50),
                device_os VARCHAR(100),
                device_browser VARCHAR(100),
                device_screen VARCHAR(50),
                country VARCHAR(100),
                city VARCHAR(100),
                latitude DECIMAL(10, 8),
                longitude DECIMAL(11, 8),
                location_method VARCHAR(20),
                first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                visit_count INTEGER DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_visitor_id ON visitors(visitor_id);
            CREATE INDEX IF NOT EXISTS idx_country ON visitors(country);
            CREATE INDEX IF NOT EXISTS idx_last_visit ON visitors(last_visit);
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS visit_logs (
                id SERIAL PRIMARY KEY,
                visitor_id VARCHAR(255) NOT NULL,
                visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                device_type VARCHAR(50),
                device_os VARCHAR(100),
                device_browser VARCHAR(100),
                country VARCHAR(100),
                city VARCHAR(100),
                FOREIGN KEY (visitor_id) REFERENCES visitors(visitor_id) ON DELETE CASCADE
            )
        `);

        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_visit_logs_visitor ON visit_logs(visitor_id);
            CREATE INDEX IF NOT EXISTS idx_visit_logs_time ON visit_logs(visit_time);
        `);
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

module.exports = async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    await initDatabase();

    try {
        if (req.method === 'POST') {
            const { visitorId, device, location } = req.body;

            if (!visitorId) {
                return res.status(400).json({ error: 'visitorId is required' });
            }

            const existingVisitor = await pool.query(
                'SELECT * FROM visitors WHERE visitor_id = $1',
                [visitorId]
            );

            if (existingVisitor.rows.length > 0) {
                await pool.query(
                    `UPDATE visitors 
                     SET last_visit = CURRENT_TIMESTAMP,
                         visit_count = visit_count + 1,
                         updated_at = CURRENT_TIMESTAMP,
                         device_type = COALESCE($1, device_type),
                         device_os = COALESCE($2, device_os),
                         device_browser = COALESCE($3, device_browser),
                         device_screen = COALESCE($4, device_screen),
                         country = COALESCE($5, country),
                         city = COALESCE($6, city),
                         latitude = COALESCE($7, latitude),
                         longitude = COALESCE($8, longitude),
                         location_method = COALESCE($9, location_method)
                     WHERE visitor_id = $10`,
                    [
                        device?.type || null,
                        device?.os || null,
                        device?.browser || null,
                        device?.screen || null,
                        location?.country || null,
                        location?.city || null,
                        location?.lat || null,
                        location?.lon || null,
                        location?.method || null,
                        visitorId
                    ]
                );
            } else {
                await pool.query(
                    `INSERT INTO visitors 
                     (visitor_id, device_type, device_os, device_browser, device_screen,
                      country, city, latitude, longitude, location_method, visit_count)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 1)`,
                    [
                        visitorId,
                        device?.type || null,
                        device?.os || null,
                        device?.browser || null,
                        device?.screen || null,
                        location?.country || null,
                        location?.city || null,
                        location?.lat || null,
                        location?.lon || null,
                        location?.method || null
                    ]
                );
            }

            await pool.query(
                `INSERT INTO visit_logs 
                 (visitor_id, device_type, device_os, device_browser, country, city)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    visitorId,
                    device?.type || null,
                    device?.os || null,
                    device?.browser || null,
                    location?.country || null,
                    location?.city || null
                ]
            );

            return res.status(200).json({ success: true });
        }

        if (req.method === 'GET') {
            const stats = await pool.query(`
                SELECT 
                    COUNT(DISTINCT visitor_id) as unique_visitors,
                    SUM(visit_count) as total_visits,
                    COUNT(*) as total_visitors
                FROM visitors
            `);

            const countryStats = await pool.query(`
                SELECT 
                    country,
                    COUNT(DISTINCT visitor_id) as unique_visitors,
                    SUM(visit_count) as total_visits
                FROM visitors
                WHERE country IS NOT NULL
                GROUP BY country
                ORDER BY unique_visitors DESC
                LIMIT 20
            `);

            const deviceStats = await pool.query(`
                SELECT 
                    device_type,
                    COUNT(DISTINCT visitor_id) as unique_visitors
                FROM visitors
                WHERE device_type IS NOT NULL
                GROUP BY device_type
                ORDER BY unique_visitors DESC
            `);

            const recentVisits = await pool.query(`
                SELECT 
                    visitor_id,
                    country,
                    city,
                    device_type,
                    device_os,
                    device_browser,
                    visit_count,
                    last_visit
                FROM visitors
                ORDER BY last_visit DESC
                LIMIT 50
            `);

            return res.status(200).json({
                stats: {
                    uniqueVisitors: parseInt(stats.rows[0]?.unique_visitors || 0),
                    totalVisits: parseInt(stats.rows[0]?.total_visits || 0),
                    totalVisitors: parseInt(stats.rows[0]?.total_visitors || 0)
                },
                countries: countryStats.rows,
                devices: deviceStats.rows,
                recentVisits: recentVisits.rows
            });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

