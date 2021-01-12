import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const failRate = new Rate('failed requests');

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 500 },
    { duration: '5m', target: 500 },
    { duration: '2m', target: 750 },
    { duration: '5m', target: 750 },
    { duration: '2m', target: 1000 },
    { duration: '5m', target: 1000 },
    { duration: '10m', target: 0 },
  ],
  thresholds: {
    'failed requests': ['rate<0.03'], //
  },
};

export default function () {
  const randomId = Math.floor(Math.random() * (10000000 - 8000000 + 1) + 8000000);
  const res = http.get(`http://127.0.0.1:2000/bands/get/${randomId}`);
  const result = check(res, {'status was 200': (r) => r.status == 200});
  failRate.add(!result);
  sleep(1);
};


