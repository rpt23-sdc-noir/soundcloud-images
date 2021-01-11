const express = require('express');
const router = express.Router();
const db = require('../../database/pg.js');

/* ----- GET BAND DATA ----- */

const validateID = (id) => {
  if (!(id < 0) && !(id > 10000000)) {
    return true;
  }
  return false;
};

router.get('/get/:songId', async (req, res) => {
  const { songId } = req.params;
  if (songId && validateID(songId)) {
    try {
      const bandIdAndSongName = await db.findBandId(songId);
      const getBandData = await db.findBandData(bandIdAndSongName.band_id);
      const getBandImage = await db.getBandImage(bandIdAndSongName.band_id);
      if (bandIdAndSongName !== false && getBandData !== false && getBandImage !== false) {
        let allData = Object.assign(req.params, bandIdAndSongName, getBandData, getBandImage);
        const bandData = JSON.stringify(allData);
        res.setHeader('content-type', 'application/json');
        res.send(allData);
      } else {
        res.status(500).send('Error retrieving band data, hang tight while we work to fix it.');
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(400).json({
        success: false,
        msg: err,
      });
    }
  } else {
    res.status(400).send('Please enter a valid song ID.');
  }
});

/* ----- UPDATE FOLLOWERS ----- */

router.put('/followers', async (req, res) => {
  try {
    const { query } = req;
    let bandId;
    let followerCount;
    for (let val in query) {
      bandId = val;
      followerCount = query[val];
    }
    if (bandId && validateID(bandId)) {
      const updateBandFollowers = await db.updateFollowers(bandId, followerCount);
      if (updateBandFollowers === true) {
        res.send(`Successfully updated followers for band ID: ${bandId}!`);
      } else {
        res.status(500).send(`Error updating followers for band ID: ${bandId}, hang tight while we fix it.`);
      }
    } else {
      res.status(400).send('Please enter a valid band ID.');
    }
  } catch(err) {
    console.error(err);
    res.sendStatus(400).json({
      success: false,
      msg: err,
    })
  }
});

/* DELETE SONG */

router.delete('/delete/:songId', async (req, res) => {
  const { songId } = req.params;
  if (songId && validateID(songId)) {
    try {
      const deleteSong = await db.deleteSongItem(songId);
      if (deleteSong === true) {
        res.send('Successfully deleted song item!');
      } else {
        res.status(500).send('Error deleting song item, hang tight while we work to fix it.');
      }
    } catch(err) {
      console.error(err);
      res.sendStatus(400).json({
        success: false,
        msg: err,
      })
    }
  } else {
    res.status(400).send('Please enter a valid song ID.');
  }
});

/* CREATE SONG ITEM */

router.post('/create', async (req, res) => {
  try {
    const bandData = req.query;
    const {
      bandId,
      songId,
      songName,
      bandName,
      bandImageUrl,
      followers,
      tracks,
    } = bandData;
    if (bandId && validateID(bandId) && songId && validateID(songId) && songName && bandName && bandImageUrl) {
      const createBand = await db.createBandEntry(bandId, songId, songName, bandName, bandImageUrl, followers, tracks);
      if (createBand) {
        res.setHeader('content-type', 'application/json');
        res.status(200).send(JSON.stringify(bandData));
      } else {
        res.status(500).send('Error saving band, hang tight while we work to fix it.');
      }
    } else {
      res.status(400).send('Please enter valid band properties.');
    }
  } catch(err) {
    console.error(err);
    res.sendStatus(400).json({
      success: false,
      msg: err,
    })
  }
});

module.exports = router;
