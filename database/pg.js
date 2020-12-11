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

const createBandEntry = async (...args) => {
  try {
    const insertBandQuery = 'INSERT INTO bands(band_id, band_name, tracks, followers) VALUES($1, $2, $3, $4)';
    const insertBandValues = [args[0], args[3], args[5], args[6]];
    const insertBand = await client.query(insertBandQuery, insertBandValues);

    const insertSongQuery = 'INSERT INTO songs(song_id, band_id, song_name) VALUES($1, $2, $3)';
    const insertSongValues = [args[1], args[0], args[2]];
    const insertSong = await client.query(insertSongQuery, insertSongValues);

    const insertImageQuery = 'INSERT INTO images(band_id, band_image_url) VALUES($1, $2)';
    const insertImageValues = [args[0], args[4]];
    const insertImage = await client.query(insertImageQuery, insertImageValues);

    return insertBand.rowCount === 1 && insertSong.rowCount === 1 && insertImage.rowCount === 1 ? true : false;
  } catch(err) {
    console.log('Error create a band entry:', err);
  }
};

const findBandId = async (songId) => {
  try {
    const bandId = await client.query(`SELECT band_id FROM songs WHERE song_id = ${songId}`);
    console.log(bandId);
    return bandId.rowCount === 1 ? bandId.rows[0]['band_id'] : false;
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
    return updatedFollowers.rowCount === 1 ? true: false;
  } catch(err) {
    console.log('Error updating band followers:', err);
  }
}

const deleteSongItem = async (songId) => {
  try {
    const deleteSongItem = await client.query(`DELETE FROM songs WHERE song_id = ${songId}`);
    return deleteSongItem.rowCount === 1 ? true: false;
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
  createBandEntry,
  findBandId,
  findBandData,
  deleteSongItem,
  updateFollowers,
};