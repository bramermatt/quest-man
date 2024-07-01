document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const characterCreation = document.getElementById('character-creation');
    const characterForm = document.getElementById('character-form');
    const characterSelection = document.getElementById('character-selection');
    const characterList = document.getElementById('character-list');
    const newCharacterButton = document.getElementById('new-character-button');
    const generateStatsButton = document.getElementById('generate-stats-button');
    const characterSheet = document.getElementById('character-sheet');
    const characterNameDisplay = document.getElementById('character-name-display');
    const characterStrength = document.getElementById('character-strength');
    const characterDexterity = document.getElementById('character-dexterity');
    const characterConstitution = document.getElementById('character-constitution');
    const characterIntelligence = document.getElementById('character-intelligence');
    const characterWisdom = document.getElementById('character-wisdom');
    const characterCharisma = document.getElementById('character-charisma');
    const navCharacterDisplay = document.getElementById('nav-character-display');
    const startGameButton = document.getElementById('start-game-button');

    // Function to initialize game
    function initializeGame() {
        const characters = JSON.parse(localStorage.getItem('characters')) || [];
        if (characters.length > 0) {
            characterSelection.classList.remove('hidden');
            displayCharacters();
            startButton.classList.add('hidden');
        } else {
            startButton.classList.remove('hidden');
            characterCreation.classList.remove('hidden');
        }
    }

    // Event listener for start button
    startButton.addEventListener('click', function() {
        startButton.classList.add('hidden');
        characterCreation.classList.remove('hidden');
    });

    // Event listener for character form submission
    characterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const characterName = document.getElementById('character-name').value;
        const stats = {
            strength: document.getElementById('strength').value,
            dexterity: document.getElementById('dexterity').value,
            constitution: document.getElementById('constitution').value,
            intelligence: document.getElementById('intelligence').value,
            wisdom: document.getElementById('wisdom').value,
            charisma: document.getElementById('charisma').value
        };
        saveCharacter(characterName, stats);
        characterForm.reset();
        characterCreation.classList.add('hidden');
        characterSelection.classList.remove('hidden');
        displayCharacters();
    });

    // Event listener for new character button
    newCharacterButton.addEventListener('click', function() {
        characterSelection.classList.add('hidden');
        characterCreation.classList.remove('hidden');
    });

    // Event listener for auto-generate stats button
    generateStatsButton.addEventListener('click', autoGenerateStats);

    // Event listener for start game button
    startGameButton.addEventListener('click', function() {
        const selectedCharacter = getSelectedCharacter();
        if (selectedCharacter) {
            startDungeonCrawl(selectedCharacter); // Call dungeon crawl function
        } else {
            alert('Please select a character to start the game!');
        }
    });

    // Function to save character to local storage
    function saveCharacter(name, stats) {
        const characters = JSON.parse(localStorage.getItem('characters')) || [];
        characters.push({ name, stats });
        localStorage.setItem('characters', JSON.stringify(characters));
    }

    // Function to display characters from local storage
    function displayCharacters() {
        const characters = JSON.parse(localStorage.getItem('characters')) || [];
        characterList.innerHTML = '';
        characters.forEach(character => {
            const li = document.createElement('li');
            li.textContent = character.name;

            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('character-buttons');

            const selectRadio = document.createElement('input');
            selectRadio.type = 'radio';
            selectRadio.name = 'character-select';
            selectRadio.value = character.name;
            selectRadio.id = `select-${character.name}`;
            selectRadio.addEventListener('change', function() {
                const selectedCharacter = character;
                updateNavCharacterDisplay(selectedCharacter.name);
                displayCharacterSheet(selectedCharacter);
                newCharacterButton.classList.add('hidden');
                startButton.classList.add('hidden');
                startGameButton.classList.remove('hidden');
                characterSelection.classList.add('hidden');
            });

            const viewButton = document.createElement('button');
            viewButton.innerHTML = '<i class="fas fa-user"></i>';
            viewButton.style.color = 'white';
            viewButton.addEventListener('click', function() {
                toggleCharacterSheet();
                displayCharacterSheet(character);
            });

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.style.color = 'red';
            deleteButton.addEventListener('click', function() {
                deleteCharacter(character.name);
                displayCharacters();
            });

            buttonsDiv.appendChild(selectRadio);
            buttonsDiv.appendChild(viewButton);
            buttonsDiv.appendChild(deleteButton);
            li.appendChild(buttonsDiv);
            characterList.appendChild(li);
        });
    }

    // Function to delete character from local storage
    function deleteCharacter(name) {
        let characters = JSON.parse(localStorage.getItem('characters')) || [];
        characters = characters.filter(character => character.name !== name);
        localStorage.setItem('characters', JSON.stringify(characters));
    }

    // Function to display character sheet
    function displayCharacterSheet(character) {
        characterSheet.classList.remove('hidden');
        characterNameDisplay.textContent = `Name: ${character.name}`;
        characterStrength.textContent = `Strength (STR): ${character.stats.strength}`;
        characterDexterity.textContent = `Dexterity (DEX): ${character.stats.dexterity}`;
        characterConstitution.textContent = `Constitution (CON): ${character.stats.constitution}`;
        characterIntelligence.textContent = `Intelligence (INT): ${character.stats.intelligence}`;
        characterWisdom.textContent = `Wisdom (WIS): ${character.stats.wisdom}`;
        characterCharisma.textContent = `Charisma (CHA): ${character.stats.charisma}`;
    }

    // Function to toggle character sheet visibility
    function toggleCharacterSheet() {
        characterSheet.classList.toggle('hidden');
    }

    // Function to auto-generate character stats
    function autoGenerateStats() {
        const randomStats = {
            strength: Math.floor(Math.random() * 18) + 3,
            dexterity: Math.floor(Math.random() * 18) + 3,
            constitution: Math.floor(Math.random() * 18) + 3,
            intelligence: Math.floor(Math.random() * 18) + 3,
            wisdom: Math.floor(Math.random() * 18) + 3,
            charisma: Math.floor(Math.random() * 18) + 3
        };

        document.getElementById('strength').value = randomStats.strength;
        document.getElementById('dexterity').value = randomStats.dexterity;
        document.getElementById('constitution').value = randomStats.constitution;
        document.getElementById('intelligence').value = randomStats.intelligence;
        document.getElementById('wisdom').value = randomStats.wisdom;
        document.getElementById('charisma').value = randomStats.charisma;
    }

    // Function to get selected character
    function getSelectedCharacter() {
        const selectedRadio = document.querySelector('input[name="character-select"]:checked');
        if (selectedRadio) {
            const selectedName = selectedRadio.value;
            const characters = JSON.parse(localStorage.getItem('characters')) || [];
            return characters.find(character => character.name === selectedName);
        }
        return null;
    }

    // Function to update navigation character display
    function updateNavCharacterDisplay(name) {
        navCharacterDisplay.textContent = `${name}`;
    }

    // Initialize game
    initializeGame();
});
