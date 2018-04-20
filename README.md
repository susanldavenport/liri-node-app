# liri-node-app

https://susanldavenport.github.io/liri-node-app/


### This is a Node Application _(run in your terminal!)_

User can input terminal commands below to access APIs

1. `node liri.js my-tweets`
    Command will access the most recent tweets from linked Twitter account
2. `node liri.js spotify-this-song '<enter song name and/or artist>'`
    Command will search the Spotify API for query. 
    If no query is entered, will default to "Africa" by Toto.
3. `node liri.js movie-this '<enter movie name>'`
    Command will search OMDB API for query.
    If no query is entered, will default to the movie "Sabrina".
4. `node liri.js do-what-it-says`
    Command will read from the random.txt file for a command.
5. `node liri.js help`
    If user needs help remembering commands, typing help will prompt user to select a command from the list.
    Selecting 'spotify-this-song' or 'movie-this' commands will prompt user to enter a song or movie to search for.

### Items to Add:
* Ability to add search queries and data to a 'log.txt' file.
