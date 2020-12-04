const express = require('express');
const request = require('supertest');
const serverRoutes = require('../server/routes/routes.js');
const database = require('../database/database.js');

const app = express();
app.use('/bands', serverRoutes);

describe('Server API test suite', () => {

  // jest.mock('../database/database.js', () => [
  //   {
  //     "bandId" : 1,
  //     "songId" : 1,
  //     "bandImageUrl" : "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE4Mzg1OX0",
  //     "bandName" : "Down Home Agita",
  //     "followers" : 75,
  //     "tracks" : 20,
  //   },
  //   {
  //     "bandId" : 2,
  //     "songId" : 2,
  //     "bandImageUrl" : "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE4Mzg1OX0",
  //     "bandName" : "Amperstellar",
  //     "followers" : 8,
  //     "tracks" : 16,
  //   },
  //   {
  //     "bandId" : 3,
  //     "songId" : 3,
  //     "bandImageUrl" : "https://images.unsplash.com/photo-1538402074774-8e624f3f7e5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE4Mzg1OX0",
  //     "bandName" : "Azure Nation",
  //     "followers" : 54,
  //     "tracks" : 2,
  //   }
  // ]);

  describe('GET endpoint', () => {
    it('should get a single song item', async (done) => {
      const songItem = await request(app).get('/bands/get/1');
      expect(songItem.statusCode).toBe(200);
      expect(songItem.body.data.songId).toBe(1);
      done();
    });

    it('should return a 400 status code for an invalid song ID', async (done) => {
      const invalidSongItemId = await request(app).get('/bands/get/101');
      expect(invalidSongItemId.statusCode).toBe(400);
      done();
    });
  });

  // describe('POST endpoint', () => {
  //   const { post } = '../server/routes/routes.js';
  //   const bodyParser = require('body-parser');

  //   jest.mock('../server/routes/routes.js', () => ({
  //     post: jest.fn(),
  //   }));
  //   app.use(bodyParser.json());

  //   it('should save a song item', async (done) => {
  //     const songItem = {
  //       "bandId" : 4,
  //       "songId" : 4,
  //       "bandImageUrl" : "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE4Mzg1OX0",
  //       "bandName" : "Catastrophe",
  //       "followers" : 30,
  //       "tracks" : 16,
  //     }

  //     const saveSongItem = await request(app).post('/bands/create').send(songItem);
  //     expect(saveSongItem.statusCode).toBe(200);
  //     expect(post).toHaveBeenCalledWith([
  //       {
  //         "bandId" : 1,
  //         "songId" : 1,
  //         "bandImageUrl" : "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE4Mzg1OX0",
  //         "bandName" : "Down Home Agita",
  //         "followers" : 75,
  //         "tracks" : 20,
  //       },
  //       {
  //         "bandId" : 2,
  //         "songId" : 2,
  //         "bandImageUrl" : "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE4Mzg1OX0",
  //         "bandName" : "Amperstellar",
  //         "followers" : 8,
  //         "tracks" : 16,
  //       },
  //       {
  //         "bandId" : 3,
  //         "songId" : 3,
  //         "bandImageUrl" : "https://images.unsplash.com/photo-1538402074774-8e624f3f7e5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE4Mzg1OX0",
  //         "bandName" : "Azure Nation",
  //         "followers" : 54,
  //         "tracks" : 2,
  //       },
  //       {
  //         "bandId" : 4,
  //         "songId" : 4,
  //         "bandImageUrl" : "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE4Mzg1OX0",
  //         "bandName" : "Catastrophe",
  //         "followers" : 30,
  //         "tracks" : 16,
  //       }
  //     ])
  //     done();
  //   });


  // })

  // describe('PUT endpoint', () => {

  // })

  // describe('DELETE endpoint', () => {

  // })

});
