const axios = require('axios')
// const NCAA_MENS_FOOTBALL_KEY = '2kmvut2z4yw9aq39qh483w2r'
// const NCAA_MENS_BASKETBALL_KEY = '7nhjscnqx5r3zxz85nf6enpt'
// const NBA_KEY = 'aagwaxckk8y6pvgcvpuxxjem'
const NFL_OFFICIAL_TRIAL_KEY = '7sfatpv323n7vvyz7p8etbvv'

const BASE_NFL_URL = 'https://api.sportradar.us/nfl/official'
const NFL_VERSION = 'v5'
const LANGUAGE_CODE = 'en'
const ACCESS_LEVEL = 'trial'
const NFL_SEASON = 'REG'
const FORMAT = 'json'
function getNFLWeeklySchedule (year, nflSeasonWeek) {
  return axios
    .get(`${BASE_NFL_URL}/${ACCESS_LEVEL}/${NFL_VERSION}/${LANGUAGE_CODE}/games/${year}/${NFL_SEASON}/${nflSeasonWeek}/schedule.${FORMAT}?api_key=${NFL_OFFICIAL_TRIAL_KEY}`)
    .then(res => res.data)
}
getNFLWeeklySchedule(2019, 1)
  .then(console.log)
