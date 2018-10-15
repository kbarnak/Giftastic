//Create an array of strings with topic of choice
var cartoons = ["Tom and Jerry", "Space Jam", "Tweety", "Spider Man", "Pinky and the Brain", "Animaniacs", "Bugs Bunny", "Donald Duck"];

//Create a function that creates a few default buttons from the array and displays them in HTML
function renderButtons() {

    // Looping through the array of movies
    for (var i = 0; i < cartoons.length; i++) {

        var button = $("<button>");
        button.addClass("cartoons");
        button.attr("data-name", cartoons[i]);
        button.text(cartoons[i]);
        $(".gif-buttons").append(button);
    }
    //The unbind method allows you to click on the GIPHYs independently of one another by removing all handelers of attached to the element
    $(".gif-buttons").unbind("click");
    //On CLICK event that tells the GIPHY images to start
    $(".cartoons").on("click", function () {
        startGif($(this).text());
    })
}

//Create a function that adds brand new buttons to the .gif-button div that has the pre-existing buttons
function addButton(show) {

    if (cartoons.indexOf(show) === -1) {
        cartoons.push(show);
        $(".gif-buttons").empty();
    }

    renderButtons();
}

//Create function that pulls GIPHY API info that will later display them on the page
function startGif(show) {

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        show + "&api_key=s6T0C4jjmcTkxvrGD6yD7HixTyV2ntAr&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(response);

            var results = response.data;
            results.forEach(function (element) {

                //Assigning the variables so that the gif can be stored and be prepended in order to show up in HTML
                var cartoonDiv = $("<div>");
                var p = $("<p>").text("Rating: " + element.rating);
                var cartoonImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");

                //Assigning attributes to the newly created image
                cartoonImage.attr("state", "still");
                cartoonImage.attr("data-still", element.images.fixed_height_still.url);
                cartoonImage.attr("data-animate", element.images.fixed_height.url);

                console.log(cartoonImage);
                cartoonImage.addClass("image-div");

                //Appending the newly created image to the div and then prepending it to the HTML
                cartoonDiv.append(p);
                cartoonDiv.append(cartoonImage);

                $(".gif-display").prepend(cartoonDiv);

                //Conditional statement that animates the Giphy images when CLICKED
                $(".image-div").unbind("click");
                $(".image-div").on("click", function () {
                    if ($(this).attr("state") === "still") {
                        $(this).attr("state", "data-animate");
                        $(this).attr("src", $(this).attr("data-animate"))
                    } else {
                        $(this).attr("state", "still");
                        $(this).attr("src", $(this).attr("data-still"))
                    }
                })

            })

        })
}
//The function that gives generates new buttons once a name is typed into the search box
$(document).ready(function () {
    renderButtons();
    $(".gif-button-submit").on("click", function () {
        event.preventDefault();
        addButton($(".gif-search").val().trim());
        $(".gif-search").val("");
    })
})











