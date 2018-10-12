//Create an array of strings with topic of choice
var cartoons = ["Tom and Jerry", "Space Jam", "Tweety", "Spider Man", "Pinky and the Brain", "Animaniacs", "Bugs Bunny", "Donald Duck"];

//Create a function that creates a few default buttons from the array and displays them in HTML
function renderButtons() {

    $(".gif-buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < cartoons.length; i++) {

        var button = $("<button>");
        button.addClass("cartoons");
        button.attr("data-name", cartoons[i]);
        button.text(cartoons[i]);
        $(".gif-buttons").append(button);
    }
}
renderButtons();

$(".gif-button-submit").on("click", function (event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    var newCartoons = $(".gif-search").val().trim();
    // Adding the movie from the textbox to our array
    cartoons.push(newCartoons);

    renderButtons();

});

$(".cartoons").on("click", function () {
    var userCartoons = $(this).attr("data-name");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        userCartoons + "&api_key=s6T0C4jjmcTkxvrGD6yD7HixTyV2ntAr&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(response);

            var results = response.data;

            //Looping through the path for each result item
            for (var i = 0; i < results.length; i++) {

                //Assigning the variables so that the gif can be stored and be prepended in order to show up in HTML
                var cartoonDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var cartoonImage = $("<img>");
                cartoonImage.attr("src", results[i].images.original_still.url);
                cartoonImage.attr("data-animate", results[i].images.original.url);
                console.log(cartoonImage);
                cartoonImage.addClass("image-div");
                // console.log(cartoonImage);

                cartoonDiv.append(p);
                cartoonDiv.append(cartoonImage);

                $(".gif-display").prepend(cartoonDiv);

            }
        });

});

$(document).on("click", ".image-div", function () {
    var state = $(this).attr("data-state");

    // console.log("it works");

    // if (state === "still") {
    //     $(this).attr("src", $(this).attr("data-animate"));
    //     $(this).attr("data-state", "animate");
    // } else {
    //     $(this).attr("src", $(this).attr("data-still"));
    //     $(this).attr("data-state", "still");
    // }
})




//PATH OF GIPHY API:
//data[0].images.original.url
//data[0].images.original_still.url




//Add form to page that takes user input and appends it to the topic array in order to create brand new buttons and display on the page

//Create a function with an if/else statement that tells the GIF image to animate from upon clicking it
//Make animated image static upon another click



// ALREADY DONE
//Create an on CLICK event that displayes 10 static GIPHYs from the GIPGHY API and places on the page "gif-display" div
//Create a function that displays rating for every GIPHY using the GIPHY API


