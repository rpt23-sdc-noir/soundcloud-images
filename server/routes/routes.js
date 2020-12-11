const express = require('express');
const router = express.Router();
const db = require('../../database/pg.js');

/* ----- GET BAND DATA ----- */

router.get('/get/:songId', async (req, res) => {
  try {
    const { songId } = req.params;
    const band = await db.findBandId(songId);
    if (band) {
      const bandId = band.rows[0]['band_id'];
      const getBandData = await db.findBandData(bandId);
      const bandData = JSON.stringify(getBandData.rows[0]);
      res.setHeader('content-type', 'application/json');
      res.send(bandData);
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
    const updateBandFollowers = await db.updateFollowers(bandId, followerCount);
    if (updateBandFollowers === true) {
      res.send(`Successfully updated followers for band ID: ${bandId}!`);
    } else {
      res.status(500).send(`Error updating followers for band ID: ${bandId}, hang tight while we fix it.`);
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
  try {
    const { songId } = req.params;
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
    const createBand = await db.createBandEntry(bandId, songId, songName, bandName, bandImageUrl, followers, tracks);
    if (createBand) {
      res.setHeader('content-type', 'application/json');
      res.status(200).send(JSON.stringify(bandData));
    } else {
      res.status(500).send('Error saving band, hang tight while we work to fix it.');
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
