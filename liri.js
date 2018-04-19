// === NPM === //
require("dotenv").config();
const keys = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
// var fs = require('fs');

var liriComm = process.argv[2];
var userInput = process.argv;
var songTitle;
var movieTitle;

//=== Keys === //
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

runLiri();

function runLiri(){
    switch(liriComm) {

        case 'my-tweets': 
            twitterGrab();
            break;

        case 'spotify-this-song':
            if (typeof userInput[0] === 'undefined') {
                songName = 'the sign ace of base';
                spotifyGrab();
            } else {
                songName = userInput.join(' ');
                spotifyGrab();
                break;
            }

       case 'movie-this':
            if (typeof userInput[0] === 'undefined') {
                movieName = 'Mr. Nobody';
                omdbGrab();
            } else {
                movieName = userInput.join(' ');
                omdbGrab();
                break;
            }

        case 'do-what-it-says':
            doit();
            break;
    }
};

function twitterGrab() {
    client.get('https://api.twitter.com/1.1/favorites/list.json', 
    function(err, tweets, response) {
        if (err) throw err;
        tweets.forEach(tweet => {
            console.log('\n ================================');
            console.log(`Date: ${tweet.created_at}`);
            console.log(`\n${tweet.text}`);
            console.log('\n ================================');
        })
    })
};


function spotifyGrab() {
    spotify.search({type: "track", query: "songName"}, 
    function(err, data) {
        if(err) throw err;
            console.log('\n=====================================');
            console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
            console.log(`Track: ${data.tracks.items[0].name}`); 
            console.log(`Album: ${data.tracks.items[0].album.name}`);
            console.log(`Link: ${data.tracks.items[0].album.external_urls.spotify}`);
            console.log('=====================================');
        });
    };


function omdbGrab() {
    const omdbURL = 'http://www.omdbapi.com/?apikey=trilogy&t=${movieName}';
    request(omdbURL, function(err, response, body){
        if (!err && response.statusCode === 200) {
            const data = JSON.parse(body);
            console.log('\n=====================================');
            console.log(`Title: ${data.Title}`);
            console.log(`Year: ${data.Year}`);
            console.log(`IMDB Rating: ${data.imdbRating}`);
            console.log(`Rotten Tomatoes Rating: ${data.Ratings[1].Value}`);
            console.log(`Country: ${data.Country}`);
            console.log(`Language: ${data.Language}`);
            console.log(`Actors: ${data.Actors}`);
            console.log(`Plot: ${data.Plot}`);
            console.log('=====================================');
        };
    });
};


function doIt() {
    fs.readFile('random.txt', 'utf-8', (err, data) => {
        if (err) {return console.log(err)}
        const readFileArr = data.split(',');
        liriComm = readFileArr[0];
        userInput = readFileArr[1].split(' ');
        conosle.log('===============');
    liriComm();
    });
};






