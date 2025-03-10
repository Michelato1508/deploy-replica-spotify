import axios from "axios";

// const { NODE_ENV } = process.env;
const URL = "https://deploy-replica-spotify.onrender.com/api";

const responseArtist = await axios.get(`${URL}/artists`);
const responseSong = await axios.get(`${URL}/songs`);

export const artistArray = responseArtist.data;
export const songsArray = responseSong.data;
