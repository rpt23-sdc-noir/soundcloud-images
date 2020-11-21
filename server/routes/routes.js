const express = require('express');
const router = express.Router();
const db = require('../../database/database.js');

/* ----- GET BAND DATA ----- */

router.get('/get/:songId', async(req, res) => {
  try {
    const band = await db.findBand(req.params.songId);
    // if !band then error
    if (!band) {
      return res.status(400).json({
        success: false,
        msg: `there is no band with songId ${req.params.songId}`
      });
    }
    res.status(200).send({
      success: true,
      data: band
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      msg: error
    });
  }
});

/* ----- UPDATE FOLLOWERS ----- */

router.post('/followers', (req, res) => {
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
  // use song ID to delete item from database
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
  // use data from client to add item to database
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

/* ----- ORIGINAL GET BAND DATA ----- */

// app.get('/artistBio/:songId', async(req, res) => {
//   try {
//     const band = await db.findBand(req.params.songId);
//     // if !band then error
//     if (!band) {
//       return res.status(400).json({
//         success: false,
//         msg: `there is no band with songId ${req.params.songId}`
//       });
//     }
//     res.status(200).send({
//       success: true,
//       data: band
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({
//       success: false,
//       msg: error
//     });
//   }
// });

/* ----- ORIGINAL UPDATE FOLLOWERS ----- */

// app.post('/followers', (req, res) => {
//   var bandId = req.body.id;
//   var value = req.body.value;
//   db.updateFollowers(bandId, value)
//     .then((response) => {
//       res.send(response);
//     })
//     .catch((error) => {
//       console.log('Error updating followers: ', error);
//       res.sendStatus(500);
//     })
// })



