const correctCode = "2108";
const startDate = new Date(2025, 7, 21, 14, 0); 


let currentCode = "";
const dots = document.querySelectorAll(".dot");


function addNumber(number) {
    if (currentCode.length < 4) {
        currentCode += number;
        updateDots();
        if (currentCode.length === 4) checkCode();
    }
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index < currentCode.length);
    });
}

function checkCode() {
    setTimeout(() => {
        if (currentCode === correctCode) {
            
            document.querySelector(".login-card").style.display = "none";
            document.getElementById("search-screen").style.display = "flex"; 
        } else {
            alert("Contraseña incorrecta 😢");
            currentCode = "";
            updateDots();
        }
    }, 200);
}

function resetCode() {
    currentCode = "";
    updateDots();
}



function goToTimer() {
    
    document.getElementById("search-screen").style.display = "none";
    document.getElementById("timer-screen").style.display = "flex";
    
    
    setInterval(updateTimer, 1000);
    updateTimer(); 
}

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}



function goToMenu() {
    
    document.getElementById("timer-screen").style.display = "none";
    
    document.getElementById("menu-screen").style.display = "flex";
}

function showSection(section) {
    
    document.getElementById("menu-screen").style.display = "none";
    document.getElementById("letters-screen").style.display = "none";
    document.getElementById("photos-screen").style.display = "none";
    document.getElementById("games-menu-screen").style.display = "none"; 
    document.getElementById("puzzle-screen").style.display = "none"; 
    document.getElementById("kiss-screen").style.display = "none";
    document.getElementById("memory-screen").style.display = "none";
    document.getElementById("wordle-screen").style.display = "none";
    document.getElementById("trivia-screen").style.display = "none";

    
    if (section === 'menu') {
        document.getElementById("menu-screen").style.display = "flex";
    } else if (section === 'letters') {
        document.getElementById("letters-screen").style.display = "flex";
    } else if (section === 'photos') {
        document.getElementById("photos-screen").style.display = "flex";
    } else if (section === 'games') {
        document.getElementById("games-menu-screen").style.display = "flex"; 
    }
}



let isEnvelopeOpen = false;

function openEnvelope() {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const letterContent = document.getElementById('letter-content');

    
    if (!isEnvelopeOpen) {
        envelopeWrapper.classList.add('open');
        isEnvelopeOpen = true;
        
        
        
        setTimeout(() => {
            letterContent.style.cursor = "pointer";
        }, 800);
        
    }
}

function flipEnvelopeCard(event) {
    
    event.stopPropagation();
    
    const letterContent = document.getElementById('letter-content');
    letterContent.classList.toggle('flip');
}

function closeLetter(event) {
    event.stopPropagation(); 
    
    document.getElementById("letters-screen").style.display = "none";
    document.getElementById("menu-screen").style.display = "flex";
    
    
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const letterContent = document.getElementById('letter-content');
    envelopeWrapper.classList.remove('open');
    letterContent.classList.remove('flip');
    isEnvelopeOpen = false;
}



function openPhoto(imageSrc, messageText) {
    
    document.getElementById("modal-img").src = imageSrc;
    
    
    document.getElementById("modal-text").innerText = messageText;
    
    
    document.getElementById("photo-modal").style.display = "flex";
    
    
    document.getElementById("flip-card").classList.remove("flipped");
}

function closePhoto() {
    
    document.getElementById("photo-modal").style.display = "none";
}

function flipPhotoCard() {
    
    document.getElementById("flip-card").classList.toggle("flipped");
}

function startGame(game) {
    if (game === 'puzzle') {
        
        document.getElementById("games-menu-screen").style.display = "none";
        
        
        document.getElementById("puzzle-screen").style.display = "flex";
        
        
        document.getElementById("puzzle-selector").style.display = "block";
        document.getElementById("puzzle-game-area").style.display = "none";
    } else if (game === 'treasure') {
        initKissGame();
    } else if (game === 'memory') {
        initMemoryGame();
    } else if (game === 'trivia') {
        initTriviaGame();
    } else if (game === 'wordle') {
        initWordleGame();
    }
}



let currentPuzzleImage = "";
const gridSize = 4; 
let pieces = [];

function initPuzzle(imageSrc) {
    currentPuzzleImage = imageSrc;
    
    
    document.getElementById("puzzle-selector").style.display = "none";
    document.getElementById("puzzle-game-area").style.display = "flex";
    
    
    const board = document.getElementById("puzzle-board");
    const pool = document.getElementById("pieces-pool");
    board.innerHTML = "";
    pool.innerHTML = "";
    pieces = [];
    
    
    board.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${imageSrc})`;

    
    for (let i = 0; i < gridSize * gridSize; i++) {
        
        
        const zone = document.createElement("div");
        zone.classList.add("drop-zone");
        zone.dataset.index = i; 
        
        
        zone.ondragover = (e) => { e.preventDefault(); zone.classList.add("hovered"); };
        zone.ondragleave = () => zone.classList.remove("hovered");
        zone.ondrop = (e) => dropPiece(e, zone);
        
        board.appendChild(zone);

        
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.draggable = true;
        piece.style.backgroundImage = `url(${imageSrc})`;
        piece.dataset.index = i; 
        
        
        
        
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        piece.style.backgroundPosition = `${col * -80}px ${row * -80}px`;
        piece.id = `piece-${i}`;

        
        piece.ondragstart = (e) => {
            e.dataTransfer.setData("text/plain", piece.id);
            e.dataTransfer.setData("pieceIndex", i);
        };
        
        pieces.push(piece);
    }

    
    shuffleArray(pieces);
    pieces.forEach(p => pool.appendChild(p));
    
    document.getElementById("puzzle-status").innerText = "Drag the pieces! ⏳";
}

function dropPiece(e, zone) {
    e.preventDefault();
    zone.classList.remove("hovered");

    const pieceId = e.dataTransfer.getData("text/plain");
    const pieceIndex = e.dataTransfer.getData("pieceIndex");
    const piece = document.getElementById(pieceId);
    
    
    
    
    if (zone.dataset.index === pieceIndex) {
        
        zone.appendChild(piece); 
        piece.draggable = false; 
        piece.style.cursor = "default";
        piece.style.border = "none"; 
        
        
        checkWin();
    } else {
        
        
    }
}

function checkWin() {
    
    const correctPieces = document.querySelectorAll(".drop-zone .puzzle-piece");
    if (correctPieces.length === gridSize * gridSize) {
        document.getElementById("puzzle-status").innerText = "YOU DID IT! 🎉";
        document.getElementById("win-message").style.display = "flex";
    }
}

function resetPuzzle() {
    document.getElementById("puzzle-game-area").style.display = "none";
    document.getElementById("puzzle-selector").style.display = "block";
    document.getElementById("win-message").style.display = "none";
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}



function initKissGame() {
    document.getElementById("games-menu-screen").style.display = "none";
    document.getElementById("kiss-screen").style.display = "flex";

    const container = document.getElementById("kiss-container");
    container.innerHTML = ""; 

    
    const totalKisses = 60; 
    const winnerIndex = Math.floor(Math.random() * totalKisses);

    for (let i = 0; i < totalKisses; i++) {
        const img = document.createElement("img");
        img.src = "kiss.webp"; 
        img.classList.add("kiss-icon");

        
        
        const randomX = Math.random() * 85; 
        const randomY = Math.random() * 80 + 10; 
        
        const randomRotate = Math.random() * 360;

        img.style.left = randomX + "%";
        img.style.top = randomY + "%";
        img.style.transform = `rotate(${randomRotate}deg)`;

        if (i === winnerIndex) {
            img.classList.add("winner-kiss"); 
            img.onclick = foundKiss; 
        } else {
            img.onclick = () => {
                
                img.style.transform += " scale(0.8) rotate(20deg)";
                img.style.opacity = "0.5"; 
            };
        }

        container.appendChild(img);
    }
}

function foundKiss() {
    
    document.getElementById("kiss-message-modal").style.display = "flex";
}

function resetKissGame() {
    document.getElementById("kiss-message-modal").style.display = "none";
    initKissGame(); 
}



const cardsArray = [
    { name: 'foto1', img: 'memorama1.jpeg' },
    { name: 'foto2', img: 'memorama2.jpeg' },
    { name: 'foto3', img: 'memorama3.jpeg' },
    { name: 'foto4', img: 'memorama4.jpeg' },
    { name: 'foto5', img: 'memorama5.jpeg' },
    { name: 'foto6', img: 'memorama6.jpeg' },
    { name: 'foto7', img: 'memorama7.jpeg' },
    { name: 'foto8', img: 'memorama8.jpeg' },
];

let memoryGrid = []; 
let hasFlippedCard = false;
let lockBoard = false; 
let firstCard, secondCard;
let matchesFound = 0;

function initMemoryGame() {
    
    document.getElementById("games-menu-screen").style.display = "none";
    document.getElementById("memory-screen").style.display = "flex";
    document.getElementById("memory-win-message").style.display = "none";

    const board = document.getElementById("memory-board");
    board.innerHTML = "";
    
    
    
    memoryGrid = [...cardsArray, ...cardsArray];
    
    
    memoryGrid.sort(() => 0.5 - Math.random());

    
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    matchesFound = 0;

    
    memoryGrid.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.name = item.name; 

        const front = document.createElement('div');
        front.classList.add('front-face');
        front.innerHTML = "❓"; 
      
        const back = document.createElement('div');
        back.classList.add('back-face');
        const img = document.createElement('img');
        img.src = item.img;
        back.appendChild(img);       
        card.appendChild(front); 
        card.appendChild(back);
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return; 
    if (this === firstCard) return; 

    this.classList.add('flip');

    if (!hasFlippedCard) {
        
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    firstCard.classList.add('match');
    secondCard.classList.add('match');

    matchesFound++;
    
    
    if (matchesFound === cardsArray.length) {
        setTimeout(() => {
            document.getElementById("memory-win-message").style.display = "flex";
        }, 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true; 

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000); 
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

const wordList = [
    "AMOR", "BESO", "VIDA", "TUYO", "NSQK", "DIOS",
    "NOVIO", "FELIZ", "LINDA", "SUEÑO", 
    "FUTURO", "QUERER", "BONITO", "JUNTOS", "AGOSTO",
    "CORAZON", "SIEMPRE", "DESTINO", "HERMOSO", "AMBIGUO", "INTENSA" 
];

let currentWord = "";
let wordLength = 5;
let guesses = [];
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

function initWordleGame() {
    
    document.getElementById("games-menu-screen").style.display = "none";
    document.getElementById("wordle-screen").style.display = "flex";
    document.getElementById("wordle-message").style.display = "none";

    
    const randomIndex = Math.floor(Math.random() * wordList.length);
    currentWord = wordList[randomIndex].toUpperCase();
    wordLength = currentWord.length; 
    
    console.log("Palabra secreta:", currentWord); 

    guesses = [ [], [], [], [], [], [] ];
    currentRow = 0;
    currentTile = 0;
    isGameOver = false;
 
    const grid = document.getElementById("wordle-grid");
    grid.innerHTML = "";
       
    grid.style.gridTemplateColumns = `repeat(${wordLength}, 1fr)`;

    
    for (let i = 0; i < 6 * wordLength; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.id = "tile-" + i;
        grid.appendChild(tile);
    }

    
    generateKeyboard();
}

function generateKeyboard() {
    const keyboard = document.getElementById("wordle-keyboard");
    keyboard.innerHTML = "";
    const layout = ["QWERTYUIOP", "ASDFGHJKLÑ", "ZXCVBNM"];

    layout.forEach((rowString, rowIndex) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("keyboard-row");

        if (rowIndex === 2) {
            const enterKey = createKey("ENTER", "wide");
            enterKey.onclick = submitGuess;
            rowDiv.appendChild(enterKey);
        }

        for (let char of rowString) {
            const key = createKey(char, "");
            key.onclick = () => handleKey(char);
            rowDiv.appendChild(key);
        }

        if (rowIndex === 2) {
            const backKey = createKey("⌫", "wide");
            backKey.onclick = deleteLetter;
            rowDiv.appendChild(backKey);
        }
        keyboard.appendChild(rowDiv);
    });
}

function createKey(char, className) {
    const btn = document.createElement("button");
    btn.textContent = char;
    btn.classList.add("key");
    if (className) btn.classList.add(className);
    btn.id = "key-" + char;
    return btn;
}




document.addEventListener("keydown", (e) => {
    if (document.getElementById("wordle-screen").style.display === "none") return;
    if (isGameOver) return;

    const key = e.key.toUpperCase();
    
    if (key === "ENTER") submitGuess();
    else if (key === "BACKSPACE") deleteLetter();
    else if (/^[A-ZÑ]$/.test(key)) handleKey(key);
});

function handleKey(letter) {
    
    if (currentTile < wordLength && currentRow < 6) {
        const tile = document.getElementById(`tile-${currentRow * wordLength + currentTile}`);
        tile.textContent = letter;
        tile.classList.add("active");
        tile.style.borderColor = "#878a8c";
        
        guesses[currentRow][currentTile] = letter;
        currentTile++;
    }
}

function deleteLetter() {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById(`tile-${currentRow * wordLength + currentTile}`);
        tile.textContent = "";
        tile.classList.remove("active");
        tile.style.borderColor = "#d3d6da";
        guesses[currentRow][currentTile] = "";
    }
}

function submitGuess() {
    
    if (currentTile !== wordLength) {
        alert("¡Faltan letras!"); 
        return;
    }

    const guessWord = guesses[currentRow].join("");
    flipTiles(guessWord);
}

function flipTiles(guessWord) {
    const rowTiles = [];
    
    
    for (let i = 0; i < wordLength; i++) {
        rowTiles.push(document.getElementById(`tile-${currentRow * wordLength + i}`));
    }

    let checkWord = currentWord;
    const guessArray = guessWord.split("");
    const result = new Array(wordLength).fill("absent"); 

    
    guessArray.forEach((char, i) => {
        if (char === checkWord[i]) {
            result[i] = "correct";
            checkWord = checkWord.substring(0, i) + "_" + checkWord.substring(i + 1);
        }
    });

    
    guessArray.forEach((char, i) => {
        if (result[i] !== "correct" && checkWord.includes(char)) {
            result[i] = "present";
            checkWord = checkWord.replace(char, "_");
        }
    });

    
    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add("flip");
            tile.classList.add(result[index]);
            
            const keyBtn = document.getElementById("key-" + guessArray[index]);
            if (keyBtn) {
                if (!keyBtn.classList.contains("correct")) {
                    keyBtn.classList.remove("present", "absent");
                    keyBtn.classList.add(result[index]);
                }
            }
        }, 500 * index / 2);
    });

    
    setTimeout(() => {
        if (guessWord === currentWord) {
            isGameOver = true;
            document.getElementById("wordle-msg-title").innerText = "✨ YAYYY! ✨";
            document.getElementById("wordle-msg-text").innerText = "¡Adivinaste: " + currentWord + "!";
            document.getElementById("wordle-message").style.display = "flex";
        } else {
            if (currentRow >= 5) { 
                isGameOver = true;
                document.getElementById("wordle-msg-title").innerText = "😢 OH NO!";
                document.getElementById("wordle-msg-text").innerText = "La palabra era: " + currentWord;
                document.getElementById("wordle-message").style.display = "flex";
            } else {
                currentRow++;
                currentTile = 0;
            }
        }
    }, 1500);
}




const questions = [
    {
        question: "¿Dónde fue nuestra primera cita?",
        options: ["En el cine", "En un parque", "En un restaurante", "En la universidad"],
        correct: 2 
    },
    {
        question: "¿Qué día es nuestro 'dia especial'?",
        options: ["21 de Agosto", "15 de Marzo", "22 de Agosto", "10 de Octubre"],
        correct: 0 
    },
    {
        question: "¿Que pelicula vimos juntos por primera vez?",
        options: ["Juego de Gemelas", "Together", "Que paso ayer?", "Un viernes de locos"],
        correct: 3
    },
    {
        question: "¿Quién dijo 'Te amo' primero?",
        options: ["Yo :0", "Tú <3", "Fue al mismo tiempo", "Nadie, aún no lo hemos dicho"],
        correct: 0
    },
    {
        question: "¿Qué es lo que más me gusta de ti?",
        options: ["Tu sonrisa", "Tus ojos", "Tu inteligencia", "Todo todito"],
        correct: 3 
    }
];

let currentQuestionIndex = 0;
let score = 0;

function initTriviaGame() {
    
    document.getElementById("games-menu-screen").style.display = "none";
    document.getElementById("trivia-screen").style.display = "flex";
    document.getElementById("trivia-score-screen").style.display = "none";

    
    currentQuestionIndex = 0;
    score = 0;
    
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const feedbackMsg = document.getElementById("feedback-msg");
    const progressBar = document.getElementById("progress-fill");

    
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    
    questionText.innerText = q.question;
    optionsContainer.innerHTML = "";
    feedbackMsg.innerText = "";

    
    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    const q = questions[currentQuestionIndex];
    const feedbackMsg = document.getElementById("feedback-msg");
    const allBtns = document.querySelectorAll(".option-btn");

    
    allBtns.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correct) {
        
        score++;
        btnElement.classList.add("correct");
        feedbackMsg.innerText = "¡Correcto! 🎉";
        feedbackMsg.style.color = "#6aaa64";
    } else {
        
        btnElement.classList.add("wrong");
        feedbackMsg.innerText = "Ups... 😅";
        feedbackMsg.style.color = "#FF6B6B";
        document.querySelector(".trivia-container").classList.add("shake");
        
        setTimeout(() => document.querySelector(".trivia-container").classList.remove("shake"), 500);

        
        allBtns[q.correct].classList.add("correct");
    }

    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    document.getElementById("trivia-score-screen").style.display = "flex";
    document.getElementById("final-score-text").innerText = `Puntaje: ${score} / ${questions.length}`;
    
    const message = document.getElementById("final-score-message");
    if (score === questions.length) {
        message.innerText = "¡YAYYY PERFECTO! Nos conoces demasiado bien ❤️";
    } else if (score > questions.length / 2) {
        message.innerText = "¡Nada mal! Sigues siendo el mejor novio";
    } else {
        message.innerText = "¿Quién eres y qué hiciste con mi novio? :0 dea";
    }
}

function restartTrivia() {
    initTriviaGame();
}