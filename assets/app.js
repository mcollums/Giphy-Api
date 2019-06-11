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

    // Global Variables
    //=========================================================================================
    var myTVShows = ["Community", "Broad City", "Last Week Tonight", "Game of Thrones", "The Late Show"];
    var gifURL = "";
    var stillURL = "";
    var giphyKeyword = "";
    var count = 10;
    var rating = "";
    var title = "";


    // Function for displaying the tv show buttons
    function renderButtons() {

        // Deletes the shows prior to adding new shows
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

    //This function searches giphy for the keyword and calls the displayGifs function at the end
    function searchGiphy(keyword) {
        //Michelle's API key
        var api = "TuJVgn1PExKtbAesrbv0LoMl2YRf0kOm";
        //API URL that's being called
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + keyword + "&api_key=" + api + "&limit=10&rating=g";

        // Creates AJAX call for the specific button being clicked and then calls the displayGifs function with the response data
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            displayGifs(response);
        });
    }

    //Function that displays the new gifs to the page
    function displayGifs(response) {
        //for each gif...
        response.data.forEach(function (gif) {
            // create these variables using the still image and gif urls
            stillURL = gif.images.fixed_height_still.url;
            gifURL = gif.images.fixed_height.url;
            rating = gif.rating;
            title = gif.title;

            //makes new image tag for each gif and adds the following attr and class
            var image = $("<img>");
            image.attr("src", stillURL);
            image.attr("data-state", "still");
            image.attr("data-still", stillURL);
            image.attr("data-play", gifURL);
            image.addClass("giphy-element");

            //New div and paragraph information
            var infoHTML = $("<p class='gif-tag'> Rating: " + rating + "<br></br> Title: " + title+ "</p>");
            var newDiv = $("<div>");

            // Append(image) to gif block
            $("#gif-block").append(newDiv).addClass("gif-div");
            $(newDiv).append(image);
            $(newDiv).append(infoHTML);
        })
    }



    // This function handles events where the add show button is clicked
    $("#add-show").on("click", function (event) {
        event.preventDefault();

        // This line of code will grab the input from the textbox
        var keyword = $("#show-input").val().trim();

        if (keyword.length > 0) {
            // The show from the textbox is then added to our array
            myTVShows.push(keyword);

            //Clears the input field after submitting
            var keyword = $("#show-input").val("");

            // Calling renderButtons which populates the buttons from the myTVShows array
            renderButtons();
        }
    });


    //On click event that will grab the value of the button and populate the page
    $(document).on("click", ".giphy-btn", function (event) {
        //Removes the previous search results
        $("#gif-block").empty();

        //Searches Giphy for the data name in the button
        searchGiphy($(this).attr("data-name"));

        giphyKeyword = ($(this).attr("data-name"));

        //Stores that name to convert to upper case
        var dataName = ($(this).attr("data-name"));
        $("#top-ten-span").text("Top Ten " + dataName.charAt(0).toUpperCase() + dataName.substr(1).toLowerCase() + " Gifs!");

        //Adds the More Button to the page
        $("#more-button").show();
    });


    //This onclick event adds 10 more gifs to the page 
    $(document).on("click", "#more-button", function (event) {
        event.preventDefault();

        console.log("I've been clicked!");
        //Removes the previous search results
        $("#gif-block").empty();

        //Michelle's API key
        var api = "TuJVgn1PExKtbAesrbv0LoMl2YRf0kOm";
        //API URL that's being called
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphyKeyword + "&api_key=" + api + "&limit=" + newCount + "&rating=g";

        // //Adds 10 more to the count
        var newCount = 20;

        // Creates AJAX call for the specific button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            displayGifs(response);
        });
    })

    //When you click a gif, it will switch the image source
    $(document).on("click", "img", function (event) {
        //variable of the data state property
        var state = ($(this).attr("data-state"));
        //If the data-state = still
        if (state === "still") {
            //Switch the image source to the data-play url
            $(this).attr("src", $(this).attr("data-play"));
            //Make the data state property "play"
            $(this).attr("data-state", "play");
        }
        //If the data state = "play"
        else if (state === "play") {
            //Switch the image souce to the data-still url
            $(this).attr("src", $(this).attr("data-still"));
            //Make the data state property "still"
            $(this).attr("data-state", "play");
        }
    })
    //Adds all buttons to the page from our myTVShows array
    renderButtons();
});