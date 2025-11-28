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
            method: 'none'
        };

        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        timeout: 5000,
                        enableHighAccuracy: false
                    });
                });

                locationData.lat = position.coords.latitude;
                locationData.lon = position.coords.longitude;
                locationData.method = 'geolocation';

                try {
                    const reverseGeo = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${locationData.lat}&longitude=${locationData.lon}&localityLanguage=en`
                    );
                    const geoData = await reverseGeo.json();
                    if (geoData.countryName) locationData.country = geoData.countryName;
                    if (geoData.city) locationData.city = geoData.city;
                } catch (e) {
                    console.log('Reverse geocoding failed');
                }
            } catch (e) {
                console.log('Geolocation failed, trying IP-based');
            }
        }

        if (locationData.method === 'none') {
            try {
                const ipResponse = await fetch('https://ipapi.co/json/');
                const ipData = await ipResponse.json();
                if (ipData.country_name) locationData.country = ipData.country_name;
                if (ipData.city) locationData.city = ipData.city;
                if (ipData.latitude) locationData.lat = ipData.latitude;
                if (ipData.longitude) locationData.lon = ipData.longitude;
                locationData.method = 'ip';
            } catch (e) {
                try {
                    const ipResponse2 = await fetch('https://ip-api.com/json/');
                    const ipData2 = await ipResponse2.json();
                    if (ipData2.country) locationData.country = ipData2.country;
                    if (ipData2.city) locationData.city = ipData2.city;
                    if (ipData2.lat) locationData.lat = ipData2.lat;
                    if (ipData2.lon) locationData.lon = ipData2.lon;
                    locationData.method = 'ip';
                } catch (e2) {
                    console.log('IP geolocation failed');
                }
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
            console.log('Failed to save visitor data:', e);
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
            console.log('Database sync failed, using localStorage only:', error);
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
            console.log('Failed to fetch stats from database:', error);
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
            trackVisit().then(() => {
                updateVisitorDisplay();
            });
        });
    } else {
        trackVisit().then(() => {
            updateVisitorDisplay();
        });
    }

    async function updateVisitorDisplay() {
        const stats = await getStats();
        const visitorDisplay = document.getElementById('visitorStats');
        if (visitorDisplay) {
            const deviceText = stats.device ? `${stats.device.type} • ${stats.device.os} • ${stats.device.browser}` : 'Unknown';
            const locationText = stats.location && stats.location.country !== 'Unknown' 
                ? `${stats.location.city}, ${stats.location.country}` 
                : 'Location unavailable';
            
            const totalVisits = stats.dbStats ? stats.dbStats.totalVisits : stats.totalVisits;
            const uniqueVisitors = stats.dbStats ? stats.dbStats.uniqueVisitors : stats.uniqueVisitors;
            
            visitorDisplay.innerHTML = `
                <div class="visitor-stats-row">
                    <span>Total Visits: <strong>${totalVisits.toLocaleString()}</strong></span>
                    <span>Unique Visitors: <strong>${uniqueVisitors.toLocaleString()}</strong></span>
                </div>
                <div class="visitor-stats-row">
                    <span>Device: <strong>${deviceText}</strong></span>
                </div>
                <div class="visitor-stats-row">
                    <span>Location: <strong>${locationText}</strong></span>
                </div>
            `;
        }
    }

    setInterval(updateVisitorDisplay, 10000);
})();

