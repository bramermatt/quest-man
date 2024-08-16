 // Array of possible starting prompts
 const prompts = [
    "You wake up in a dark forest. The air is cold, and you hear distant howling. What do you do?",
    "You find yourself standing before a grand castle with a moat. The drawbridge is up. What do you do?",
    "A mysterious figure hands you an ancient map. It points to a hidden treasure deep within the mountains. What do you do?",
    "You are in a bustling marketplace. A pickpocket just grabbed your coin purse and is running away. What do you do?",
    "A dragon is blocking the only exit out of a cave. Smoke billows from its nostrils as it stares at you. What do you do?"
];

// Possible responses and choices for each scenario
const choices = {
    forest: [
        "Look around for shelter.",
        "Try to find the source of the howling.",
        "Climb a tree to get a better view.",
        "Sit and wait for help."
    ],
    castle: [
        "Search for a way to lower the drawbridge.",
        "Shout for someone to let you in.",
        "Look for a secret entrance.",
        "Leave the castle and explore the surroundings."
    ],
    map: [
        "Study the map closely for clues.",
        "Ask the mysterious figure for more information.",
        "Set off immediately toward the mountains.",
        "Hide the map and pretend you never saw it."
    ],
    marketplace: [
        "Chase after the pickpocket.",
        "Shout for help.",
        "Try to remember what the pickpocket looked like.",
        "Forget about it and continue shopping."
    ],
    dragon: [
        "Try to sneak past the dragon.",
        "Talk to the dragon and try to reason with it.",
        "Look around for a weapon to fight the dragon.",
        "Retreat back into the cave."
    ]
};

// Game state to track scenarios, choices, and history
let gameState = {
    scenario: null,
    currentChoices: [],
    previousChoices: [],
    history: []
};

// Function to add a message to the chat
function addMessage(text, type) {
    const messageContainer = document.getElementById('messageContainer');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = text;
    messageContainer.appendChild(messageDiv);

    // Ensure the latest message is visible, accounting for bottom padding
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Function to start the game with a random prompt
function startGame() {
    const randomPromptIndex = Math.floor(Math.random() * prompts.length);
    gameState.scenario = randomPromptIndex;
    const randomPrompt = prompts[randomPromptIndex];
    addMessage(randomPrompt, 'received');
    provideChoices(randomPromptIndex);
}

// Function to provide choices based on the current scenario
function provideChoices(scenarioIndex) {
    switch (scenarioIndex) {
        case 0:
            gameState.currentChoices = choices.forest;
            break;
        case 1:
            gameState.currentChoices = choices.castle;
            break;
        case 2:
            gameState.currentChoices = choices.map;
            break;
        case 3:
            gameState.currentChoices = choices.marketplace;
            break;
        case 4:
            gameState.currentChoices = choices.dragon;
            break;
    }

    addMessage("Choose your action:", "received");
    gameState.currentChoices.forEach((choice, index) => {
        addMessage(`${index + 1}. ${choice}`, "received");
    });
}

// Event listener for the SEND button and ENTER key
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    if (messageText) {
        addMessage(messageText, 'sent');
        messageInput.value = '';

        // Process the player's choice
        handlePlayerChoice(messageText);
    }
}

function handlePlayerChoice(choiceText) {
    const selectedChoiceIndex = parseInt(choiceText) - 1;
    if (!isNaN(selectedChoiceIndex) && selectedChoiceIndex >= 0 && selectedChoiceIndex < gameState.currentChoices.length) {
        const selectedChoice = gameState.currentChoices[selectedChoiceIndex];
        gameState.previousChoices.push(selectedChoice);
        gameState.history.push({ scenario: gameState.scenario, choice: selectedChoice });

        // Add a dynamic response based on the choice
        addMessage(`You chose: "${selectedChoice}".`, 'received');

        // Update the state and progress to the next scenario or response
        provideNextScenario();
    } else {
        addMessage("Invalid choice. Please pick a valid option.", "received");
        // Show choices again
        gameState.currentChoices.forEach((choice, index) => {
            addMessage(`${index + 1}. ${choice}`, "received");
        });
    }
}

function provideNextScenario() {
    // Here, you can introduce logic to provide unique responses based on the gameState.
    if (gameState.history.length === 1) {
        if (gameState.previousChoices.includes("Climb a tree to get a better view.")) {
            addMessage("From above, you spot a faint light in the distance. Should you investigate?", "received");
            gameState.currentChoices = ["Investigate the light.", "Ignore the light and stay put."];
            addMessage("Choose your action:", "received");
            gameState.currentChoices.forEach((choice, index) => {
                addMessage(`${index + 1}. ${choice}`, "received");
            });
        } else {
            addMessage("Your journey has just begun. Who knows what lies ahead?", "received");
        }
    } else if (gameState.history.length === 2) {
        addMessage("You feel a change in the air. Your choices are shaping your fate.", "received");
    } else {
        addMessage("The adventure continues... but that’s a story for another time!", "received");
    }

    // Optionally, reset the game or allow for more complex story branching.
}

// Event listeners for sending messages
document.getElementById('sendMessage').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Start the game when the page loads
window.onload = startGame;