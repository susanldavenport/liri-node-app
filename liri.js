// === NPM === //
require("dotenv").config();

const keys = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');
const help = require('inquirer'); 

var liriComm = process.argv[2];
var userInput = process.argv;
    userInput.splice(0, 3);
var songName;
var movieName;

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
                songName = 'toto africa';
                spotifyGrab();
            } else {
                songName = userInput.join(' ');
                spotifyGrab();
            }
        break;

       case 'movie-this':
            if (typeof userInput[0] === 'undefined') {
                movieName = 'Sabrina';
                omdbGrab();
            } else {
                movieName = userInput.join(' ');
                omdbGrab();
            }
            break;

        case 'do-what-it-says':
            doIt();
            break;
        
        case 'help':
            getHelp();
            break;
    }
};

function getHelp(){
    console.log('in getHelp function');
    help.prompt([
        {
            type: 'list',
            message: 'What do you want to do?',
            choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
            name: 'userHelp'
        }
    ])
    .then(inputA => {
        if (inputA.userHelp === 'spotify-this-song' || inputA.userHelp === 'movie-this') {
            help.prompt([
                {
                type: 'input',
                message: 'What would you like to search?',
                name: 'userSearch'
                }
            ])
            .then(inputB => {
                liriComm = inputA.userHelp;
                if (inputB.userSearch === ''){
                    command.log('Make up your mind! Enter a search query!');
                } else {
                    liriComm = inputA.userHelp;
                    userInput = inputB.userSearch;
                    userInput = userInput.split(' ');
                    runLiri();
                }
            });
        } else {
            liriComm = inputA.userHelp;
            runLiri();
        }
    });
}

function twitterGrab() {
    client.get('https://api.twitter.com/1.1/statuses/user_timeline.json', 
    function(err, tweets, response) {
        if (err) throw err;
        tweets.forEach(tweet => {
            console.log('\n ============!TWEET!=============');
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
            console.log('=============*Spotify Results*=============');
            console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
            console.log(`Track: ${data.tracks.items[0].name}`); 
            console.log(`Album: ${data.tracks.items[0].album.name}`);
            console.log(`Link: ${data.tracks.items[0].album.external_urls.spotify}`);
            console.log('===========================================');
        });
    };


function omdbGrab() {
    const omdbURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movieName;
    request(omdbURL, function(err, response, body){
        if (!err && response.statusCode === 200) {
            const data = JSON.parse(body);
            console.log('===============*YOUR MOVIE*===============');
            console.log(`Title: ${data.Title}`);
            console.log(`Year: ${data.Year}`);
            console.log(`IMDB Rating: ${data.imdbRating}`);
            console.log(`Rotten Tomatoes Rating: ${data.Ratings[0].Value}`);
            console.log(`Country: ${data.Country}`);
            console.log(`Language: ${data.Language}`);
            console.log(`Actors: ${data.Actors}`);
            console.log(`Plot: ${data.Plot}`);
            console.log('===========================================');
        };
    });
};


function doIt() {
    fs.readFile('random.txt', 'utf-8', (err, data) => {
        if (err) {return console.log(err)}
        const readFileArr = data.split(',');
        liriComm = readFileArr[0];
        userInput = readFileArr[1].split(' ');
    runLiri();
    });
};