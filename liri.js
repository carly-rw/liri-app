var twitterKeys = require("./keys.js");
var Twitter = require("twitter");

var TWconsumerKey = twitterKeys.consumer_key;

console.log(TWconsumerKey);

var TWconsumerSecret = twitterKeys.consumer_secret;
var TWaccessToken = twitterKeys.access_token_key;
var TWaccessSecret = twitterKeys.access_token_secret;

var client = new Twitter({
	consumer_key: TWconsumerKey,
	consumer_secret: TWconsumerSecret,
	access_token_key: TWaccessToken,
	access_token_secret: TWaccessSecret,
});

var input = process.argv[2];
var parameter = process.argv[3];


if (input === "my-tweets") {
	client.get('statuses/user_timeline', {count: 20, screen_name: 'carlylumel'}, function(error, tweets, response){
		//if(error) throw error;
		console.log(tweets);
		console.log(response);
	});
};

if (input === "spotify-this-song") {

}

if (input === "movie-this") {

}

if (input === "do-what-it-says");