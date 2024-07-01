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

    function initializeGame() {
        const characters = JSON.parse(localStorage.getItem('characters')) || [];
        if (characters.length > 0) {
            characterSelection.classList.remove('hidden');
            displayCharacters();
        } else {
            startButton.classList.remove('hidden');
        }
    }

    startButton.addEventListener('click', function() {
        startButton.classList.add('hidden');
        characterCreation.classList.remove('hidden');
    });

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

    newCharacterButton.addEventListener('click', function() {
        characterSelection.classList.add('hidden');
        characterCreation.classList.remove('hidden');
    });

    generateStatsButton.addEventListener('click', autoGenerateStats);

    function saveCharacter(name, stats) {
        const characters = JSON.parse(localStorage.getItem('characters')) || [];
        characters.push({ name, stats });
        localStorage.setItem('characters', JSON.stringify(characters));
    }

    function displayCharacters() {
        const characters = JSON.parse(localStorage.getItem('characters')) || [];
        characterList.innerHTML = '';
        characters.forEach(character => {
            const li = document.createElement('li');
            li.textContent = character.name;

            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('character-buttons'); // New class for button container with gap

            const selectRadio = document.createElement('input');
            selectRadio.type = 'radio';
            selectRadio.name = 'character-select';
            selectRadio.value = character.name;
            selectRadio.id = `select-${character.name}`; // Unique ID for radio button
            selectRadio.addEventListener('change', function() {
                const selectedCharacter = character.name;
                characterNameDisplay.textContent = `Selected Character: ${selectedCharacter}`;
                navCharacterDisplay.textContent = `Selected: ${selectedCharacter}`; // Update navigation display
                alert(`Character "${character.name}" selected!`);
                // You can add further actions here upon selecting a character
            });

            const viewButton = document.createElement('button');
            viewButton.innerHTML = '<i class="fas fa-eye"></i>'; // Font Awesome icon for view
            viewButton.style.color = 'white'; // Setting text color to white
            viewButton.addEventListener('click', function() {
                displayCharacterSheet(character);
            });


            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Font Awesome icon for delete
            deleteButton.style.color = 'red';
            deleteButton.addEventListener('click', function() {
                deleteCharacter(character);
                displayCharacters();
            });

            buttonsDiv.appendChild(selectRadio);
            buttonsDiv.appendChild(viewButton);
            buttonsDiv.appendChild(deleteButton);
            li.appendChild(buttonsDiv);
            characterList.appendChild(li);
        });
    }


    function deleteCharacter(characterToDelete) {
        const characters = JSON.parse(localStorage.getItem('characters')) || [];
        const updatedCharacters = characters.filter(character => character.name !== characterToDelete.name);
        localStorage.setItem('characters', JSON.stringify(updatedCharacters));
    }

    function displayCharacterSheet(character) {
        characterNameDisplay.textContent = `Name: ${character.name}`;
        characterStrength.textContent = `Strength: ${character.stats.strength}`;
        characterDexterity.textContent = `Dexterity: ${character.stats.dexterity}`;
        characterConstitution.textContent = `Constitution: ${character.stats.constitution}`;
        characterIntelligence.textContent = `Intelligence: ${character.stats.intelligence}`;
        characterWisdom.textContent = `Wisdom: ${character.stats.wisdom}`;
        characterCharisma.textContent = `Charisma: ${character.stats.charisma}`;
        characterSheet.style.display = 'block';
    }

    function autoGenerateStats() {
        const min = 1;
        const max = 20;
        document.getElementById('strength').value = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('dexterity').value = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('constitution').value = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('intelligence').value = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('wisdom').value = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('charisma').value = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    initializeGame();
});