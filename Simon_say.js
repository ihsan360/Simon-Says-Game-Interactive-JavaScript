// Arrays to hold the game's sequence and the user's input sequence
let gameSeq = [];
let userSeq = [];

// Array of possible button colors
let btns = ["red", "green", "yellow", "blue"];

// Game state variables
let started = false; // Tracks if the game has started
let level = 0; // Tracks the current level
let highestScore = 0; // Tracks the highest score achieved during the session

// Select the <h2> element to display the current level
let h2 = document.querySelector("h2");

// Display the highest score on the page load
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("h1").innerText = `Simon Say Game - Highest Score: ${highestScore}`;
});

// Listen for a key press to start the game
document.addEventListener("keypress", function() {
    if (!started) { // Only start the game if it hasn't already started
        console.log("Game is started");
        started = true; // Set the game state to started
        levelUp(); // Begin the first level
    }
});

// Function to flash the game button to show the game sequence
function gameFlash(btn) {
    btn.classList.add("flash"); // Add the 'flash' class to create a flashing effect
    setTimeout(function() {
        btn.classList.remove("flash"); // Remove the 'flash' class after 250ms
    }, 250);
}

// Function to flash the button when the user clicks it
function userFlash(btn) {
    btn.classList.add("user-flash"); // Add the 'user-flash' class to create a user-specific flash effect
    setTimeout(function() {
        btn.classList.remove("user-flash"); // Remove the 'user-flash' class after 250ms
    }, 250);
}

// Function to increase the game level and generate the next sequence
function levelUp() {
    userSeq = []; // Clear the user's sequence for the new level
    level++; // Increase the level count
    h2.innerText = `Level ${level}`; // Update the level display in the <h2> element
    
    // Randomly select the next color in the sequence
    let randIdx = Math.floor(Math.random() * btns.length); // Generate a random index
    let randColor = btns[randIdx]; // Select a random color from the btns array
    let randBtn = document.querySelector(`.${randColor}`); // Select the corresponding button element
    
    gameSeq.push(randColor); // Add the selected color to the game sequence
    console.log(gameSeq); // Log the current game sequence to the console
    gameFlash(randBtn); // Flash the selected button to indicate the sequence to the user
}

// Function to check the user's input against the game sequence
function checkUserColor(idx) {
    // Check if the current user input matches the corresponding game sequence
    if(gameSeq[idx] === userSeq[idx]) {
        // If the user's input sequence is complete and correct, proceed to the next level
        if(gameSeq.length === userSeq.length) {
            setTimeout(levelUp, 1000); // Wait 1 second before starting the next level
        }
    } else {
        // If the user made a mistake, update the highest score if needed
        updateHighestScore();
        
        // Display the game over message with the final score
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Please press any key to start`;
        
        // Temporarily change the background color to red as feedback for the game over
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white"; // Revert background color to white after 500ms
        }, 500);
        
        // Reset the game state to allow a new game to start
        reset();
    }
}

// Function to handle button clicks by the user
function btnPress() {
    let btnThis = this; // 'this' refers to the button that was clicked
    userFlash(btnThis); // Flash the button to indicate the user's selection

    let userColor = btnThis.getAttribute("id"); // Get the ID (color) of the clicked button
    userSeq.push(userColor); // Add the user's selected color to the userSeq array

    checkUserColor(userSeq.length - 1); // Check if the user's sequence matches the game sequence so far
}

// Attach the click event listener to each game button
let btnsAll = document.querySelectorAll(".btn"); // Select all game buttons
for(let btn of btnsAll) {
    btn.addEventListener("click", btnPress); // Attach the btnPress function to each button's click event
}

// Function to update the highest score if the current level is a new high
function updateHighestScore() {
    if (level > highestScore) { // Check if the current score is higher than the previous highest score
        highestScore = level; // Update the highest score
        document.querySelector("h1").innerText = `Simon Say Game - Highest Score: ${highestScore}`; // Update the display
    }
}

// Function to reset the game state after a game over
function reset() {
    started = false; // Reset the game state to not started
    level = 0; // Reset the level to 0
    gameSeq = []; // Clear the game sequence
    userSeq = []; // Clear the user's sequence
}
