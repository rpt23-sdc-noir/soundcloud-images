
const pass = require('../dbconfig.js');

const nano = require('nano')(`http://admin:${pass.password}@localhost:5984`);
async function createDB() {
  await nano.db.destroy('bands');
  await nano.db.create('bands');
  const bands = nano.use('bands');
  const response = await bands.insert({happy: true}, 'rabbit');
  console.log(response);
  return response;
}
createDB();

// // --------- SAVE BAND FUNC --------- //

// const saveBands = (bandData) => {
//   var band = new Band(bandData);
//   return band.save()
//     .catch((error) => {
//       console.log('Error saving to database: ', error);
//     });
// };

// // --------- FIND BAND FUNC --------- //

// const findBand = function(id) {
//   return Band.findOne({songId: id})
//     .catch((error) => {
//       console.log('Error finding band in database: ', error);
//     });
// };

// /* ----- DELETE ONE BAND ----- */

// const deleteBand = function(songId) {
//   return Band.deleteOne({songId})
//   .catch((err) => {
//     console.error('Error deleting band from database:', err);
//   })
// };

// // --------- DELETE BANDS FUNC --------- //

// const deleteBands = function() {
//   return Band.deleteMany({})
//     .catch((error) => {
//       console.log('Error deleting bands in database: ', error);
//     });
// };

// // ------ UPDATE FOLLOWERS FUNC ------- //

// const updateFollowers = function(id, val) {
//   return Band.updateOne({bandId: id}, {$inc: {followers: val * 1}})
//     .catch((error) => {
//       console.log('Error updating followers:', error);
//     });
// };

// module.exports.saveBands = saveBands;
// module.exports.findBand = findBand;
// module.exports.deleteBands = deleteBands;
// module.exports.updateFollowers = updateFollowers;
// module.exports.deleteBand = deleteBand;

