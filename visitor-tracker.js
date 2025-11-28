(function() {
    const VISITOR_KEY = 'algo_visitor_id';
    const VISIT_COUNT_KEY = 'algo_visit_count';
    const UNIQUE_VISITORS_KEY = 'algo_unique_visitors';
    const LAST_VISIT_KEY = 'algo_last_visit';
    
    function generateVisitorId() {
        return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
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
    
    function trackVisit() {
        const visitorId = getVisitorId();
        const now = Date.now();
        const lastVisit = parseInt(localStorage.getItem(LAST_VISIT_KEY) || '0');
        
        let visitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0');
        
        if (now - lastVisit > 30000) {
            visitCount++;
            localStorage.setItem(VISIT_COUNT_KEY, visitCount.toString());
            localStorage.setItem(LAST_VISIT_KEY, now.toString());
        }
        
        return {
            totalVisits: visitCount,
            uniqueVisitors: parseInt(localStorage.getItem(UNIQUE_VISITORS_KEY) || '0'),
            visitorId: visitorId
        };
    }
    
    function getStats() {
        return {
            totalVisits: parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0'),
            uniqueVisitors: parseInt(localStorage.getItem(UNIQUE_VISITORS_KEY) || '0')
        };
    }
    
    window.VisitorTracker = {
        track: trackVisit,
        getStats: getStats
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            trackVisit();
            updateVisitorDisplay();
        });
    } else {
        trackVisit();
        updateVisitorDisplay();
    }
    
    function updateVisitorDisplay() {
        const stats = getStats();
        const visitorDisplay = document.getElementById('visitorStats');
        if (visitorDisplay) {
            visitorDisplay.innerHTML = `
                <span>Total Visits: <strong>${stats.totalVisits.toLocaleString()}</strong></span>
                <span>Unique Visitors: <strong>${stats.uniqueVisitors.toLocaleString()}</strong></span>
            `;
        }
    }
    
    setInterval(updateVisitorDisplay, 5000);
})();

