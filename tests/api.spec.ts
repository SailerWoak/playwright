import { test, expect } from '@playwright/test';  

    test('Search via API', async ({ request }) => {
    const response = await request.get(
        'https://www.decathlon.lv/module/oneshop_algolia/autoCompleteSearch', {
          params: {
                hitsPerPage: 5,
                query: 'bernu velosipedi'
        }
      });
      expect(response.status()).toBe(200);
      const body = await response.json()
      console.log(body)
      expect(body.suggestions.length).toBeGreaterThan(0)
      expect(body.suggestions.length).toBeLessThanOrEqual(5)
      console.log(body.suggestions)
    });
 // Working on Add more API tests