require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function initDatabase() {
    try {
        console.log('Connecting to database...');
        
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
        console.log('✓ visitors table created/verified');

        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_visitor_id ON visitors(visitor_id);
            CREATE INDEX IF NOT EXISTS idx_country ON visitors(country);
            CREATE INDEX IF NOT EXISTS idx_last_visit ON visitors(last_visit);
        `);
        console.log('✓ Indexes created/verified');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS visit_logs (
                id SERIAL PRIMARY KEY,
                visitor_id VARCHAR(255) NOT NULL,
                visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                device_type VARCHAR(50),
                device_os VARCHAR(100),
                device_browser VARCHAR(100),
                country VARCHAR(100),
                city VARCHAR(100)
            )
        `);
        console.log('✓ visit_logs table created/verified');

        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_visit_logs_visitor ON visit_logs(visitor_id);
            CREATE INDEX IF NOT EXISTS idx_visit_logs_time ON visit_logs(visit_time);
        `);
        console.log('✓ visit_logs indexes created/verified');

        const result = await pool.query('SELECT COUNT(*) FROM visitors');
        console.log(`✓ Database initialized successfully. Current visitors: ${result.rows[0].count}`);

        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('✗ Database initialization error:', error);
        await pool.end();
        process.exit(1);
    }
}

initDatabase();

