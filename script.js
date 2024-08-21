document.addEventListener("DOMContentLoaded", () => {
    const cardsArray = [
        '🍎', '🍎', '🍌', '🍌',
        '🍇', '🍇', '🍓', '🍓',
        '🍍', '🍍', '🍒', '🍒',
        '🍉', '🍉', '🍋', '🍋'
    ];

    const gameBoard = document.getElementById('gameBoard');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0; // Variável para contar os pares combinados

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        shuffle(cardsArray);
        cardsArray.forEach(symbol => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="front">${symbol}</div>
                <div class="back">?</div>
            `;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            lockBoard = true;

            checkForMatch();
        }
    }

    function checkForMatch() {
        let isMatch = firstCard.querySelector('.front').textContent === secondCard.querySelector('.front').textContent;

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        matchedPairs++; // Incrementa o contador de pares combinados
        if (matchedPairs === cardsArray.length / 2) {
            setTimeout(() => {
                alert("Parabéns! Você terminou o jogo!"); // Exibe uma mensagem de parabéns
                window.location.href = "https://www.youtube.com/watch?v=62v4y43D-3k"; // Redireciona para o link do YouTube
            }, 500); // Pequena pausa antes do redirecionamento
        }

        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    createBoard();
});