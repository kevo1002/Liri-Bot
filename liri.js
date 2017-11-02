var fs = require("fs");
var request = require("request");
var keys = require("./keys");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var apiCall = process.argv[2];
var nodeArgs = process.argv;
var title = "";

for (var i = 3; i < nodeArgs.length; i++) {
  
  if (i > 3 && i < nodeArgs.length) {
    title += "+" + nodeArgs[i];
  }
  else {
    title += nodeArgs[i];
  }
};

//Twitter
function getTweets(){
	var twitterClient = new Twitter(keys.twitter);
	var params = {screen_name: 'wakandaCode'};
	twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
 	if (error) {
 		console.log(error);
 	}
 	else if (!error) {
 		console.log("-----------");
  	for (var i = 0; i < tweets.length; i++) {
  		console.log("Tweet"+ [i] + ": " + tweets[i].text);
  	}
  		console.log("-----------");
	};
	});
};

//Spotify
function getSong() {
	var spotifyClient = new Spotify(keys.spotify);
	spotifyClient.search({ type: 'track', query: title }, function(err, data) {
  	if (err) {
    	return console.log('Error occurred: ' + err);
  	}
 			
 	console.log("-----------");
    console.log("");
	console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
	console.log("Song: " + data.tracks.items[0].name);
	console.log("URL: " + data.tracks.items[0].external_urls.spotify);
	console.log("Album: " + data.tracks.items[0].album.name); 
	console.log("");
   	console.log("-----------");
});
	
};

//OMDB
function getMovie(){
		request("http://www.omdbapi.com/?t="+ title +"&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		if (!error && response.statusCode === 200) {
		console.log("-----------");
    	console.log("");
    	console.log("Title: " + JSON.parse(body).Title);
    	console.log("Year: " + JSON.parse(body).Year);
    	console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
    	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    	console.log("County of Origin: " + JSON.parse(body).Country);
    	console.log("Language: " + JSON.parse(body).Language);
    	console.log("Plot: " + JSON.parse(body).Plot);
    	console.log("Cast: " + JSON.parse(body).Actors);
    	console.log("");
   		console.log("-----------");
  }
});

};

function getText(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		var array = data.split(",");
		title = array[1];
		getSong(title);
	})
};

switch (apiCall){
	case text = "tweets":
		getTweets();
		break;
	case text = "spotify":
		getSong();
		break;
	case text = "movie":
		getMovie();
		break;
	case text = "do-this":
		getText();
		break;
	default: 
			console.log('Enter a command');

};

