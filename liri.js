// === NPM === //
require("dotenv").config();
const keys = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
// var fs = require('fs');

var liriComm = process.argv[2];
var userInput = process.argv;
    userInput.splice(0, 3);
var songName;
var movieTitle;

//=== Keys === //
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

runLiri();

function runLiri(){
    switch(liriComm) {

        case 'my-tweets': 
            // console.log("In Twitter Action");
            twitterGrab();
            break;

        case 'spotify-this-song':
            // console.log("In Spotify Action");
            console.log(userInput[0]);
            if (typeof userInput[0] === 'undefined') {
                songName = 'toto africa';
                spotifyGrab();
            } else {
                // console.log("In else");
                songName = userInput.join(' ');
                spotifyGrab();
            }
        break;

       case 'movie-this':
            console.log("In Movie Action");
            if (typeof userInput[0] === 'undefined') {
                movieName = 'Mr. Nobody';
                omdbGrab();
            } else {
                movieName = userInput.join(' ');
                omdbGrab();
            }
            break;

        case 'do-what-it-says':
            console.log("In DWIS Action");
            doit();
            break;
    }
};

function twitterGrab() {
    client.get('https://api.twitter.com/1.1/statuses/user_timeline.json', 
    function(err, tweets, response) {
        if (err) throw err;
        tweets.forEach(tweet => {
            console.log('\n ================================');
            console.log(`Date: ${tweet.created_at}`);
            console.log(`${tweet.text}`);
            console.log('\n ================================');
        })
    })
};


function spotifyGrab() {
    spotify.search({type: "track", query: songName}, 
    function(err, data) {
        if(err) throw err;
            // console.log(data);
            console.log('=====================================');
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
            // console.log(response);
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






