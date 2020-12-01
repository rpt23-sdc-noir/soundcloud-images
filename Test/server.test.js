const express = require('express');
const request = require('supertest');
const serverRoutes = require('../server/routes/routes.js');
const database = require('../database/database.js');

const app = express();
app.use('/bands', serverRoutes);

describe('Server API test suite', () => {

  describe('GET endpoint', () => {
    it('should get a single song item', async (done) => {
      const songItem = await request(app).get('/bands/get/1');
      expect(songItem.statusCode).toBe(200);
      expect(songItem.body.data.songId).toBe(1);
      expect(songItem.body.data.bandName).toBe('Down Home Agita');
      done();
    })

    it('should return a 400 status code for an invalid song ID', async (done) => {
      const invalidSongItemId = await request(app).get('/bands/get/101');
      expect(invalidSongItemId.statusCode).toBe(400);
      done();
    })

  })

  // describe('POST endpoint', () => {

  // })

  // describe('UPDATE FOLLOWERS endpoint', () => {

  // })

  // describe('DELETE endpoint', () => {

  // })

})
