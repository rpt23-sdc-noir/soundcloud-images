const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');
const bands = require('./bandData.js');

const getRandomNum = max => Math.floor(Math.random() * Math.floor(max));

const writeToCsvFile = async () => {
  writer.pipe(fs.createWriteStream('data.csv'));
  for (let i = 0; i < 10000000; i++) {
   await writer.write({
      bandId: i + 1,
      songId: i + 1,
      bandImageUrl: bands.bandImages[getRandomNum(150)],
      bandName: faker.vehicle.vehicle(),
      followers: getRandomNum(10000000),
      tracks: getRandomNum(2500000)
    })
  }
  writer.end();
  console.log('Done writing data to csv file');
};

writeToCsvFile();
