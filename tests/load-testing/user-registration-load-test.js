//k6 run --out web-dashboard user-registration-load-test.js
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
            startRate: 5,
            timeUnit: '1s',
            preAllocatedVUs: 15,
            maxVUs: 500,
            stages: [
                { duration: '10s', target: 10 },
                { duration: '30s', target: 20 },
                { duration: '30s', target: 30 }
            ],
        },
    },
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% of requests under 2s
        http_req_failed: ['rate<0.05'],    // Error rate under 5%
        http_reqs: ['rate>5'],             // Minimum RPS achieved
        success_rate: ['rate>0.95'],       // 95% of our custom checks pass
        error_rate: ['rate<0.05'],         // Custom error rate under 5%
    },
};

// Strapi configuration
const BASE_URL = 'http://stage-starpi-741260546.ca-central-1.elb.amazonaws.com';
const STRAPI_URL = `${BASE_URL}/api`;

export default function () {
    // Generate unique user data for registration
    const uniqueId = `${Date.now()}_${__VU}_${__ITER}`;
    const userData = {
        username: `testuser_${uniqueId}`,
        email: `testuser_${uniqueId}@loadtest.example.com`,
        password: 'LoadTest123!',
        firstName: 'Test',
        lastName: 'User',
        yearOfBirth: 1990,
        gender: 'male',
        zipCode: '12345',
        country: 'Canada',
        state: 'Ontario',
        loginCount: 0,
    };

    const response = http.post(`${STRAPI_URL}/auth/local/register`, JSON.stringify(userData), {
        headers: { 'Content-Type': 'application/json' }
    });

    const success = check(response, {
        'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
        'response size > 0': (r) => r.body && r.body.length > 0,
    });

    // Track metrics
    successRate.add(success);
    errorRate.add(!success);
    totalRequests.add(1);
}
