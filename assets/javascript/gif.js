$( document ).ready(function() {

var cities = ["Atlanta", "Chicago", "Miami", "Dallas", "Austin", "Houston"];


function init(){

showButtons();
submit();
}

function showButtons(){

	$(".city-buttons").empty();

	for (var i = 0; i < cities.length; i++) {

		var c =$("<button>");

		c.addClass("locations");

		c.attr("data-name", cities[i]);

		c.text(cities[i]);

		$(".city-buttons").append(c);

	}
}

function submit(){
$("#add-cities").on("click", function(event){
event.preventDefault();

var typedCities = $(".form-control").val().trim();

cities.push(typedCities);

$(".form-control").val('')

showButtons();

});
}

function displayCityGif(){

var city = $(this).attr("locations");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=5nVZzYqGL33i2DM7dYvjli5DJTblS7hk&limit=5"

console.log(city);

$.ajax({
	url: queryURL,
	method: "GET"
}).done(function(response){
	console.log(response)

	var results = response.data;
	
	for (var i = 0; i < cities.length; i++) {

		var cityDiv = $("<div>");
		var boxRating = $("<p>").text("Rating: " + results[i].type);

		var cityImage = $("<img>");
		cityImage.attr("src", results[i].images.fixed_height.url);

		cityDiv.append(cityImage);
		cityDiv.append(boxRating);

		$(".the-gifs").append(cityDiv);
	}

	

})

}











$(document).on("click", ".locations", displayCityGif);

init();


});