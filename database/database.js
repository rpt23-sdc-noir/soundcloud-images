
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