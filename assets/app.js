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
    var giphyKeyword = "";
    var count = 10;


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
            image.attr("data-still", stillURL);
            image.attr("data-play", gifURL);
            image.addClass("giphy-element");
            // Append(image) to gif block
            $("#gif-block").append(image);
        })
    }

    function searchGiphy(keyword) {
        //Michelle's API key
        var api = "TuJVgn1PExKtbAesrbv0LoMl2YRf0kOm";
        //API URL that's being called
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
        //Removes the previous search results
        $(".giphy-element").remove();

        //Searches Giphy for the data name in the button
        searchGiphy($(this).attr("data-name"));

        giphyKeyword = ($(this).attr("data-name"));

        //Stores that name to convert to upper case
        var dataName = ($(this).attr("data-name"));
        $("#top-ten-span").text("Top Ten " + dataName.charAt(0).toUpperCase() + dataName.substr(1).toLowerCase() + " Gifs!");

        //Adds the More Button to the page
        $("#more-button").show();
    });

    $(document).on("click", "#more-button", function (event) {
        //Removes the previous search results
        $(".giphy-element").remove();

        //Michelle's API key
        var api = "TuJVgn1PExKtbAesrbv0LoMl2YRf0kOm";
        //API URL that's being called
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphyKeyword + "&api_key=" + api + "&limit=" + newCount + "&rating=g";

        //Adds 10 more to the count
        var newCount = count + 10;
        console.log(newCount);
        //Logs new number into the count
        count = newCount;

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
            $(this).attr("data-state","play");
          } 
          //If the data state = "play"
          else if (state === "play") {
            //Switch the image souce to the data-still url
            $(this).attr("src", $(this).attr("data-still"));
            //Make the data state property "still"
            $(this).attr("data-state","play");        
          }
    })
    //Adds all buttons to the page from our myTVShows array
    renderButtons();
});