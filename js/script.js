const cardData = [
    { category: 'Category 1', color: '#FF6F61', picture: 'images/office.png', title: 'Title 1', text: 'Description for card 1' },
    { category: 'Category 2', color: '#6B5B95', picture: 'path/to/pic2.jpg', title: 'Title 2', text: 'Description for card 2' },
    { category: 'Category 3', color: '#88B04B', picture: 'path/to/pic3.jpg', title: 'Title 3', text: 'Description for card 3' },
    { category: 'Category 4', color: '#F7CAC9', picture: 'path/to/pic4.jpg', title: 'Title 4', text: 'Description for card 4' },
    // Add more cards as needed
];

function createCard(data) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Set CSS variable for card color
    card.style.setProperty('--card-color', data.color);

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.innerHTML = `<h2>${data.category}</h2>`;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.innerHTML = `<img src="${data.picture}" alt="${data.title}">
                           <h3>${data.title}</h3>
                           <p>${data.text}</p>`;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', () => {
        card.classList.toggle('flip');
    });

    return card;
}

function displayCards(count) {
    const container = document.getElementById('cardContainer');
    container.innerHTML = '';

    const shuffledData = cardData.sort(() => Math.random() - 0.5).slice(0, count);

    shuffledData.forEach(data => {
        const card = createCard(data);
        container.appendChild(card);
    });
}

document.getElementById('goButton').addEventListener('click', () => {
    const count = parseInt(document.getElementById('cardCount').value, 10);
    displayCards(count);
});
