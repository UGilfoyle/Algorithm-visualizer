(function () {
    const VISITOR_KEY = 'algo_visitor_id';
    const VISIT_COUNT_KEY = 'algo_visit_count';
    const UNIQUE_VISITORS_KEY = 'algo_unique_visitors';
    const LAST_VISIT_KEY = 'algo_last_visit';
    const DEVICE_INFO_KEY = 'algo_device_info';
    const LOCATION_INFO_KEY = 'algo_location_info';
    const VISITORS_DATA_KEY = 'algo_visitors_data';

    function generateVisitorId() {
        return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    function detectDevice() {
        const ua = navigator.userAgent;
        const screen = window.screen;

        let deviceType = 'Desktop';
        let os = 'Unknown';
        let browser = 'Unknown';

        if (/tablet|ipad|playbook|silk/i.test(ua)) {
            deviceType = 'Tablet';
        } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) {
            deviceType = 'Mobile';
        }

        if (/windows/i.test(ua)) os = 'Windows';
        else if (/mac/i.test(ua)) os = 'macOS';
        else if (/linux/i.test(ua)) os = 'Linux';
        else if (/android/i.test(ua)) os = 'Android';
        else if (/ios|iphone|ipad|ipod/i.test(ua)) os = 'iOS';
        else if (/ubuntu/i.test(ua)) os = 'Ubuntu';
        else if (/fedora/i.test(ua)) os = 'Fedora';

        if (/edg/i.test(ua)) browser = 'Edge';
        else if (/chrome/i.test(ua) && !/edg/i.test(ua)) browser = 'Chrome';
        else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
        else if (/firefox/i.test(ua)) browser = 'Firefox';
        else if (/opera|opr/i.test(ua)) browser = 'Opera';
        else if (/brave/i.test(ua)) browser = 'Brave';

        return {
            type: deviceType,
            os: os,
            browser: browser,
            screen: `${screen.width}x${screen.height}`,
            userAgent: ua
        };
    }

    async function getLocation() {
        let locationData = {
            country: 'Unknown',
            city: 'Unknown',
            lat: null,
            lon: null,
            method: 'ip'
        };

        const ipServices = [
            {
                url: 'https://ipapi.co/json/',
                parse: (data) => ({
                    country: data.country_name,
                    city: data.city,
                    lat: data.latitude,
                    lon: data.longitude,
                    region: data.region,
                    postal: data.postal
                })
            },
            {
                url: 'https://ip-api.com/json/',
                parse: (data) => ({
                    country: data.country,
                    city: data.city,
                    lat: data.lat,
                    lon: data.lon,
                    region: data.regionName,
                    postal: data.zip
                })
            },
            {
                url: 'https://api.ipgeolocation.io/ipgeo?apiKey=free',
                parse: (data) => ({
                    country: data.country_name,
                    city: data.city,
                    lat: parseFloat(data.latitude),
                    lon: parseFloat(data.longitude),
                    region: data.state_prov,
                    postal: data.zipcode
                })
            },
            {
                url: 'https://ipwho.is/',
                parse: (data) => ({
                    country: data.country,
                    city: data.city,
                    lat: data.latitude,
                    lon: data.longitude,
                    region: data.region,
                    postal: data.postal
                })
            }
        ];

        for (const service of ipServices) {
            try {
                const response = await fetch(service.url, {
                    signal: AbortSignal.timeout(3000)
                });
                if (!response.ok) continue;
                
                const data = await response.json();
                const parsed = service.parse(data);
                
                if (parsed.country && parsed.country !== 'Unknown') {
                    locationData.country = parsed.country;
                    if (parsed.city) locationData.city = parsed.city;
                    if (parsed.lat && !isNaN(parsed.lat)) locationData.lat = parsed.lat;
                    if (parsed.lon && !isNaN(parsed.lon)) locationData.lon = parsed.lon;
                    break;
                }
            } catch (e) {
                continue;
            }
        }

        return locationData;
    }

    function getVisitorId() {
        let visitorId = localStorage.getItem(VISITOR_KEY);
        if (!visitorId) {
            visitorId = generateVisitorId();
            localStorage.setItem(VISITOR_KEY, visitorId);

            let uniqueVisitors = parseInt(localStorage.getItem(UNIQUE_VISITORS_KEY) || '0');
            uniqueVisitors++;
            localStorage.setItem(UNIQUE_VISITORS_KEY, uniqueVisitors.toString());
        }
        return visitorId;
    }

    function saveVisitorData(visitorId, deviceInfo, locationInfo) {
        try {
            let visitorsData = JSON.parse(localStorage.getItem(VISITORS_DATA_KEY) || '[]');

            const existingVisitor = visitorsData.find(v => v.id === visitorId);
            const visitorData = {
                id: visitorId,
                device: deviceInfo,
                location: locationInfo,
                firstVisit: existingVisitor ? existingVisitor.firstVisit : new Date().toISOString(),
                lastVisit: new Date().toISOString(),
                visitCount: existingVisitor ? existingVisitor.visitCount + 1 : 1
            };

            if (existingVisitor) {
                const index = visitorsData.findIndex(v => v.id === visitorId);
                visitorsData[index] = visitorData;
            } else {
                visitorsData.push(visitorData);
            }

            localStorage.setItem(VISITORS_DATA_KEY, JSON.stringify(visitorsData));
            localStorage.setItem(DEVICE_INFO_KEY, JSON.stringify(deviceInfo));
            localStorage.setItem(LOCATION_INFO_KEY, JSON.stringify(locationInfo));
        } catch (e) {
        }
    }

    async function sendToDatabase(visitorId, deviceInfo, locationInfo) {
        try {
            const apiUrl = window.location.origin.includes('localhost')
                ? 'http://localhost:3000/api/visitors'
                : '/api/visitors';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    visitorId: visitorId,
                    device: deviceInfo,
                    location: locationInfo
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send data to database');
            }

            return await response.json();
        } catch (error) {
            return null;
        }
    }

    async function fetchStatsFromDatabase() {
        try {
            const apiUrl = window.location.origin.includes('localhost')
                ? 'http://localhost:3000/api/visitors'
                : '/api/visitors';

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch stats from database');
            }

            return await response.json();
        } catch (error) {
            return null;
        }
    }

    async function trackVisit() {
        const visitorId = getVisitorId();
        const now = Date.now();
        const lastVisit = parseInt(localStorage.getItem(LAST_VISIT_KEY) || '0');

        let visitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0');

        const deviceInfo = detectDevice();
        const locationInfo = await getLocation();

        saveVisitorData(visitorId, deviceInfo, locationInfo);

        if (now - lastVisit > 30000) {
            visitCount++;
            localStorage.setItem(VISIT_COUNT_KEY, visitCount.toString());
            localStorage.setItem(LAST_VISIT_KEY, now.toString());

            await sendToDatabase(visitorId, deviceInfo, locationInfo);
        }

        const dbStats = await fetchStatsFromDatabase();
        const localStats = {
            totalVisits: visitCount,
            uniqueVisitors: parseInt(localStorage.getItem(UNIQUE_VISITORS_KEY) || '0'),
            visitorId: visitorId,
            device: deviceInfo,
            location: locationInfo
        };

        return dbStats ? { ...localStats, dbStats } : localStats;
    }

    async function getStats() {
        const deviceInfo = JSON.parse(localStorage.getItem(DEVICE_INFO_KEY) || '{}');
        const locationInfo = JSON.parse(localStorage.getItem(LOCATION_INFO_KEY) || '{}');

        const dbStats = await fetchStatsFromDatabase();

        const localStats = {
            totalVisits: parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0'),
            uniqueVisitors: parseInt(localStorage.getItem(UNIQUE_VISITORS_KEY) || '0'),
            device: deviceInfo,
            location: locationInfo
        };

        if (dbStats && dbStats.stats) {
            return {
                ...localStats,
                dbStats: dbStats.stats,
                countries: dbStats.countries,
                devices: dbStats.devices
            };
        }

        return localStats;
    }

    function getAllVisitors() {
        try {
            return JSON.parse(localStorage.getItem(VISITORS_DATA_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    window.VisitorTracker = {
        track: trackVisit,
        getStats: getStats,
        getAllVisitors: getAllVisitors
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            trackVisit();
        });
    } else {
        trackVisit();
    }

    async function updateVisitorDisplay() {
        // Data is tracked and stored in database, but not displayed to users
    }
})();

