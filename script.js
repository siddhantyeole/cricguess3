// JavaScript code
// Define a mapping between image URLs and runs scored
const imageRunsMapping = {
  'https://imgpile.com/images/DPALlX.jpg': 149, //abd
  'https://imgpile.com/images/DogF13.jpg': 172, //finch
  'https://imgpile.com/images/DPAoX2.jpg': 82, //kohli
  'https://imgpile.com/images/DPAqpG.jpg': 400, //lara
  'https://imgpile.com/images/DPAATa.jpg': 264, //rohit
  'https://imgpile.com/images/Dogg2w.jpg': 144, //smith
  'https://imgpile.com/images/DogQKl.jpg': 335, //warner
  'https://imgpile.com/images/DogvaF.jpg': 237, //guptill
  'https://imgpile.com/images/DqDbz1.jpg': 200, //sachin
  'https://imgpile.com/images/DqDdvL.png': 251, //kane
  'https://imgpile.com/images/DqD9wx.jpg': 135 //stokes (ashes)
  // Add more entries for other images...
};

// DOM elements
const playerImage = document.getElementById("player-image");
const guessForm = document.getElementById("guess-form");
const runsGuessInput = document.getElementById("runs-guess");
const scoreDisplay = document.getElementById("final-score");
const pointsEarnedDisplay = document.getElementById("points-earned");
const continueButton = document.getElementById("continue-button");
const gameOverScreen = document.getElementById("game-over-screen");
const submitButton = document.getElementById("submit-button");
const runsOverlay = document.getElementById("runs-overlay");
const roundDisplay = document.getElementById("round-display");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const gameContent = document.getElementById("game-content");
const playAgainButton = document.getElementById("play-again-button");

// Event listeners
let currentRound = 0;
let score = 0;

// Function to start a new round
function startNewRound() {
  // Show the input box when starting a new round
  runsGuessInput.style.display = "block";
  submitButton.style.display = "block";
  runsOverlay.style.display = "none";
  roundDisplay.style.display = "none"

  // Hide the "Play Again" button at the start of each round
  playAgainButton.style.display = "none";

  if (currentRound < 6) {
    const currentImageUrl = Object.keys(imageRunsMapping)[currentRound];
    playerImage.src = currentImageUrl;
    // Reset form and hide elements
    guessForm.reset();
    pointsEarnedDisplay.textContent = "";
    continueButton.style.display = "none";
    gameOverScreen.style.display = "none";
  } else {
    roundDisplay.style.display = "none"
    continueButton.style.display = "none";
    playAgainButton.style.display = "block";
    // Handle "Game Over"
    handleGameOver();
  }
}




// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Get the user's guess and parse it as an integer
  const userGuess = parseInt(runsGuessInput.value, 10);

  if (!isNaN(userGuess)) {
    // Get the actual runs for the current image
    const currentImageUrl = playerImage.src;
    const actualRuns = imageRunsMapping[currentImageUrl];

    runsOverlay.textContent = `Actual Runs: ${actualRuns}`;
    runsOverlay.style.display = "block";

    // Calculate the user's score based on the proximity of the guess
    const difference = Math.abs(userGuess - actualRuns);

    // Calculate the score on a scale from 0 to 1000
    const maxDifference = 1000; // Adjust this as needed
    const scoreDelta = Math.max(1000 - (difference * (1000 / maxDifference)), 0);

    // Update the score display
    score += Math.floor(scoreDelta);
    scoreDisplay.textContent = score;

    // Display the points earned from the current image
    pointsEarnedDisplay.textContent = `Points earned from this image: ${Math.floor(scoreDelta)}`;

    // Hide the input box after submitting
    runsGuessInput.style.display = "none";
    submitButton.style.display = "none";

    // Show the "Continue" button after the player submits their guess
    continueButton.style.display = "block";
  }
}

// Event listener for the form submission
guessForm.addEventListener("submit", handleSubmit);

// Function to handle "Game Over" logic
function handleGameOver() {
  // Display the "Game Over" screen
  gameOverScreen.style.display = "block";
  scoreDisplay.textContent = score;

  // Disable the guess form
  guessForm.style.display = "none";

  // Add an event listener to the "Play Again" button
  const playAgainButton = document.getElementById("play-again-button");
  playAgainButton.addEventListener("click", () => {
    // Hide the "Game Over" screen
    gameOverScreen.style.display = "none";

    // Reset the score, round, and displayed images
    score = 0;
    scoreDisplay.textContent = score;
    currentRound = 0;

    // Re-enable the guess form
    guessForm.style.display = "block";

    // Start a new round
    startNewRound();
  });
}
// Function to start the game when the "Start" button is clicked
function startGame() {
  // Hide the start screen
  document.getElementById("start-screen").style.display = "none";

  // Display the first round
  document.getElementById("round-screen").style.display = "block";

  // Start the first round
  startNewRound();
}

startButton.addEventListener("click", startGame);

// Event listener for the "Continue" button
continueButton.addEventListener("click", () => {
  // Start a new round when the player clicks "Continue"
  currentRound++;
  startNewRound();
});

// Event listener for the "Start" button
startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameContent.style.display = "block";
  startNewRound();
});
