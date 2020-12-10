const { Client } = require('pg');

const client = new Client({
  user: 'freddieperez-cruz',
  host: 'localhost',
  database: 'bands',
  password: '',
  port: 5432,
});

const connect = async () => {
  try {
    await client.connect();
  } catch(err) {
    console.log('Error connecting to database:', err);
  }
};

const findBandId = async (songId) => {
  try {
    const bandId = await client.query(`SELECT band_id FROM songs WHERE song_id = ${songId}`);
    return bandId;
  } catch(err) {
    console.log('Error getting band ID:', err);
  }
};

const findBandData = async (bandId) => {
  try {
    const bandData = await client.query(`SELECT * FROM bands WHERE band_id = ${bandId}`);
    return bandData;
  } catch(err) {
    console.log('Error getting band data:', err);
  }
}

const deleteSongItem = async (songId) => {
  try {
    await client.query(`DELETE FROM songs WHERE song_id = ${songId}`);
    return true;
  } catch(err) {
    console.log('Error deleting song item:', err);
  }
}

const start = async () => {
  await connect();
  console.log('Connected to database!');
};
start();

module.exports = { findBandId, findBandData };