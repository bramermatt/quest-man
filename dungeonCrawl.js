// Define global variables to store characters and current selected character
let characters = [];
let selectedCharacter = null;

// Function to create a new character object
function createCharacter(name, strength, dexterity, constitution, intelligence, wisdom, charisma) {
    return {
        name,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma
    };
}

// Function to display characters in the character list
function displayCharacterList() {
    const characterList = document.getElementById('character-list');
    characterList.innerHTML = '';
    characters.forEach((character, index) => {
        const li = document.createElement('li');
        li.textContent = character.name;
        li.addEventListener('click', () => selectCharacter(index));
        characterList.appendChild(li);
    });
}

// Function to handle character creation form submission
function handleCharacterCreation(event) {
    event.preventDefault();
    const form = event.target;
    const characterName = form.elements['character-name'].value;
    const strength = parseInt(form.elements['strength'].value);
    const dexterity = parseInt(form.elements['dexterity'].value);
    const constitution = parseInt(form.elements['constitution'].value);
    const intelligence = parseInt(form.elements['intelligence'].value);
    const wisdom = parseInt(form.elements['wisdom'].value);
    const charisma = parseInt(form.elements['charisma'].value);

    const newCharacter = createCharacter(characterName, strength, dexterity, constitution, intelligence, wisdom, charisma);
    characters.push(newCharacter);
    displayCharacterList();
    form.reset();
}

// Function to select a character
function selectCharacter(index) {
    selectedCharacter = characters[index];
    const characterSheet = document.getElementById('character-sheet');
    characterSheet.classList.remove('hidden');
    document.getElementById('character-name-display').textContent = `Name: ${selectedCharacter.name}`;
    document.getElementById('character-strength').textContent = `Strength: ${selectedCharacter.strength}`;
    // Display other character attributes similarly
}

// Function to start the adventure
function startAdventure() {
    if (!selectedCharacter) {
        alert('Please select a character to start the adventure!');
        return;
    }
    // Hide character selection UI and show adventure UI
    document.getElementById('character-selection').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    // Begin adventure by displaying initial scenario or welcome message
    const output = document.getElementById('output');
    output.innerHTML = '<p>Welcome to the Dungeon Adventure!</p>';
    // Additional logic to handle user interaction and game flow
}

// Event listeners for form submission and button clicks
document.getElementById('character-form').addEventListener('submit', handleCharacterCreation);
document.getElementById('start-button').addEventListener('click', startAdventure);
document.getElementById('new-character-button').addEventListener('click', () => {
    document.getElementById('character-creation').classList.remove('hidden');
    document.getElementById('character-selection').classList.add('hidden');
});