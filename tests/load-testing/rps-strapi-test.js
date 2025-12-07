//k6 run --out web-dashboard rps-test.js
import http from 'k6/http';
import { check } from 'k6';
import { Rate, Counter } from 'k6/metrics';

// Custom metrics
const successRate = new Rate('success_rate');
const errorRate = new Rate('error_rate');
const totalRequests = new Counter('total_requests');

export const options = {
    scenarios: {
        ramp_rps: {
            executor: 'ramping-arrival-rate',
            startRate: 10,
            timeUnit: '1s',
            preAllocatedVUs: 25,
            maxVUs: 100,
            stages: [
                { duration: '10s', target: 50 },
                { duration: '20s', target: 100 },
                // { duration: '30s', target: 20 },   
                // { duration: '30s', target: 80 },
                // { duration: '30s', target: 150 },
                //{ duration: '30s', target: 0 },
            ],
        },
    },
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% of requests under 2s
        http_req_failed: ['rate<0.05'],    // Error rate under 5%
        http_reqs: ['rate>10'],            // Minimum RPS achieved
        success_rate: ['rate>0.95'],       // 95% of our custom checks pass
        error_rate: ['rate<0.05'],         // Custom error rate under 5%
    },
};

// Strapi configuration
const BASE_URL = 'http://stage-starpi-741260546.ca-central-1.elb.amazonaws.com';
const STRAPI_URL = `${BASE_URL}/api`;

//http://stage-starpi-741260546.ca-central-1.elb.amazonaws.com/api/badges?populate=image

// Regular user credentials (not admin) - YOUR ACTUAL USER
const USER_CREDENTIALS = {
    identifier: 'bojan.veljanovski@eternus.com', // Your test user email
    password: 'Tester123#'                       // Your test user password
};

export default function () {
    // Test user login to verify credentials
    const response = http.post(`${STRAPI_URL}/auth/local`, JSON.stringify(USER_CREDENTIALS), {
        headers: { 'Content-Type': 'application/json' }
    });

    const success = check(response, {
        'status is 200': (r) => r.status === 200,
        //'response time < 1000ms': (r) => r.timings.duration < 1000,
        'response size > 0': (r) => r.body && r.body.length > 0,
        //'no server errors': (r) => r.status < 500,
        //'no timeouts': (r) => r.status !== 0, // Status 0 indicates timeout/connection error
    });

    // Track metrics
    successRate.add(success);
    errorRate.add(!success);
    totalRequests.add(1);
}
