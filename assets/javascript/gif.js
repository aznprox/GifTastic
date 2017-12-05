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

$(".the-gifs").empty();

var city = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&limit=10&rating:g&api_key=5nVZzYqGL33i2DM7dYvjli5DJTblS7hk";


$.ajax({
	url: queryURL,
	method: "GET"
}).done(function(response){

	var results = response.data;
console.log(results);
	for (var i = 0; i < results.length; i++) {

		var cityDiv = $("<div>");
		var boxRating = $("<p>").text("Rating: " + results[i].rating);

		var cityImage = $("<img>");
		cityImage.attr("src", results[i].images.fixed_height_still.url);
		cityImage.attr("data-animate", results[i].images.fixed_height.url);
		cityImage.attr("data-still", results[i].images.fixed_height_still.url);
		cityImage.attr("data-state", "still");
		cityImage.addClass("pictures");


		cityDiv.append(cityImage);
		cityDiv.append(boxRating);

		$(".the-gifs").append(cityDiv);
	}

	

})

}

    function animatePictures() {
      
      var state = $(this).attr("data-state");
      console.log(state);

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }









$(document).on("click", ".locations", displayCityGif);
$(document).on("click", ".pictures", animatePictures);

init();


});
