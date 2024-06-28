document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const characterCreation = document.getElementById('character-creation');
    const characterForm = document.getElementById('character-form');
    const characterSelection = document.getElementById('character-selection');
    const characterList = document.getElementById('character-list');
    const newCharacterButton = document.getElementById('new-character-button');

    startButton.addEventListener('click', function() {
        startButton.classList.add('hidden');
        characterCreation.classList.remove('hidden');
        displayCharacters();
    });

    characterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const characterName = document.getElementById('character-name').value;
        createCharacter(characterName);
        characterForm.reset();
        displayCharacters();
        characterCreation.classList.add('hidden');
        characterSelection.classList.remove('hidden');
    });

    newCharacterButton.addEventListener('click', function() {
        characterSelection.classList.add('hidden');
        characterCreation.classList.remove('hidden');
    });

    function createCharacter(name) {
        const characters = getCharacters();
        characters.push(name);
        localStorage.setItem('characters', JSON.stringify(characters));
    }

    function getCharacters() {
        const characters = localStorage.getItem('characters');
        return characters ? JSON.parse(characters) : [];
    }

    function deleteCharacter(name) {
        let characters = getCharacters();
        characters = characters.filter(character => character !== name);
        localStorage.setItem('characters', JSON.stringify(characters));
    }

    function displayCharacters() {
        const characters = getCharacters();
        characterList.innerHTML = '';
        characters.forEach(character => {
            const li = document.createElement('li');
            li.textContent = character;

            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('buttons');

            const selectRadio = document.createElement('input');
            selectRadio.type = 'radio';
            selectRadio.name = 'character-select';
            selectRadio.value = character;
            selectRadio.addEventListener('change', function() {
                alert(`Character "${character}" selected!`);
            });

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.style.color = 'red';
            deleteButton.addEventListener('click', function() {
                deleteCharacter(character);
                displayCharacters();
            });

            buttonsDiv.appendChild(selectRadio);
            buttonsDiv.appendChild(deleteButton);
            li.appendChild(buttonsDiv);
            characterList.appendChild(li);
        });
        if (characters.length > 0) {
            characterSelection.classList.remove('hidden');
        }
    }
});
