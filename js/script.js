const cardData = [
    { category: 'Category 1', color: '#FF6F61', picture: 'images/pic1.jpg', title: 'Title 1', text: 'Description for card 1' },
    { category: 'Category 2', color: '#6B5B95', picture: 'images/pic2.jpg', title: 'Title 2', text: 'Description for card 2' },
    { category: 'Category 3', color: '#88B04B', picture: 'images/pic3.jpg', title: 'Title 3', text: 'Description for card 3' },
    { category: 'Category 4', color: '#F7CAC9', picture: 'images/pic4.jpg', title: 'Title 4', text: 'Description for card 4' },
    // Add more cards as needed
];

document.addEventListener('DOMContentLoaded', () => {
    const cardCountSelect = document.getElementById('cardCount');
    const categoryControlsContainer = document.getElementById('categoryControlsContainer');
    const categoryGoButton = document.getElementById('categoryGoButton');
    const categorySummary = document.getElementById('categorySummary');
    const cardContainer = document.getElementById('cardContainer');
    const goButton = document.getElementById('goButton');

    // Create category controls
    const categories = [...new Set(cardData.map(card => card.category))];
    const categoryCounts = {};

    categories.forEach(category => {
        const categoryControl = document.createElement('div');
        categoryControl.className = 'category-control';

        const label = document.createElement('label');
        label.textContent = category;

        const countDisplay = document.createElement('span');
        countDisplay.textContent = '0';

        const plusButton = document.createElement('button');
        plusButton.textContent = '+1';
        plusButton.addEventListener('click', () => {
            const currentCount = categoryCounts[category] || 0;
            if (currentCount < getCardCountForCategory(category)) {
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
                updateCategoryControls();
                updateCategorySummary();
            }
        });

        categoryControl.appendChild(label);
        categoryControl.appendChild(countDisplay);
        categoryControl.appendChild(plusButton);
        categoryControlsContainer.appendChild(categoryControl);
    });

    function getCardCountForCategory(category) {
        return cardData.filter(card => card.category === category).length;
    }

    function getRandomCards(num) {
        const shuffled = cardData.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function getCategoryCards(category, num) {
        const filtered = cardData.filter(card => card.category === category);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function displayRandomCards() {
        const num = parseInt(cardCountSelect.value);
        const cards = getRandomCards(num);
        cardContainer.innerHTML = '';
        cards.forEach(card => cardContainer.appendChild(createCard(card)));
    }

    function displayCategoryCards() {
        let cards = [];
        for (const [category, count] of Object.entries(categoryCounts)) {
            cards = cards.concat(getCategoryCards(category, count));
        }
        cardContainer.innerHTML = '';
        cards.forEach(card => cardContainer.appendChild(createCard(card)));
    }

    function updateCategoryControls() {
        const categoryControlDivs = categoryControlsContainer.querySelectorAll('.category-control');
        categoryControlDivs.forEach(div => {
            const category = div.querySelector('label').textContent;
            const countDisplay = div.querySelector('span');
            countDisplay.textContent = categoryCounts[category] || 0;
        });
    }

    function updateCategorySummary() {
        const totalCards = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
        categorySummary.textContent = `Total Cards Selected: ${totalCards}`;
    }

    goButton.addEventListener('click', displayRandomCards);
    categoryGoButton.addEventListener('click', displayCategoryCards);

    function createCard(data) {
        const card = document.createElement('div');
        card.className = 'card';

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
        cardImg.src = data.image;
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
});

