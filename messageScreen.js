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

// Function to add a message to the chat
function addMessage(text, type) {
    const messageContainer = document.querySelector('.message-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = text;
    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Function to start the game with a random prompt
function startGame() {
    const randomPromptIndex = Math.floor(Math.random() * prompts.length);
    const randomPrompt = prompts[randomPromptIndex];
    addMessage(randomPrompt, 'received');
    provideChoices(randomPromptIndex);
}

// Function to provide choices based on the current scenario
function provideChoices(scenarioIndex) {
    let currentChoices;
    switch (scenarioIndex) {
        case 0:
            currentChoices = choices.forest;
            break;
        case 1:
            currentChoices = choices.castle;
            break;
        case 2:
            currentChoices = choices.map;
            break;
        case 3:
            currentChoices = choices.marketplace;
            break;
        case 4:
            currentChoices = choices.dragon;
            break;
    }
    
    addMessage("Choose your action:", "received");
    currentChoices.forEach((choice, index) => {
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
        // Placeholder: Respond based on the player's choice
        addMessage("Interesting choice! What happens next?", "received");
    }
}

document.getElementById('sendMessage').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Start the game when the page loads
window.onload = startGame;
