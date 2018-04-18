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
       if (typeof userInput === 0 'undefined') {
           songName = 'the sign ace of base';
           spotifyGrab();
       } else {
           songName = userInput.join(' ');
           spotifyGrab();
           break;
       }

       case 'movie-this':
       if (typeof userInput === 0 'undefined') {
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












`my-tweets`
    `spotify-this-song`
    `movie-this`
    `do-what-it-says`