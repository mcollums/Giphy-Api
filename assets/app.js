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
    var myArray = ["cat", "dog", "horse"];

    // Function for displaying movie data
    function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-all").empty();

        // Loops through the array of movies
        for (var i = 0; i < myArray.length; i++) {

            // Then dynamicaly generates buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adds a class of movie to our button
            a.addClass("btn btn-info");
            // Added a data-attribute
            a.attr("data-name", myArray[i]);
            // Added a type-attribute
            a.attr("type", "button");
            // Provided the initial button text
            a.text(myArray[i]);
            // Added the button to the buttons-view div
            $("#buttons-all").append(a);
        }
    }

    renderButtons();




});