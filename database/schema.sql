DROP DATABASE IF EXISTS bands;

CREATE DATABASE bands;

\c bands;

CREATE TEMPORARY TABLE band_data (
  id SERIAL PRIMARY KEY,
  band_id INT,
  song_id INT,
  song_name VARCHAR(80),
  band_name VARCHAR(50),
  followers INT,
  tracks INT,
  band_image_url VARCHAR(120)
);

COPY band_data (band_id, song_id, song_name, band_name, followers, tracks, band_image_url)
FROM '/Users/freddieperez-cruz/RPT-23-SDC/soundcloud-images/csv/data.csv'
DELIMITER ','
CSV HEADER;

DROP TABLE IF EXISTS bands CASCADE;
DROP TABLE IF EXISTS songs CASCADE;
DROP TABLE IF EXISTS images CASCADE;

CREATE TABLE bands (
  id SERIAL,
  band_id INT NOT NULL UNIQUE,
  band_name VARCHAR(50) NOT NULL,
  tracks INT,
  followers INT,
  PRIMARY KEY (id)
);

CREATE TABLE songs (
  id SERIAL,
  song_id INT NOT NULL UNIQUE,
  band_id INT NOT NULL,
  song_name VARCHAR(80) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_band
    FOREIGN KEY (band_id)
      REFERENCES bands(band_id)
);

CREATE TABLE images (
  id SERIAL,
  band_id INT NOT NULL,
  band_image_url VARCHAR(120) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_bandphoto
    FOREIGN KEY (band_id)
      REFERENCES bands(band_id)
);


INSERT INTO bands (band_id, band_name, tracks, followers)
SELECT band_id, band_name, tracks, followers
FROM band_data;

INSERT INTO songs (song_id, band_id, song_name)
SELECT song_id, band_id, song_name
FROM band_data;

INSERT INTO images (band_id, band_image_url)
SELECT band_id, band_image_url
FROM band_data;

DROP TABLE band_data;
