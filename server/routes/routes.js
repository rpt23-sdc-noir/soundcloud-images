const express = require('express');
const router = express.Router();
const db = require('../../database/pg.js');

/* ----- GET BAND DATA ----- */

router.get('/get/:songId', async(req, res) => {
  try {
    const songId = req.params.songId;
    const band = await db.findBandId(songId);
    const bandId = band.rows[0]['band_id'];
    const getBandData = await db.findBandData(bandId);
    const bandData = JSON.stringify(getBandData.rows[0]);
    res.setHeader('content-type', 'application/json');
    res.send(bandData);
  } catch (error) {
    console.error(error);
    res.sendStatus(400).json({
      success: false,
      msg: error
    });
  }
});

/* ----- UPDATE FOLLOWERS ----- */

router.put('/followers', (req, res) => {
  const bandId = req.body.id;
  const value = req.body.value;
  db.updateFollowers(bandId, value)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      console.log('Error updating followers: ', error);
      res.sendStatus(500);
    })
});

/* DELETE SONG */

router.delete('/delete/:songId', (req, res) => {
  const songId = req.params.songId;
  db.deleteBand(songId)
  .then((response) => {
    res.send(response)
  })
  .catch((err) => {
    console.error('Error deleting band:', err);
  })
});

/* CREATE SONG ITEM */

router.post('/create', (req, res) => {
  const bandData = req.body;
  db.saveBands(bandData)
  .then((response) => {
    res.send(response);
  })
  .catch((err) => {
    console.error('Error saving band:', err);
  })
});

module.exports = router;
