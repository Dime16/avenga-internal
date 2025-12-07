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
            maxVUs: 500,
            stages: [
                { duration: '30s', target: 100 },
                { duration: '30s', target: 150 },   
                { duration: '10s', target: 0 },
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

export default function () {
    const response = http.get('https://www.winyourworld.com/');
    // const response = http.get('http://stage-557678415.ca-central-1.elb.amazonaws.com/follow-up');
    //const response = http.get('http://production-1693292916.ca-central-1.elb.amazonaws.com/home');
    //const response = http.get('http://stage-starpi-741260546.ca-central-1.elb.amazonaws.com/admin/auth/login');
    //const response = http.get('http://stage-557678415.ca-central-1.elb.amazonaws.com/login');
    //const response = http.get('http://stage-557678415.ca-central-1.elb.amazonaws.com/ask');
    //const response = http.get('http://stage-starpi-741260546.ca-central-1.elb.amazonaws.com/api/badges?populate=image');

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
