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
};

const updateFollowers = async (id, value) => {
  try {
    const updatedFollowers = await client.query(`UPDATE bands SET followers = ${value} WHERE band_id = ${id}`);
    if (updatedFollowers.rowCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch(err) {
    console.log('Error updating band followers:', err);
  }
}

const deleteSongItem = async (songId) => {
  try {
    const deleteSongItem = await client.query(`DELETE FROM songs WHERE song_id = ${songId}`);
    if (deleteSongItem.rowCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch(err) {
    console.log('Error deleting song item:', err);
  }
};

const start = async () => {
  await connect();
  console.log('Connected to database!');
};
start();

module.exports = {
  findBandId,
  findBandData,
  deleteSongItem,
  updateFollowers,
};