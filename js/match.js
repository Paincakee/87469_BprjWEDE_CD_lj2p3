let timeoutID;
let timerStarted = false;
let timerIntervalId;
let timer = 0;
let user = "";

function flipCard(event) {
    const activeElements = document.querySelectorAll('.active').length;
    const clickedCard = event.currentTarget.closest('.click_box');

    showStatus('Match the picture', 'black');

    console.log(clickedCard);

    if (isAlreadyMatched(clickedCard) || activeElements >= 2 || isAlreadyActive(clickedCard)) {
        return;
    }

    if (!timerStarted) {
        startTimer();
    }
    
    activateCard(clickedCard);

    clearTimeout(timeoutID);
    timeoutID = setTimeout(checkForMatch, 300);
}

function startTimer() {
    timerStarted = true;
    const startTime = Date.now() + 30000;
    timerIntervalId = setInterval(() => {
        timer = (startTime - Date.now()) / 1000;
        document.getElementById("timer_text").innerHTML = (timer <= 0 ? "0.00" : timer.toFixed(2)) + " seconds";

        if (isAllCardsMatched() || isTimeUp()) {
            clearInterval(timerIntervalId);
            handleGameEnd();
        }
    }, 10);
}

function isAlreadyMatched(card) {
    return card.classList.contains('won');
}

function isAlreadyActive(card) {
    const activeDescs = document.querySelectorAll('.descriptions.active').length;
    const activeImages = document.querySelectorAll('.images.active').length;
    return (card.classList.contains('descriptions') && activeDescs > 0 || card.classList.contains('images') && activeImages > 0);
}

function activateCard(card) {
    card.classList.add('active');
}

function checkForMatch() {
    const flippedCards = document.querySelectorAll('.active');
  
    if (flippedCards.length !== 2) {
        return;
    }
  
    const [card1, card2] = flippedCards;
    const card1Data = card1.getAttribute('data-match-id');
    const card2Data = card2.getAttribute('data-match-id');
  
    if (card1Data === card2Data) {
        showStatus('Correct', 'lime');
        setCardStatus(card1, 'won');
        setCardStatus(card2, 'won');
    } else {
        showStatus('Wrong', 'red');
        resetCards(flippedCards);
    }
}

function isAllCardsMatched() {
    return document.querySelectorAll('.won').length === 10;
}

function isTimeUp() {
    return timer <= 0;
    
}

function handleGameEnd() {
    if (isAllCardsMatched()) {
        playAudio();
        promptForUserName();
    } else {
        setTimeout(() => {
        alert("Times ups");
        location.reload();
        }, 10);
    }
}

function playAudio() {
    var audio = new Audio('audio/jakko.mp3');
    audio.play();
}

function promptForUserName() {
    setTimeout(() => {
        const message = `You have found all pairs. Time left: ${timer.toFixed(2)} seconds \nWhat is your name? (Max 12 characters)`;
        user = prompt(message, "");
        if (user !== null) {
            // Trim the input to a maximum length of 20 characters
            user = user.slice(0, 12);
            if (user === "") {
                alert('Stats not saved');
                window.location.reload();
            } else {
                sendData();
                window.location.reload();
            }
        }else{
            alert('Stats not saved');
            window.location.reload();
        }
    },10);
}

function showStatus(message, color) {
    const header = document.getElementById('header');
    header.innerHTML = message;
    header.style.color = color;
}

function setCardStatus(card, status) {
    card.classList.replace('active', status);
}

function resetCards(cards) {
    cards.forEach(card => card.classList.remove('active'));
}

async function sendData() {
    const data = new FormData();
    data.append("user", user);
    data.append("time", timer.toFixed(2));
    try {
        const response = await fetch("api/sendData.php", {
            method: "POST",
            body: data
        });

        const text = await response.text();

        console.log(text);
    } catch (error) {
        console.log(error);
    }
}