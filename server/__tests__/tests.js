const { expect } = require('@jest/globals');
const supertest = require('supertest');
const { number } = require('yargs');
const app = require('../server');

test('GET /hello no parameters', async () => {
  await supertest(app).get('/hello?')
    .expect(200)
    .then((res) => {
      expect(res.text).toBe('Hello');
    });
});
