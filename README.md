# Project Name

> SoundCloud App - Band Profile Module - SDC

## Project API
- GET /bands/get/:songId <-- returns band data using a song ID
- POST /bands/create <-- path to create a band using data in the request object
- PUT /bands/update/:bandId <-- update a band in the database (followers)
- DELETE /bands/delete/:bandId <-- delete a band in the database using a band ID

## Related Projects

  - https://github.com/rpt23-sdc-noir/soundcloudplayer
  - https://github.com/rpt23-sdc-noir/comments-service
  - https://github.com/rpt23-sdc-noir/song-description
  - https://github.com/rpt23-sdc-noir/related-tracks

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> In order to use this repo, you must create a 'config.js' file in your root directory and use the Unsplash API key.

## Requirements

  - React
  - React-DOM
  - Express
  - Axios


## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

