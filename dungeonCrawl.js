// Function to start dungeon crawl game
function startDungeonCrawl(character) {
    // Initialize game state
    let currentRoom = 0;
    const dungeon = {
        rooms: [
            { description: 'You enter a dark room. There is a faint glow in the corner.', hasMonster: true },
            { description: 'You find a long corridor with several closed doors.', hasMonster: false },
            { description: 'You discover a treasure chest at the end of a narrow passage.', hasMonster: false }
        ]
    };




// Function to handle user input and progress game
function handleGameProgress() {
    if (currentRoom < dungeon.rooms.length) {
        const room = dungeon.rooms[currentRoom];
        if (room.hasMonster) {
            // Example: Show combat options or interaction buttons
            showCombatOptions(room);
        } else {
            // Example: Show exploration options
            showExplorationOptions(room);
        }
    } else {
        // Game ends
        endGame();
    }
}

    // Function to show combat options
    function showCombatOptions(room) {
        clearScreen();
        const container = document.createElement('div');
        container.classList.add('game-container');

        const description = document.createElement('p');
        description.textContent = room.description;
        container.appendChild(description);

        const combatActions = document.createElement('div');
        combatActions.classList.add('combat-actions');

        const attackButton = document.createElement('button');
        attackButton.textContent = 'Attack Monster';
        attackButton.addEventListener('click', () => {
            // Example: Implement combat logic
            simulateCombat();
            currentRoom++;
            handleGameProgress();
        });
        combatActions.appendChild(attackButton);

        const fleeButton = document.createElement('button');
        fleeButton.textContent = 'Flee';
        fleeButton.addEventListener('click', () => {
            fleeCombat();
            currentRoom++;
            handleGameProgress();
        });
        combatActions.appendChild(fleeButton);

        container.appendChild(combatActions);
        document.body.appendChild(container);
    }

    // Function to simulate combat
    function simulateCombat() {
        // Example: Implement combat logic
        alert('You defeated the monster! Proceed to the next room.');
    }

    // Function to handle fleeing combat
    function fleeCombat() {
        // Example: Implement flee logic
        alert('You managed to escape from the monster and proceed to the next room.');
    }

    // Function to show exploration options
    function showExplorationOptions(room) {
        clearScreen();
        const container = document.createElement('div');
        container.classList.add('game-container');

        const description = document.createElement('p');
        description.textContent = room.description;
        container.appendChild(description);

        const continueButton = document.createElement('button');
        continueButton.textContent = 'Continue';
        continueButton.addEventListener('click', () => {
            currentRoom++;
            handleGameProgress();
        });
        container.appendChild(continueButton);

        document.body.appendChild(container);
    }

// Function to end the game
function endGame() {
    clearScreen();
    const container = document.createElement('div');
    container.classList.add('game-container');

    const endMessage = document.createElement('p');
    endMessage.textContent = `Congratulations! You completed your dungeon crawl with ${character.name}.`;
    container.appendChild(endMessage);

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.addEventListener('click', () => {
        currentRoom = 0;
        handleGameProgress();
    });
    container.appendChild(restartButton);

    createCloseButton(); // Add close button
    document.body.appendChild(container);
}

    // Function to create a close button
    function createCloseButton() {
        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.classList.add('close-button');
        closeButton.addEventListener('click', function() {
            clearScreen();
            initializeGame(); // Return to main game or character selection screen
        });
        document.body.appendChild(closeButton);
    }

    // Function to clear the screen
    function clearScreen() {
        document.body.innerHTML = '';
    }

    // Function to add a message to game messages
// function addMessageToGame(message) {
//     const gameMessages = document.getElementById('game-messages');
//     const messageElement = document.createElement('p');
//     messageElement.textContent = message;
//     gameMessages.appendChild(messageElement);
//     gameMessages.scrollTop = gameMessages.scrollHeight; 
// }

// addMessageToGame('You enter a dark dungeon...');
// addMessageToGame('A monster approaches!');


    // Start the game
    handleGameProgress();
}


