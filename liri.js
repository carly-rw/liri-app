var twitts = require("./keys.js");
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

var startLiri = function(input1, input2) {
  functionOptions(input1, input2);
};

var logLiri = function(input, data) {
  fs.appendFile("log.txt", (input + ": "), function(err) {
    if (err) throw err;
    console.log("The command was appended to the log");
  });

  fs.appendFile("log.txt", (data + "\n ----------------------- \n"), function(err) {
    if (err) throw err;
    console.log("The data was appended to the log");
  });
};

var functionOptions = function(option, parameter) {
  switch (option) {
    case 'my-tweets':
      myTweets();
      break;
    case 'spotify-this-song':
      spotifyThisSong(parameter);
      break;
    case 'movie-this':
      movieThis(parameter);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log('Liri doesn\'t know that');
  }
};

var myTweets = function() {
  var client = new twitter(twitts.twitterKeys);
  var tweetsArray= [];
  client.get('statuses/user_timeline', {screen_name: 'spimch', count: 20}, function(error, tweets, response) {
  	var tweetsArray= [];
    for (var i = 0; i < tweets.length; i++) {
        tweetsArray.push({
            'Created At: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
      };
      console.log(tweetsArray);
      logLiri("my-tweets", JSON.stringify(tweetsArray));
   });
};

var spotifyThisSong= function(title) {
  if (title === undefined) {
    title = "The Sign";
  };

  spotify.search({ type: "track", query: title }, function(err, data) {
    if (err) throw err;

    var songs = data.tracks.items;
    var songArray = []; 
	//console.log(JSON.stringify(data));
    for (var i = 0; i < songs.length; i++) {
      	songArray.push({
        'Artist(s)': songs[i].album.artists[0].name,
        'Title: ': songs[i].name,
        'Preview Link: ': songs[i].preview_url,
        'Album: ': songs[i].album.name,
      });
    };
    console.log(songArray);
    logLiri("spotify-this-song", JSON.stringify(songArray));
  });
};

var movieThis = function(movie) {
  if (movie === undefined) {
    movie = 'Mr Nobody';
  };

  var omdbURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&r=json";

  var movieArray = [];

  request(omdbURL, function(error, response, body) {
        if (!error && response.statusCode == 200) {
 
        var movieData = JSON.parse(body);

        movieArray.push({
          'Title: ' : movieData.Title,
          'Year: ' : movieData.Year,
          'Rated: ' : movieData.Rated,
          'IMDB Rating: ' : movieData.imdbRating,
          'Country: ' : movieData.Country,
          'Language: ' : movieData.Language,
          'Plot: ' : movieData.Plot,
          'Actors: ' : movieData.Actors,
          'Rotten Tomatoes Rating: ' : movieData.tomatoRating,
          'Rotten Tomatoes URL: ' : movieData.tomatoURL,
        });
      };
    console.log(movieArray);
    logLiri("movie-this", JSON.stringify(movieArray));
  });
};

var doWhatItSays = function() {
  fs.readFile("./random.txt", "utf8", function(error, response) {
    var logArray = response.split(',')
    if (logArray.length == 2) {
      functionOptions(logArray[0], logArray[1]);
    } else if (logArray.length == 1) {
      functionOptions(logArray[0]);
    }
  });
}

startLiri(process.argv[2], process.argv[3]);