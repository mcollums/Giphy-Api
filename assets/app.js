// When page loads...
// Load pre-made buttons from an array of strings
// User can add their own keyword to the array by typing it in the input box and pressing enter
// When the user presses a button...
// We use the giphy api to take that keyword...
// Search for giphy results and display the top 10 to the page
// Under each gif, it's rating is displayed and any other important information
// When a user presses a gif, it plays. 
// If the gif is playing and the user presses it, it stops.

// Optional: Add more gifs to the page
// When user clicks "see next 10 results"
//Add more giphy cards to the page
//Does not overwrite the current 10

//Optional: Allow users to add gifs to a favorites section
//Where will this be displayed?

$(document).ready(function () {
    $("#more-button").hide();

    var myTVShows = ["Community", "Broad City", "Big Little Lies", "Game of Thrones"];
    var gifURL = "";
    var stillURL = "";


    // Function for displaying movie data
    function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-all").empty();

        // Loops through the array 
        for (var i = 0; i < myTVShows.length; i++) {
            // variable of an empty button
            var a = $("<button>");
            // Adds a class of btn btn-info to our button for bootstrap
            a.addClass("btn btn-primary giphy-btn");
            // Added a data-attribute
            a.attr("data-name", myTVShows[i]);
            // Added a type-attribute for bootstrap
            a.attr("type", "button");
            // Provided the initial button text
            a.text(myTVShows[i]);
            // Added the button to the buttons-view div
            $("#buttons-all").append(a);
        }
    }

    function displayGifs(response) {
        //forEach 
        response.data.forEach(function (gif, index) {
            stillURL = gif.images.fixed_height_still.url;
            gifURL = gif.images.fixed_height.url;

            //makes new image tag for each gif
            var image = $("<img>");
            image.attr("src", stillURL);
            image.attr("data-state", "still");
            image.attr("img-url", stillURL);
            image.attr("gif-url", gifURL);
            image.addClass("giphy-element");
            // Append(image) to gif block
            $("#gif-block").append(image);
        })
    }

    function searchGiphy(keyword) {
        var api = "TuJVgn1PExKtbAesrbv0LoMl2YRf0kOm";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + keyword + "&api_key=" + api + "&limit=10&rating=g";

        // Creates AJAX call for the specific button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            displayGifs(response);
        });
    }

    // This function handles events where the add movie button is clicked
    $("#add-movie").on("click", function (event) {
        event.preventDefault();

        // This line of code will grab the input from the textbox
        var keyword = $("#movie-input").val().trim();

        if (keyword.length > 0) {
            // The movie from the textbox is then added to our array
            myTVShows.push(keyword);

            //Clears the input field after submitting
            var keyword = $("#movie-input").val("");

            // Calling renderButtons which handles the processing of our movie array
            renderButtons();
        }
    });


    //On click event that will grab the value of the button and populate the page
    $(document).on("click", ".giphy-btn", function (event) {
        $(".giphy-element").remove();
        searchGiphy($(this).attr("data-name"));
        var dataName = ($(this).attr("data-name"));
        $("#top-ten-span").text("Top Ten " + dataName.charAt(0).toUpperCase() + dataName.substr(1).toLowerCase() + " Gifs!");
        $("#more-button").show();
    });

    var isPlaying = false;

    $(document).on("click", "img", function (event) {
        console.log("This is outside the if statement " + $(this).attr("data-state"));
        // if ($(this).attr("data-state", "still")) {
        //     console.log("This is inside the if statement " + $(this).attr("data-state"));

        //     $(this).attr("src", $(this).attr("gif-url"));
        //     $(this).attr("data-state", "playing");
        // } else if ($(this).attr("data-state", "playing")) {
        //     console.log("This is inside the else if statement " + $(this).attr("data-state"));

        //     $(this).attr("data-state", "still"); 
        //     $(this).attr("src", $(this).attr("img-url"));
        // }

        if ($(this).data('state') === 'play') {
            console.log("This is inside the if statement " + $(this).attr("data-state"));

            $(this).attr("src", $(this).attr("img-url"));
            $(this).data('state') === 'still';
        }  
        
        else if ($(this).data('state') === 'still') {
            console.log("This is inside the else if statement " + $(this).attr("data-state"));

            ($(this).data('state') === 'play')
            $(this).attr("src", $(this).attr("gif-url"));
        }

        // if (isPlaying === false) {
        //     $(this).attr("src", $(this).attr("gif-url"));
        //     isPlaying = true;
        // } else if (isPlaying === true) {
        //     $(this).attr("src", $(this).attr("img-url"));
        //     isPlaying = false;
        // }
    })
        renderButtons();
    });