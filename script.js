const correctCode = "2108";
const startDate = new Date(2025, 7, 21, 14, 0); // Modifica esto con tu fecha real

// --- VARIABLES ---
let currentCode = "";
const dots = document.querySelectorAll(".dot");

// --- FUNCIONES DE LOGIN ---
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
            // OCULTAR LOGIN Y MOSTRAR BÚSQUEDA
            document.querySelector(".login-card").style.display = "none";
            document.getElementById("search-screen").style.display = "flex"; // Usamos flex para centrar
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

// --- FUNCIONES DE NAVEGACIÓN Y CONTADOR ---

function goToTimer() {
    // OCULTAR BÚSQUEDA Y MOSTRAR CONTADOR
    document.getElementById("search-screen").style.display = "none";
    document.getElementById("timer-screen").style.display = "flex";
    
    // Iniciar el contador
    setInterval(updateTimer, 1000);
    updateTimer(); // Ejecutar una vez inmediatamente
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

// --- FUNCIONES DEL MENÚ ---

function goToMenu() {
    // Ocultamos el contador
    document.getElementById("timer-screen").style.display = "none";
    // Mostramos el menú
    document.getElementById("menu-screen").style.display = "flex";
}

function showSection(section) {
    // Primero OCULTAMOS TODO para limpiar la pantalla
    document.getElementById("menu-screen").style.display = "none";
    document.getElementById("letters-screen").style.display = "none";
    document.getElementById("photos-screen").style.display = "none";
    document.getElementById("games-menu-screen").style.display = "none"; 
    document.getElementById("puzzle-screen").style.display = "none"; // <-- Importante agregar esto
    document.getElementById("kiss-screen").style.display = "none";
    document.getElementById("memory-screen").style.display = "none";
    document.getElementById("wordle-screen").style.display = "none";
    document.getElementById("trivia-screen").style.display = "none";

    // Luego mostramos solo lo que queremos
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

// --- FUNCIONES DE LA CARTA ---

let isEnvelopeOpen = false;

function openEnvelope() {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const letterContent = document.getElementById('letter-content');

    // 1. Si no está abierto, abrir sobre y sacar carta
    if (!isEnvelopeOpen) {
        envelopeWrapper.classList.add('open');
        isEnvelopeOpen = true;
        
        // --- SECCIÓN CORREGIDA ---
        // Solo cambiamos el cursor visualmente después de la animación
        setTimeout(() => {
            letterContent.style.cursor = "pointer";
        }, 800);
        // -------------------------
    }
}

function flipEnvelopeCard(event) {
    // Evita que el clic se propague al sobre
    event.stopPropagation();
    
    const letterContent = document.getElementById('letter-content');
    letterContent.classList.toggle('flip');
}

function closeLetter(event) {
    event.stopPropagation(); // Evita conflictos
    // Volver al menú principal
    document.getElementById("letters-screen").style.display = "none";
    document.getElementById("menu-screen").style.display = "flex";
    
    // Resetear la carta para la próxima vez
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const letterContent = document.getElementById('letter-content');
    envelopeWrapper.classList.remove('open');
    letterContent.classList.remove('flip');
    isEnvelopeOpen = false;
}

// --- FUNCIONES DE LA GALERÍA DE FOTOS ---

function openPhoto(imageSrc, messageText) {
    // 1. Poner la imagen correcta en el modal
    document.getElementById("modal-img").src = imageSrc;
    
    // 2. Poner el texto correcto detrás
    document.getElementById("modal-text").innerText = messageText;
    
    // 3. Mostrar el modal
    document.getElementById("photo-modal").style.display = "flex";
    
    // 4. Asegurarnos de que empiece mostrando la foto (sin girar)
    document.getElementById("flip-card").classList.remove("flipped");
}

function closePhoto() {
    // Ocultar el modal
    document.getElementById("photo-modal").style.display = "none";
}

function flipPhotoCard() {
    // Girar la tarjeta al hacer clic
    document.getElementById("flip-card").classList.toggle("flipped");
}

function startGame(game) {
    if (game === 'puzzle') {
        // Ocultamos el menú de juegos
        document.getElementById("games-menu-screen").style.display = "none";
        
        // Mostramos la sección del puzzle (Contenedor principal)
        document.getElementById("puzzle-screen").style.display = "flex";
        
        // Nos aseguramos de mostrar el SELECTOR primero y ocultar el juego por si acaso
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

// --- LÓGICA DEL PUZZLE ---

let currentPuzzleImage = "";
const gridSize = 4; // 4x4
let pieces = [];

function initPuzzle(imageSrc) {
    currentPuzzleImage = imageSrc;
    
    // 1. Ocultar selector y mostrar juego
    document.getElementById("puzzle-selector").style.display = "none";
    document.getElementById("puzzle-game-area").style.display = "flex";
    
    // 2. Limpiar tableros anteriores
    const board = document.getElementById("puzzle-board");
    const pool = document.getElementById("pieces-pool");
    board.innerHTML = "";
    pool.innerHTML = "";
    pieces = [];
    
    // Poner la imagen de fondo tenue en el tablero como guía (opcional)
    board.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${imageSrc})`;

    // 3. Crear las 16 piezas y los 16 espacios
    for (let i = 0; i < gridSize * gridSize; i++) {
        
        // A. Crear el espacio en el tablero (Drop Zone)
        const zone = document.createElement("div");
        zone.classList.add("drop-zone");
        zone.dataset.index = i; // Guardamos qué número de pieza va aquí
        
        // Eventos para soltar
        zone.ondragover = (e) => { e.preventDefault(); zone.classList.add("hovered"); };
        zone.ondragleave = () => zone.classList.remove("hovered");
        zone.ondrop = (e) => dropPiece(e, zone);
        
        board.appendChild(zone);

        // B. Crear la pieza (Draggable)
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.draggable = true;
        piece.style.backgroundImage = `url(${imageSrc})`;
        piece.dataset.index = i; // Esta es la pieza número 'i'
        
        // CALCULAR EL RECORTE (BACKGROUND POSITION)
        // Ejemplo: Si es 4x4, cada pieza es 25% (pero en pixeles es 80px si el total es 320)
        // Usaremos porcentajes para que sea responsive
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        piece.style.backgroundPosition = `${col * -80}px ${row * -80}px`;
        piece.id = `piece-${i}`;

        // Evento arrastrar
        piece.ondragstart = (e) => {
            e.dataTransfer.setData("text/plain", piece.id);
            e.dataTransfer.setData("pieceIndex", i);
        };
        
        pieces.push(piece);
    }

    // 4. Barajar las piezas y ponerlas en el contenedor de la izquierda
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
    
    // VERIFICACIÓN: ¿Es la pieza correcta para este hueco?
    // zone.dataset.index es el número del hueco
    // pieceIndex es el número de la pieza
    if (zone.dataset.index === pieceIndex) {
        // ¡Correcto!
        zone.appendChild(piece); // Mover la pieza al hueco
        piece.draggable = false; // Ya no se puede mover, se queda fija
        piece.style.cursor = "default";
        piece.style.border = "none"; // Quitar borde para que se vea limpio
        
        // Reproducir sonidito si quieres (opcional)
        checkWin();
    } else {
        // Incorrecto: Vibrar o hacer algo (Opcional)
        // Por ahora no hace nada, la pieza se regresa sola
    }
}

function checkWin() {
    // Verificar si todas las piezas están en el tablero
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

// Función auxiliar para desordenar
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// --- JUEGO: FIND THE KISS ---

function initKissGame() {
    document.getElementById("games-menu-screen").style.display = "none";
    document.getElementById("kiss-screen").style.display = "flex";

    const container = document.getElementById("kiss-container");
    container.innerHTML = ""; 

    // MENOS BESOS PERO MÁS GRANDES
    const totalKisses = 60; // Bajamos de 60 a 35 para que se vean bien
    const winnerIndex = Math.floor(Math.random() * totalKisses);

    for (let i = 0; i < totalKisses; i++) {
        const img = document.createElement("img");
        img.src = "kiss.webp"; 
        img.classList.add("kiss-icon");

        // Ajustamos los límites para que no se corten en los bordes
        // Como son más grandes, restamos más porcentaje al límite (85% en vez de 90%)
        const randomX = Math.random() * 85; 
        const randomY = Math.random() * 80 + 10; // Dejamos espacio arriba para el título
        
        const randomRotate = Math.random() * 360;

        img.style.left = randomX + "%";
        img.style.top = randomY + "%";
        img.style.transform = `rotate(${randomRotate}deg)`;

        if (i === winnerIndex) {
            img.classList.add("winner-kiss"); 
            img.onclick = foundKiss; 
        } else {
            img.onclick = () => {
                // Pequeña animación de "Error" visual
                img.style.transform += " scale(0.8) rotate(20deg)";
                img.style.opacity = "0.5"; // Se apaga si te equivocas
            };
        }

        container.appendChild(img);
    }
}

function foundKiss() {
    // Mostrar el mensaje secreto
    document.getElementById("kiss-message-modal").style.display = "flex";
}

function resetKissGame() {
    document.getElementById("kiss-message-modal").style.display = "none";
    initKissGame(); // Reinicia las posiciones para jugar de nuevo
}

// --- JUEGO: MEMORAMA ---

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

let memoryGrid = []; // Aquí guardaremos las 16 cartas (8 pares)
let hasFlippedCard = false;
let lockBoard = false; // Para evitar que de clic a más de 2 a la vez
let firstCard, secondCard;
let matchesFound = 0;

function initMemoryGame() {
    // 1. Mostrar pantalla
    document.getElementById("games-menu-screen").style.display = "none";
    document.getElementById("memory-screen").style.display = "flex";
    document.getElementById("memory-win-message").style.display = "none";

    const board = document.getElementById("memory-board");
    board.innerHTML = "";
    
    // 2. Duplicar el array para tener pares
    // Usamos spread operator (...) para concatenar dos veces el mismo array
    memoryGrid = [...cardsArray, ...cardsArray];
    
    // 3. Barajar (Shuffle)
    memoryGrid.sort(() => 0.5 - Math.random());

    // 4. Resetear variables
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    matchesFound = 0;

    // 5. Crear cartas en el DOM
    memoryGrid.forEach(item => {
        // Crear estructura HTML:
        // <div class="memory-card" data-name="...">
        //    <div class="front-face">❓</div>
        //    <div class="back-face"><img src="..."></div>
        // </div>

        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.name = item.name; // Para comparar después

        // Cara FRONTAL (Interrogación) - Nota: En CSS puse front-face como portada
        // Si quieres que la portada sea la interrogación, esta va SIN rotar.
        const front = document.createElement('div');
        front.classList.add('front-face');
        front.innerHTML = "❓"; // O un icono de corazón ❤️

        // Cara TRASERA (La Foto)
        const back = document.createElement('div');
        back.classList.add('back-face');
        const img = document.createElement('img');
        img.src = item.img;
        back.appendChild(img);

        // Armamos la carta
        // OJO con el orden según tu CSS: 
        // Si .front-face no tiene rotateY, es la que se ve primero.
        card.appendChild(front); 
        card.appendChild(back);

        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return; // Si está bloqueado (esperando a voltear), no hacer nada
    if (this === firstCard) return; // Si le da clic a la misma carta, no hacer nada

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // Primer clic
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Segundo clic
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    // Comparar los nombres de las cartas
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    // Si son iguales, quitamos el evento click y las marcamos como match
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    firstCard.classList.add('match');
    secondCard.classList.add('match');

    matchesFound++;
    
    // Verificar victoria (8 pares)
    if (matchesFound === cardsArray.length) {
        setTimeout(() => {
            document.getElementById("memory-win-message").style.display = "flex";
        }, 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true; // Bloquear tablero para que no abra una tercera

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000); // Esperar 1 segundo antes de voltear
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// --- JUEGO: WORDLE ---

// 1. BANCO DE PALABRAS (¡Tienen que ser de 5 letras!)
// Puedes agregar todas las que quieras aquí
const wordList = [
    "AMOR", "BESO", "VIDA", "TUYO", "NSQK", "DIOS",// 4 Letras
    "NOVIO", "FELIZ", "LINDA", "SUEÑO", // 5 Letras
    "FUTURO", "QUERER", "BONITO", "JUNTOS", "AGOSTO",// 6 Letras
    "CORAZON", "SIEMPRE", "DESTINO", "HERMOSO", "AMBIGUO", "INTENSA" // 7 Letras
];

let currentWord = "";
let wordLength = 5;
let guesses = []; // Se reinicia al jugar
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

function initWordleGame() {
    // 1. Mostrar pantalla
    document.getElementById("games-menu-screen").style.display = "none";
    document.getElementById("wordle-screen").style.display = "flex";
    document.getElementById("wordle-message").style.display = "none";

    // 2. Elegir palabra aleatoria
    const randomIndex = Math.floor(Math.random() * wordList.length);
    currentWord = wordList[randomIndex].toUpperCase();
    wordLength = currentWord.length; // <--- AQUÍ CAPTURAMOS EL LARGO (Ej: 7)
    
    console.log("Palabra secreta:", currentWord); // Chivato en consola

    // 3. Resetear variables
    guesses = [ [], [], [], [], [], [] ];
    currentRow = 0;
    currentTile = 0;
    isGameOver = false;

    // 4. Configurar Grid Dinámico
    const grid = document.getElementById("wordle-grid");
    grid.innerHTML = "";
    
    // TRUCO: Cambiamos el CSS desde JS para ajustar las columnas
    grid.style.gridTemplateColumns = `repeat(${wordLength}, 1fr)`;

    // Creamos las cajas (6 filas x largo de la palabra)
    for (let i = 0; i < 6 * wordLength; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.id = "tile-" + i;
        grid.appendChild(tile);
    }

    // 5. Generar Teclado
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

// --- LÓGICA DE TECLAS ---

// Escuchar teclado físico
document.addEventListener("keydown", (e) => {
    if (document.getElementById("wordle-screen").style.display === "none") return;
    if (isGameOver) return;

    const key = e.key.toUpperCase();
    
    if (key === "ENTER") submitGuess();
    else if (key === "BACKSPACE") deleteLetter();
    else if (/^[A-ZÑ]$/.test(key)) handleKey(key);
});

function handleKey(letter) {
    // Usamos wordLength en lugar de 5
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
    // Verificar si completó el largo de la palabra actual
    if (currentTile !== wordLength) {
        alert("¡Faltan letras!"); 
        return;
    }

    const guessWord = guesses[currentRow].join("");
    flipTiles(guessWord);
}

function flipTiles(guessWord) {
    const rowTiles = [];
    
    // Recopilar tiles de la fila actual (usando wordLength)
    for (let i = 0; i < wordLength; i++) {
        rowTiles.push(document.getElementById(`tile-${currentRow * wordLength + i}`));
    }

    let checkWord = currentWord;
    const guessArray = guessWord.split("");
    const result = new Array(wordLength).fill("absent"); // Array dinámico

    // 1. Verdes
    guessArray.forEach((char, i) => {
        if (char === checkWord[i]) {
            result[i] = "correct";
            checkWord = checkWord.substring(0, i) + "_" + checkWord.substring(i + 1);
        }
    });

    // 2. Amarillos
    guessArray.forEach((char, i) => {
        if (result[i] !== "correct" && checkWord.includes(char)) {
            result[i] = "present";
            checkWord = checkWord.replace(char, "_");
        }
    });

    // 3. Animación
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

    // Verificar Final
    setTimeout(() => {
        if (guessWord === currentWord) {
            isGameOver = true;
            document.getElementById("wordle-msg-title").innerText = "✨ YAYYY! ✨";
            document.getElementById("wordle-msg-text").innerText = "¡Adivinaste: " + currentWord + "!";
            document.getElementById("wordle-message").style.display = "flex";
        } else {
            if (currentRow >= 5) { // Fin de intentos (siempre 6 intentos)
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

// --- JUEGO: TRIVIA ---

// CONFIGURA TUS PREGUNTAS AQUÍ
const questions = [
    {
        question: "¿Dónde fue nuestra primera cita?",
        options: ["En el cine", "En un parque", "En un restaurante", "En la universidad"],
        correct: 2 // La opción correcta es la 3ra (índice 2: 0, 1, 2)
    },
    {
        question: "¿Qué día es nuestro 'dia especial'?",
        options: ["21 de Agosto", "15 de Marzo", "22 de Agosto", "10 de Octubre"],
        correct: 0 // Cambia esto según tu fecha real
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
        correct: 3 // ¡La respuesta romántica!
    }
];

let currentQuestionIndex = 0;
let score = 0;

function initTriviaGame() {
    // 1. Mostrar pantalla
    document.getElementById("games-menu-screen").style.display = "none";
    document.getElementById("trivia-screen").style.display = "flex";
    document.getElementById("trivia-score-screen").style.display = "none";

    // 2. Resetear variables
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

    // Actualizar barra de progreso
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Limpiar anterior
    questionText.innerText = q.question;
    optionsContainer.innerHTML = "";
    feedbackMsg.innerText = "";

    // Crear botones
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

    // Bloquear botones para que no pulse dos veces
    allBtns.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correct) {
        // CORRECTO
        score++;
        btnElement.classList.add("correct");
        feedbackMsg.innerText = "¡Correcto! 🎉";
        feedbackMsg.style.color = "#6aaa64";
    } else {
        // INCORRECTO
        btnElement.classList.add("wrong");
        feedbackMsg.innerText = "Ups... 😅";
        feedbackMsg.style.color = "#FF6B6B";
        document.querySelector(".trivia-container").classList.add("shake");
        
        setTimeout(() => document.querySelector(".trivia-container").classList.remove("shake"), 500);

        // Mostrar cuál era la correcta
        allBtns[q.correct].classList.add("correct");
    }

    // Pasar a la siguiente pregunta después de 1.5 segundos
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