const cardData = [
    { category: 'Category 1', color: '#FF6F61', picture: 'images/pic1.jpg', title: 'Title 1', text: 'Description for card 1' },
    { category: 'Category 2', color: '#6B5B95', picture: 'images/pic2.jpg', title: 'Title 2', text: 'Description for card 2' },
    { category: 'Category 3', color: '#88B04B', picture: 'images/pic3.jpg', title: 'Title 3', text: 'Description for card 3' },
    { category: 'Category 4', color: '#F7CAC9', picture: 'images/pic4.jpg', title: 'Title 4', text: 'Description for card 4' },
    // Add more cards as needed
];

document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');

    function createCard(data) {
        const card = document.createElement('div');
        card.className = 'card flip'; // Start with the card flipped

        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.style.backgroundColor = data.color;
        cardFront.textContent = data.category;

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = data.color;

        const categoryTag = document.createElement('div');
        categoryTag.className = 'category-tag';
        categoryTag.textContent = data.category;

        const cardImg = document.createElement('img');
        cardImg.src = data.picture;
        cardImg.alt = data.title;

        const cardTitle = document.createElement('h3');
        cardTitle.textContent = data.title;

        const cardText = document.createElement('p');
        cardText.textContent = data.text;

        cardBack.appendChild(categoryTag);
        cardBack.appendChild(cardImg);
        cardBack.appendChild(cardTitle);
        cardBack.appendChild(cardText);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', () => {
            card.classList.toggle('flip');
        });

        return card;
    }

    function displayAllCards() {
        cardContainer.innerHTML = '';
        cardData.forEach(card => cardContainer.appendChild(createCard(card)));
    }

    displayAllCards();
});
