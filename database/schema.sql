DROP DATABASE IF EXISTS bands;

CREATE DATABASE bands;

\c bands;

CREATE TABLE bands (
  id SERIAL,
  band_id INT,
  song_id INT,
  band_image_url VARCHAR(120),
  band_name VARCHAR(50),
  followers INT,
  tracks INT
);

COPY bands (band_id, song_id, band_image_url, band_name, followers, tracks)
FROM '/Users/freddieperez-cruz/RPT-23-SDC/soundcloud-images/data.csv'
DELIMITER ','
CSV HEADER;

