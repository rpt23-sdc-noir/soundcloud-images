// ----------- DB CONNECTION ---------- //

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bands', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

// ------------- DB SCHEMA ------------ //

const bandSchema = new mongoose.Schema({
  bandId: {
    type: Number,
    unique: true
  },
  songId: {
    type: Number,
    unique: true
  },
  bandName: String,
  bandImageUrl: String,
  followers: Number,
  tracks: Number
});

const Band = mongoose.model('Band', bandSchema);

// --------- SAVE BAND FUNC --------- //

const saveBands = (bandData) => {
  var band = new Band(bandData);
  return band.save()
    .catch((error) => {
      console.log('Error saving to database: ', error);
    });
};

// --------- FIND BAND FUNC --------- //

const findBand = function(id) {
  return Band.findOne({songId: id})
    .catch((error) => {
      console.log('Error finding band in database: ', error);
    });
};

/* ----- DELETE ONE BAND ----- */

const deleteBand = function(songId) {
  return Band.deleteOne({songId})
  .catch((err) => {
    console.error('Error deleting band from database:', err);
  })
};

// --------- DELETE BANDS FUNC --------- //

const deleteBands = function() {
  return Band.deleteMany({})
    .catch((error) => {
      console.log('Error deleting bands in database: ', error);
    });
};

// ------ UPDATE FOLLOWERS FUNC ------- //

const updateFollowers = function(id, val) {
  return Band.updateOne({bandId: id}, {$inc: {followers: val * 1}})
    .catch((error) => {
      console.log('Error updating followers:', error);
    });
};

module.exports.saveBands = saveBands;
module.exports.findBand = findBand;
module.exports.deleteBands = deleteBands;
module.exports.updateFollowers = updateFollowers;
module.exports.deleteBand = deleteBand;
