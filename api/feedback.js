const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

let dbInitialized = false;

async function initDatabase() {
    if (dbInitialized) return;
    
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS feedback (
                id SERIAL PRIMARY KEY,
                visitor_id VARCHAR(255),
                rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
                comment TEXT,
                device_type VARCHAR(50),
                device_os VARCHAR(100),
                device_browser VARCHAR(100),
                country VARCHAR(100),
                city VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_feedback_visitor ON feedback(visitor_id);
            CREATE INDEX IF NOT EXISTS idx_feedback_rating ON feedback(rating);
            CREATE INDEX IF NOT EXISTS idx_feedback_created ON feedback(created_at);
        `);

        dbInitialized = true;
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

function validateInput(data) {
    const rating = parseInt(data.rating);
    if (!rating || rating < 1 || rating > 5) {
        return { valid: false, error: 'Rating must be between 1 and 5' };
    }
    
    if (data.comment && typeof data.comment === 'string' && data.comment.length > 5000) {
        return { valid: false, error: 'Comment too long (max 5000 characters)' };
    }
    
    if (data.visitor_id && typeof data.visitor_id === 'string' && data.visitor_id.length > 255) {
        return { valid: false, error: 'Invalid visitor ID' };
    }
    
    return { valid: true };
}

module.exports = async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    await initDatabase();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'POST') {
        try {
            const { rating, comment, visitor_id, device, location } = req.body;

            const validation = validateInput({
                rating,
                comment: comment || '',
                visitor_id: visitor_id || ''
            });

            if (!validation.valid) {
                return res.status(400).json({ error: validation.error });
            }

            let deviceType = null;
            let deviceOS = null;
            let deviceBrowser = null;
            let country = null;
            let city = null;

            if (visitor_id) {
                try {
                    const visitorResult = await pool.query(
                        'SELECT device_type, device_os, device_browser, country, city FROM visitors WHERE visitor_id = $1',
                        [visitor_id]
                    );

                    if (visitorResult.rows.length > 0) {
                        const visitor = visitorResult.rows[0];
                        deviceType = visitor.device_type;
                        deviceOS = visitor.device_os;
                        deviceBrowser = visitor.device_browser;
                        country = visitor.country;
                        city = visitor.city;
                    }
                } catch (e) {
                }
            }

            if (!deviceType && device?.type && typeof device.type === 'string' && device.type.length <= 50) {
                deviceType = device.type;
            }
            if (!deviceOS && device?.os && typeof device.os === 'string' && device.os.length <= 100) {
                deviceOS = device.os;
            }
            if (!deviceBrowser && device?.browser && typeof device.browser === 'string' && device.browser.length <= 100) {
                deviceBrowser = device.browser;
            }
            if (!country && location?.country && typeof location.country === 'string' && location.country.length <= 100) {
                country = location.country;
            }
            if (!city && location?.city && typeof location.city === 'string' && location.city.length <= 100) {
                city = location.city;
            }

            await pool.query(
                `INSERT INTO feedback (visitor_id, rating, comment, device_type, device_os, device_browser, country, city)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [visitor_id || null, rating, comment || null, deviceType, deviceOS, deviceBrowser, country, city]
            );

            return res.status(200).json({ success: true, message: 'Feedback submitted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to submit feedback' });
        }
    }

    if (req.method === 'GET') {
        try {
            const result = await pool.query(`
                SELECT 
                    COUNT(*) as total_feedback,
                    AVG(rating) as avg_rating,
                    COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star,
                    COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star,
                    COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star,
                    COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star,
                    COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star
                FROM feedback
            `);

            return res.status(200).json({ success: true, stats: result.rows[0] });
        } catch (error) {
            console.error('Feedback stats error:', error);
            return res.status(500).json({ error: 'Failed to fetch feedback stats' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};

